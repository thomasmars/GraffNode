import fs from 'fs'
import mongoose from 'mongoose'
import { beerSchema } from '../schemas/beer'

const Beer = mongoose.model('Beer', beerSchema)

const createBeer = (req, res) => {
  let beerProps = JSON.parse(req.body.beerProps)

  // Handle image
  if (req.files && req.files.length) {
    // Give it a human-readable name
    const fileName = beerProps.name.split(' ').join('-')
    const filePath = '/usr/appImages/beerImages/'
    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(filePath)
    }

    // TODO determine extension
    const readStream = fs.createReadStream(req.files[0].path)
      .pipe(fs.createWriteStream(filePath + fileName + '.png'));

    // Unlink tmp file
    readStream.on('close', (err, data) => {
      fs.unlink(req.files[0].path)
    })

    // Set image path
    beerProps = Object.assign({}, beerProps, {
      imagePath: '/beerImages/' + fileName + '.png'
    })
  }

  // Update
  if (req.body['_id'] !== '') {
    Beer.findByIdAndUpdate(
      req.body['_id'],
      {
        $set: beerProps
      },
      {new: true},
      (err, beer) => {
        if (err) {
          console.log(err)
          res.sendStatus(500).json(err)
        }
        res.json(beer)
      })
  }
  else {
    const item = new Beer(
      beerProps
    )
    item.save(() => {
    })
    res.sendStatus(200);
  }
}

const deleteBeer = (req, res) => {
  Beer.findById(req.body.id, (err, beer) => {
    if (err) {
      console.log(err)
      res.sendStatus(500).json(err)
    }

    // also delete image
    if (beer && beer.imagePath) {
      fs.unlink(`/usr/appImages${beer.imagePath}`)
    }

    Beer.findByIdAndRemove(req.body.id, (err, beer) => {
      if (err) {
        console.log(err)
        res.sendStatus(500).json(err)
      }

    }).remove(() => {
      res.sendStatus(200);
    })
  })
}

const getBeer = (req, res) => {
  if (req.query.id) {
    Beer.findById(req.query.id, (err, beer) => {
      if (err) {
        console.log(err)
        res.sendStatus(500).json(err)
      }
      res.json(beer)
    })
  }
  else {
    Beer.find((err, beer) => {
      if (err) console.log(err)
      res.json(beer);
    })
  }
}

export {
  createBeer,
  deleteBeer,
  getBeer
}
