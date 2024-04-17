
/* eslint-disable no-unused-vars */
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import { columnService } from '~/services/columnService'

const createNew = async (req, res, next) => {
  try {
    const createdColumn = await columnService.createNew(req.body)
    res.status(StatusCodes.CREATED).json({
      data: [
        createdColumn
      ]
    })
  } catch (err) {
    next(err)
  }
}

export const columnController = {
  createNew
}