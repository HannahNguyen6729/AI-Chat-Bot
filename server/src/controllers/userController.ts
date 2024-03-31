import { Request, Response } from 'express';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import { createAccessToken } from '../utils/token.js';
import { COOKIE_NAME } from '../utils/constant.js';

export const userSignupController = async (req: Request, res: Response) => {
  try {
    //check if the user existing in the database
    const { email, password, name } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(401).json({
        message: 'email already registered',
      });

    //if user does not exist
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({ email, name, password: hashPassword });
    await newUser.save();

    // clear cookie
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      domain: 'localhost',
      signed: true,
      path: '/',
    });

    //create token and store the token inside the cookie
    const accessToken = createAccessToken(
      newUser._id.toString(),
      newUser.email,
      '7d'
    );

    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie(COOKIE_NAME, accessToken, {
      path: '/',
      domain: 'localhost',
      expires,
      httpOnly: true,
      signed: true,
    });

    return res.status(200).json({
      message: 'user created successfully',
      user: newUser.toObject({
        transform: (doc, ret, option) => {
          delete ret.password;
          delete ret.__v;
          return ret;
        },
      }),
    });
  } catch (error) {
    console.log(error);
    return res
      .status(406)
      .json({ message: 'cannot register user', error: error.message });
  }
};

export const userLoginController = async (req: Request, res: Response) => {
  try {
    //check if the user existing in the database
    const { email, password } = req.body;
    const userInDatabase = await User.findOne({ email }).lean();
    if (!userInDatabase)
      return res.status(401).json({
        message: 'incorrect email',
      });

    //check if password is correct
    const isPasswordCorrect = await bcrypt.compare(
      password,
      userInDatabase.password
    );
    if (!isPasswordCorrect)
      return res.status(403).json({ message: 'incorrect password' });

    // clear cookie
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      domain: 'localhost',
      signed: true,
      path: '/',
    });

    //create token and store the token inside the cookie
    const accessToken = createAccessToken(
      userInDatabase._id.toString(),
      userInDatabase.email,
      '7d'
    );

    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie(COOKIE_NAME, accessToken, {
      path: '/',
      domain: 'localhost',
      expires,
      httpOnly: true,
      signed: true,
    });

    return res.status(200).json({
      message: 'login successfully',
      user: { name: userInDatabase.name, email: userInDatabase.email },
    });
  } catch (error) {
    console.log(error);
    return res
      .status(406)
      .json({ message: 'cannot login', error: error.message });
  }
};
