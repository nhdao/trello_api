/* eslint-disable no-unused-vars */
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import { boardService } from '~/services/boardService'
const createNew = async (req, res, next) => {
  try {
    const createdBoard = await boardService.createNew(req.body)
    res.status(StatusCodes.CREATED).json({
      data: [
        createdBoard
      ]
    })
  } catch (err) {
    next(err)
  }
}

export const boardController = {
  createNew
}