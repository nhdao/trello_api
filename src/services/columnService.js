/* eslint-disable no-useless-catch */
// import { StatusCodes } from 'http-status-codes'
// import { slugsify } from './../utils/formatters'
import { columnModel } from '~/models/columnModel'
import { boardModel } from '~/models/boardModel'
// import { ApiError } from './../utils/ApiError'
// import { cloneDeep } from 'lodash'

const createNew = async (reqBody) => {
  try {
    const newColumn = {
      ...reqBody
    }

    const createdColumn = await columnModel.createNew(newColumn)

    const getNewColumn = await columnModel.findOneById(createdColumn.insertedId)

    if (getNewColumn) {
      getNewColumn.cards = []
      await boardModel.pushColumnOrderIds(getNewColumn)
    }
    //always return in service
    return getNewColumn
  } catch (err) {
    throw err
  }
}
export const columnService = {
  createNew
}