/* eslint-disable no-useless-catch */
import { slugsify } from '~/src/untils/formatters'

const createNew = async (reqBody) => {
  try {
    const newBoard = {
      ...reqBody,
      slug: slugsify(reqBody.title)
    }

    //always return in service
    return newBoard
  } catch (err) {
    throw err
  }
}

export const boardService = {
  createNew
}