/* eslint-disable no-useless-catch */
import { slugsify } from './../utils/formatters'
import { boardModel } from '~/models/boardModel'
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

export const boardService = {
  createNew
}