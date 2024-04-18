
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

const deleteItem = async (req, res, next) => {
  try {
    const columnId = req.params.id
    const result = await columnService.deleteItem(columnId)

    res.status(StatusCodes.OK).json(result)
  } catch (err) {
    next((err))
  }
}

export const columnController = {
  createNew,
  deleteItem
}