import express from 'express'
import { delelteUser, getUsers, login, logout, postUser, putUser, singleUser } from '../controllers/users.controller.js';
const userRouter = express.Router()

userRouter.get('/auth/register', getUsers);
userRouter.get('/auth/register/:id', singleUser);
userRouter.post('/auth/register', postUser);
userRouter.post('/auth/login', login)
userRouter.post('/auth/logout', logout)
userRouter.put('/auth/register/:id', putUser);
userRouter.delete('/auth/register/:id', delelteUser);

export default userRouter;