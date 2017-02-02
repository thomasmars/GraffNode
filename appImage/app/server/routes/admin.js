import express from 'express'
import {getBeer, createBeer, deleteBeer} from '../apis/beer';
import {getCategory, createCategory, deleteCategory} from '../apis/category'
import {getUser, authenticate, verifyAuth} from '../apis/user'
import {upload} from '../../config/server'

const apiRoutes = express.Router()

// User
apiRoutes.get('/get-users', verifyAuth, getUser)
apiRoutes.post('/authenticate', authenticate)

// Beer
apiRoutes.get('/get-beer', getBeer)
apiRoutes.post('/new-beer', upload.any(), createBeer)
apiRoutes.post('/delete-beer', deleteBeer)

// Category
apiRoutes.get('/get-category', getCategory)
apiRoutes.post('/new-category', upload.any(), createCategory)
apiRoutes.post('/delete-category', deleteCategory)

export default (app) => {
  app.use('/api', apiRoutes)
}
