import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict().messages({
      'any.required': 'Title is required',
      'string.empty': 'Title is not allowed to be empty',
      'string.min': 'Title must have at least 3 characters',
      'string.max': 'Title must have lest then 50 characters',
      'string.trim': 'Title is must not have leading or trailing spaces'
    }),
    description: Joi.string().required().min(3).max(256).trim().strict()
  })

  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (err) {
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      errors: new Error(err).message
    })
  }

  res.status(StatusCodes.CREATED).json({
    message: 'Note: API create new board'
  })
}

export const boardValidation = {
  createNew
}