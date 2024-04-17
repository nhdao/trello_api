/* eslint-disable no-useless-catch */
// import { StatusCodes } from 'http-status-codes'
// import { slugsify } from './../utils/formatters'
import { cardModel } from '~/models/cardModel'
import { columnModel } from '~/models/columnModel'
// import { ApiError } from './../utils/ApiError'
// import { cloneDeep } from 'lodash'

const createNew = async (reqBody) => {
  try {
    const newCard = {
      ...reqBody
    }

    const createdCard = await cardModel.createNew(newCard)

    const getNewCard = await cardModel.findOneById(createdCard.insertedId)

    if (getNewCard) {
      getNewCard.cards = []
      await columnModel.pushCardOrderIds(getNewCard)
    }

    //always return in service
    return getNewCard
  } catch (err) {
    throw err
  }
}
export const cardService = {
  createNew
}