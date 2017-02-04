import express from 'express'
import {getBeer, createBeer, deleteBeer} from '../apis/beer';
import {getCategory, createCategory, deleteCategory} from '../apis/category'
import {createUser, getUser, changePassword, deleteUser,authenticate, isAuthenticated, verifyAuth} from '../apis/user'
import {upload} from '../../config/server'

const apiRoutes = express.Router()

apiRoutes.post('/authenticate', authenticate)
apiRoutes.get('/get-beer', getBeer)
apiRoutes.get('/get-category', getCategory)

// Protected routes
apiRoutes.use(verifyAuth)

// User
apiRoutes.get('/check-authentication', isAuthenticated)
apiRoutes.get('/get-users', getUser)
apiRoutes.post('/create-user', createUser)
apiRoutes.post('/change-password', changePassword)
apiRoutes.post('/delete-user', deleteUser)

// Beer
apiRoutes.post('/new-beer', upload.any(), createBeer)
apiRoutes.post('/delete-beer', deleteBeer)

// Category
apiRoutes.post('/new-category', upload.any(), createCategory)
apiRoutes.post('/delete-category', deleteCategory)

export default (app) => {
  app.use('/api', apiRoutes)
}
