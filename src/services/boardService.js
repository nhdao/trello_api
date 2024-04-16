/* eslint-disable no-useless-catch */
import { StatusCodes } from 'http-status-codes'
import { slugsify } from './../utils/formatters'
import { boardModel } from '~/models/boardModel'
import { ApiError } from './../utils/ApiError'

const createNew = async (reqBody) => {
  try {
    const newBoard = {
      ...reqBody,
      slug: slugsify(reqBody.title)
    }

    const createdBoard = await boardModel.createNew(newBoard)

    const getNewBoard = await boardModel.findOneById(createdBoard.insertedId)

    //always return in service
    return getNewBoard
  } catch (err) {
    throw err
  }
}

const getDetails = async (id) => {
  try {
    const board = await boardModel.getDetails(id)
    //always return in service
    if (!board) throw new ApiError(StatusCodes.NOT_FOUND, 'Board not found with that id')
    return board
  } catch (err) {
    throw err
  }
}

export const boardService = {
  createNew,
  getDetails
}