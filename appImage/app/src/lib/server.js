import path from 'path'
import {Server} from 'http'
import Express from 'express'
import React from 'react'
import {renderToString} from 'react-dom/server'
import {match, RouterContext} from 'react-router'
import routes from '../routes'
import NotFoundPage from '../components/NotFoundPage'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import multer from 'multer'
import passport from 'passport'
import flash from 'connect-flash'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import * as fs from 'fs'
/*import webpackMiddleWare from 'webpack-dev-middleware'
import webpackHotMiddleWare from 'webpack-hot-middleware'
import webpack from 'webpack'
import config from '../../webpack.devserver.config'*/

// Schemas
import {beerSchema, beerProperties} from '../schema/beerSchema'
import { categorySchema } from '../schema/categorySchema'


// Set up environment
const port = process.env.PORT || 8080;
const env = process.env.NODE_ENV || 'production';
const secret = process.env.PASSPORT_SECRET || 'secret';
const isDeveloping = false //env !== 'production'

if (isDeveloping) {
  mongoose.set('debug', true)
}

mongoose.connect('mongodb://mongo:27017')
const upload = multer({dest: '/usr/appImages/tmp/'})

// initialize the server and configure support for ejs templates
const app = new Express()
const server = new Server(app)



/*if (isDeveloping) {
  const compiler = webpack(config)
  const middleware = webpackMiddleWare(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  })

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.get('*', function response(req, res) {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, '/../dist/static/index.html')));
    res.end();
  });
}*/

// define the folder that will be used for static assets
app.use(Express.static(path.resolve('.', 'src', 'static')));
app.use('/beerImages', Express.static('/usr/appImages/beerImages'))

app.use(morgan('dev'))
// app.use(cookieParser())
app.use(bodyParser.json({limit: '50mb'}))
// app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))

app.set('view engine', 'ejs')
app.set('views', path.resolve('.', 'src', 'views'))

// Authentication
/*app.use(session({ secret: secret }))
 app.use(passport.initialize())
 app.use(passport.session())
 app.use(flash())*/

const Beer = mongoose.model('Beer', beerSchema)
const Category = mongoose.model('Category', categorySchema)
// Handle posts
app.post('/api/new-beer', upload.any(), (req, res) => {
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
})

app.post('/api/new-category', upload.any(), (req, res) => {
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
})

app.post('/api/delete-beer', (req, res) => {
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
})

app.post('/api/delete-category', (req, res) => {
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
})

app.get('/api/get-beer', (req, res) => {
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
})

app.get('/api/get-category', (req, res) => {
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
})

// universal routing and rendering
app.get('*', (req, res) => {
  match(
    {routes, location: req.url},
    (err, redirectLocation, renderProps) => {

      // in case of error display the error message
      if (err) {
        return res.status(500).send(err.message);
      }

      // in case of redirect propagate the redirect to the browser
      if (redirectLocation) {
        return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      }

      // generate the React markup for the current route
      let markup;
      if (renderProps) {
        // if the current route matched we have renderProps
        markup = renderToString(<RouterContext {...renderProps}/>);
      } else {
        // otherwise we can render a 404 page
        markup = renderToString(<NotFoundPage/>);
        res.status(404);
      }

      // render the index template with the embedded React markup
      return res.render('index', {markup});
    }
  );
});

server.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  console.info(`Server running on http://localhost:${port} [${env}]`);
});
