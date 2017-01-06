import path from 'path'
import { Server } from 'http'
import Express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
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

mongoose.connect('mongodb://mongo:27017')

const Horse = mongoose.model('Horse', { name: String })
const upload = multer()

// initialize the server and configure support for ejs templates
const app = new Express()
const server = new Server(app)

// Set up environment
const port = process.env.PORT || 8080;
const env = process.env.NODE_ENV || 'production';
const secret = process.env.PASSPORT_SECRET || 'secret';

// define the folder that will be used for static assets
app.use(Express.static(path.resolve('.', 'src', 'static')));

app.use(morgan('dev'))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.set('view engine', 'ejs')
app.set('views', path.resolve('.', 'src', 'views'))

// Authentication
app.use(session({ secret: secret }))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

// Handle posts
app.post('/api/newhorse', upload.array(), (req, res, next) => {
  // Handle horseName
  const horseName = req.body.horseName;
  const horsey = new Horse({
    name: horseName
  })
  horsey.save(() => {})
  res.json(req.body)
})

app.get('/api/stableHorses', (req, res) => {
  Horse.find((err, horse) => {
    if (err) console.log(error)
    res.json(horse);
  })
})

// universal routing and rendering
app.get('*', (req, res) => {
  match(
    { routes, location: req.url },
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
      return res.render('index', { markup });
    }
  );
});

server.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  console.info(`Server running on http://localhost:${port} [${env}]`);
});
