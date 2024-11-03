import express  from 'express'
import { delelteCategory, getCategory, postCategory, putCategory, singleCategory } from '../controllers/category.controller.js'
const categoryRoutes = express.Router()
categoryRoutes.get('/category',getCategory)
categoryRoutes.get('/category/:id',singleCategory)
categoryRoutes.post('/category',postCategory)
categoryRoutes.put('/category/:id',putCategory)
categoryRoutes.delete('/category/:id',delelteCategory)
export default categoryRoutes