import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { COOKIE_NAME } from './constant.js';

export const createAccessToken = (
  userId: string,
  email: string,
  expiresIn: string
) => {
  const payloadJWT = {
    userId,
    email,
  };

  const accessToken = jwt.sign(payloadJWT, process.env.JWT_SECRET, {
    expiresIn,
  });

  return accessToken;
};

export const verifyAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.signedCookies[COOKIE_NAME];
  //console.log({ accessToken });
  if (!accessToken || accessToken.trim() == '') {
    return res.status(401).send({ message: 'access token not found' });
  }

  try {
    const decodedToken = jwt.verify(accessToken, process.env.JWT_SECRET);
    // console.log({ decodedToken });
    res.locals.jwtData = decodedToken;
    next();
  } catch (error) {
    return res.status(404).json({ message: 'token expired', error });
  }
};
