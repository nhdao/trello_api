/* eslint-disable no-useless-catch */
// import { StatusCodes } from 'http-status-codes'
// import { slugsify } from './../utils/formatters'
import { columnModel } from '~/models/columnModel'
import { boardModel } from '~/models/boardModel'
import { cardModel } from '~/models/cardModel'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
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

const deleteItem = async (columnId) => {
  try {
    const targetColumn = await columnModel.findOneBy(columnId)
    if (!targetColumn) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Column not found with that id')
    }
    await columnModel.deleteOneById(columnId)

    await cardModel.deleteManyByColumnId(columnId)

    await boardModel.pullColumnOrderIds(targetColumn)

    return { deletedResult: 'Column and its cards deleted successfully' }
  } catch (err) {
    throw err
  }
}

export const columnService = {
  createNew,
  deleteItem
}