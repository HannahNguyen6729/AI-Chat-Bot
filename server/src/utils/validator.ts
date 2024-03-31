import { NextFunction, Request, Response } from 'express';
import { body, validationResult, ValidationChain } from 'express-validator';

// sequential processing, stops running validations chain if the previous one fails.
export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    for (let validation of validations) {
      const errors = await validation.run(req);
      if (!errors.isEmpty()) break; // If any validation check fails (finds an error), the loop stops
    }

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(422).json({ errors: errors.array() });
  };
};

export const loginValidator = [
  body('email').trim().isEmail().withMessage('Email is required'),
  body('password')
    .trim()
    .isLength({ min: 6, max: 100 })
    .withMessage(
      'Password should contain at least 6 characters & at most 100 characters'
    ),
];

export const signupValidator = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isString()
    .withMessage('name must be a string')
    .isLength({ max: 100 })
    .withMessage('name cannot exceed 100 characters'),
  ...loginValidator,
];

export const chatCompletionValidator = [
  body('message').notEmpty().withMessage('Message is required'),
];
