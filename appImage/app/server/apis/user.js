import jwt from 'jsonwebtoken'
import {User} from '../schemas/user'
import {secret} from '../../config/server'

const createUser = (req, res) => {
  if (!(req.body.username && req.body.password)) {
    res.sendStatus(500)
    return
  }

  User.findOne({ username: req.body.username }, (err, user) => {
    if (!user) {
      const newUser = new User({
        username: req.body.username,
      })
      newUser.password = newUser.generateHash(req.body.password)
      newUser.save()
      res.sendStatus(200)
    }
  })
}

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

const changePassword = (req, res) => {
  if (!(req.body.username && req.body.oldPassword && req.body.newPassword)) {
    res.json({success: false, message: 'Fill in all fields'})
  }

  User.findOne({username: req.body.username}, (err, user) => {
    if (err) {
      console.log(err)
      res.sendStatus(500).json(err)
    }

    if (!user) {
      res.json({success:false, message: 'User not found'})
    }
    else {
      if (!user.validPassword(req.body.oldPassword, user.password)) {
        res.json({success: false, message: 'Wrong password'})
      }
      else {
        user.password = user.generateHash(req.body.newPassword)
        user.save(() => {
        })
        res.status(200).json({
          success: true,
          message: 'Password successfully updated'
        })
      }
    }
  })
}


const deleteUser = (req, res) => {
  User.findById(req.body.id, err => {
    if (err) {
      console.log(err)
      res.sendStatus(500).json(err)
    }

    User.findByIdAndRemove(req.body.id, err => {
      if (err) {
        console.log(err)
        res.sendStatus(500).json(err)
      }

    }).remove(() => {
      res.sendStatus(200);
    })
  })
}

const isAuthenticated = (req, res) => {
  return res.json({
    success: true,
    message: 'You\'re already authenticated'
  })
}

const verifyAuth = (req, res, next) => {
  const token = req.body.token ||
    req.query.token ||
    req.headers['x-access-token']

  if (token) {
    try {
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
    catch (e) {
      res.status(403).send({
        success: false,
        message: 'Invalid token',
        error: e
      })
    }

  }
  else {
    return res.status(403).send({
      success: false,
      message: 'No token provided!'
    })
  }
}

export {
  createUser,
  getUser,
  changePassword,
  deleteUser,
  authenticate,
  isAuthenticated,
  verifyAuth
}
