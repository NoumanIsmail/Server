import express from 'express'
import { delelteUser, getUsers, postUser, putUser, singleUser } from '../controllers/users.controller.js';
const userRouter = express.Router()

userRouter.get('/auth/register', getUsers);
userRouter.get('/auth/register/:id', singleUser);
userRouter.post('/auth/register', postUser);
userRouter.put('/auth/register/:id', putUser);
userRouter.delete('/auth/register/:id', delelteUser);

export default userRouter;