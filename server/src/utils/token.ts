import jwt from 'jsonwebtoken';

export const createAccessToken = (
  userId: string,
  email: string,
  expiresIn: string
) => {
  const payloadJWT = {
    userId,
    email,
  };

  const access_token = jwt.sign(payloadJWT, process.env.JWT_SECRET, {
    expiresIn,
  });

  return access_token;
};
