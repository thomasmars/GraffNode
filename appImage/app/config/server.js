import Express from 'express'
import * as path from 'path'
import mongoose from 'mongoose'
import multer from 'multer'
import bodyParser from 'body-parser'
import morgan from 'morgan'

// Server environment
const port = process.env.PORT || 8080;
const env = process.env.NODE_ENV || 'production';
const secret = process.env.PASSPORT_SECRET || 'secret';
const isDeveloping = env !== 'production'

// Setup
const upload = multer({dest: '/usr/appImages/tmp/'})

// Configuration
const config = (app) => {
  if (isDeveloping) {
    mongoose.set('debug', true)
    app.use(morgan('dev'))
  }

  mongoose.connect('mongodb://mongo:27017')

  // define the folder that will be used for static assets
  app.use(Express.static(path.resolve('.', 'static')));
  app.use('/beerImages', Express.static('/usr/appImages/beerImages'))

  // Request parsing
  app.use(bodyParser.urlencoded({extended: false}))
  app.use(bodyParser.json({limit: '50mb'}))

  // View engine
  app.set('view engine', 'ejs')
  app.set('views', path.resolve('.', 'views'))
}

export {
  config,
  upload,
  secret,
  port,
  env
}
