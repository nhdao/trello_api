
/* eslint-disable no-unused-vars */
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import { cardService } from '~/services/cardService'

const createNew = async (req, res, next) => {
  try {
    const createdCard = await cardService.createNew(req.body)
    res.status(StatusCodes.CREATED).json({
      data: [
        createdCard
      ]
    })
  } catch (err) {
    next(err)
  }
}

export const cardController = {
  createNew
}
