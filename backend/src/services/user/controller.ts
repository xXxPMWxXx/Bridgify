import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken'
import cors from 'cors'
import 'dotenv/config'
const bcrypt = require("bcryptjs")
const UserModel = require('../../models/user');

const jwt_secret: any = process.env.JWT_SECRET;

export const test = async (req: any, res: Response, next: NextFunction) => {
  // 1. get token from req
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1]

  // 2. verify token with secret key
  jwt.verify(token, jwt_secret, async (err: any, decoded: any) => {
    // 3. allow user to get all users from mongodb
    if (decoded) {
      const allUsers = await UserModel.collection.find().toArray()
      res.status(200).send(allUsers)
    } else if (err) {
      res.status(401).json({ error: 'You must have a valid token' })
    }
  })
};


export const signup = async (req: any, res: Response, next: NextFunction) => {
  // 1. get user from the frontend
  const newUser = { email: req.body.email, password: req.body.password }
  // 2. check if the email is existed
  const user = await UserModel.findOne({ email: req.body.email })
  if (user != null) {
    return res.status(400).json({ Message: `Email: ${req.body.email} was already register` })
  }

  // 3. hash password
  const hashedPassword = await bcrypt.hash(newUser.password, 10)

  // 4. add a new user to mongodb
  UserModel.collection.insertOne({ email: req.body.email, password: hashedPassword })

  // 5. send status back to requestor
  return res.status(200).json({ Message: `Email : ${req.body.email} register successfully` })
};

export const login = async (req: any, res: Response, next: NextFunction) => {

  // 1. find the user
  const user = await UserModel.collection.findOne({ email: req.body.email })

  // 2. compare the password from req vs password in db - Authenticated ok
  const userAllowed = await bcrypt.compare(req.body.password, user.password)

  // 3. create jwt token = Authorization
  if (userAllowed) {

    const accessToken = jwt.sign(user, jwt_secret, { expiresIn: "1d" })

    // 4. send JWT token to frontend requestor
    res.status(200).send({ accessToken: accessToken })
  } else {
    res.status(400).send({ Message: 'No user found or invalid password' })
  }
};


// get all users
export const getall = async (req: any, res: Response, next: NextFunction) => {
  // 1. get token from req
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1]

  // 2. verify token with secret key
  jwt.verify(token, jwt_secret, async (err: any, decoded: any) => {
    // 3. allow user to get all users from mongodb
    if (decoded) {
      const allUsers = await UserModel.collection.find().toArray()
      res.status(200).send(allUsers)
    } else if (err) {
      res.status(401).json({ error: 'You must have a valid token' })
    }
  })
}