import jwt from 'jsonwebtoken'
import {User} from '../schemas/user'
import {secret} from '../../config/server'

const getUser = (req, res) => {
  User.find((err, user) => {
    if (err) console.log(err)
    res.json(user);
  })
}

const authenticate = (req, res) => {
  if (!(req.body.username && req.body.password)) {
    res.json({success: false, message: 'Please provide a username and password'})
  }
  else {
    User.findOne({
      username: req.body.username
    }, (err, user) => {
      if (err) throw err

      if (!user) {
        res.json({success: false, message: 'Authentication failed. User not found.'})
      }
      else if (user) {

        if (!user.validPassword(req.body.password, user.password)) {
          res.json({success: false, message: 'Authentication failed. Wrong password.'})
        } else {
          const token = jwt.sign(user, secret, {
            expiresIn: '2h'
          })

          res.json({
            success: true,
            message: 'Enjoy your token!',
            token: token
          })
        }
      }
    })
  }
}

const verifyAuth = (req, res, next) => {
  const token = req.body.token ||
    req.query.token ||
    req.headers['x-access-token']

  if (token) {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        console.log(err)
        return res.json({success: false, message: 'Failed to authenticate!'})
      }
      else {
        req.decoded = decoded
        next()
      }
    })
  }
  else {
    return res.status(403).send({
      success: false,
      message: 'No token provided!'
    })
  }
}

export {
  getUser,
  authenticate,
  verifyAuth
}
