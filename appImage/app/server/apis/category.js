import mongoose from 'mongoose'
import { categorySchema } from '../schemas/category'

const Category = mongoose.model('Category', categorySchema)

const createCategory = (req, res) => {
  let categoryProps = JSON.parse(req.body.categoryProps)

  // Update
  if (req.body['_id'] !== '') {
    Category.findByIdAndUpdate(
      req.body['_id'],
      {
        $set: categoryProps
      },
      {new: true},
      (err, category) => {
        if (err) {
          console.log(err)
          res.sendStatus(500).json(err)
        }
        res.json(category)
      })
  }
  else {
    const item = new Category(
      categoryProps
    )
    item.save(() => {
    })
    res.sendStatus(200);
  }
}

const deleteCategory = (req, res) => {
  Category.findById(req.body.id, (err, category) => {
    if (err) {
      console.log(err)
      res.sendStatus(500).json(err)
    }

    Category.findByIdAndRemove(req.body.id, (err, category) => {
      if (err) {
        console.log(err)
        res.sendStatus(500).json(err)
      }

    }).remove(() => {
      res.sendStatus(200);
    })
  })
}

const getCategory = (req, res) => {
  if (req.query.id) {
    Category.findById(req.query.id, (err, category) => {
      if (err) {
        console.log(err)
        res.sendStatus(500).json(err)
      }
      res.json(category)
    })
  }
  else {
    Category.find((err, category) => {
      if (err) console.log(err)
      res.json(category);
    })
  }
}

export {
  createCategory,
  deleteCategory,
  getCategory
}
