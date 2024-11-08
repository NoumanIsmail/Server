import express  from 'express'
import { delelteCategory, getCategory, postCategory, putCategory, singleCategory } from '../controllers/category.controller.js'
import userMiddleware from '../middlewares/user.middleware.js'
import { authorizeRole } from '../middlewares/checkRole.middleware.js'
const categoryRoutes = express.Router()
categoryRoutes.get('/category',getCategory)
categoryRoutes.get('/category/:id',singleCategory)
categoryRoutes.post('/category',userMiddleware,authorizeRole, postCategory)
categoryRoutes.put('/category/:id',putCategory)
categoryRoutes.delete('/category/:id',delelteCategory)
export default categoryRoutes