import { StatusCodes } from 'http-status-codes'

const createNew = (req, res, next) => {
  try {
    res.status(StatusCodes.OK).json({
      message: 'Note: API get list boards'
    })
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: new Error(err).message
    })
  }
}

export const boardController = {
  createNew
} 