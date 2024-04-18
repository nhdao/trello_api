import Joi from 'joi'
import { GET_DB } from '~/config/mongodb'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'
import { ObjectId } from 'mongodb'
import { BOARD_TYPES } from '~/utils/constants'
import { columnModel } from './columnModel'
import { cardModel } from './cardModel'

//Define collection
const BOARD_COLLECTION_NAME = 'boards'
const BOARD_COLLECTION_SCHEMA = Joi.object({
  title: Joi.string().required().min(3).max(50).trim().strict(),
  slug: Joi.string().required().min(3).trim().strict(),
  description: Joi.string().required().min(3).max(256).trim().strict(),
  type: Joi.string().valid(BOARD_TYPES.PUBLIC, BOARD_TYPES.PRIVATE).required(),

  columnOrderIds: Joi.array().items(
    Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
  ).default([]),

  createdAr: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)
})

const validateBeforeCreate = async (data) => {
  return await BOARD_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}

const createNew = async (data) => {
  try {
    const validData = await validateBeforeCreate(data)
    const createdBoard = await GET_DB.collection(BOARD_COLLECTION_NAME).insertOne(validData)
    return createdBoard
  } catch (err) {
    throw new Error(err)
  }
}

const findOneById = async (id) => {
  try {
    const result = await GET_DB.collection(BOARD_COLLECTION_NAME).findOne({
      _id: ObjectId(id)
    })
    return result
  } catch (err) {
    throw new Error(err)
  }
}

const getDetail = async (id) => {
  try {
    const result = await GET_DB().collection(BOARD_COLLECTION_NAME).aggregate([
      { $match: {
        _id: ObjectId(id),
        _destroy: false
      } },
      { $loopkup: {
        from: columnModel.COLUMN_COLLECTION_NAME,
        localField: '_id',
        foreignField: 'boardId',
        as: 'columns'
      } },
      { $loopkup: {
        from: cardModel.CARD_COLLECTION_NAME,
        localField: '_id',
        foreignField: 'boardId',
        as: 'cards'
      } }
    ]).toArray()

    return result[0] || null
  } catch (err) {
    throw new Error(err)
  }
}

const pushColumnOrderIds = async (column) => {
  try {
    const result = await GET_DB().collection(BOARD_COLLECTION_NAME).findOneAndUpdate(
      {
        _id: ObjectId(column.boardId)
      },
      {
        $push: {
          columnOrderIds: ObjectId(column._id)
        }
      },
      {
        returnDocument: 'after'
      }
    )

    return result.value
  } catch (err) {
    throw new Error(err)
  }
}

const pullColumnOrderIds = async (column) => {
  try {
    const result = await GET_DB().collection(BOARD_COLLECTION_NAME).findOneAndUpdate(
      {
        _id: ObjectId(column.boardId)
      },
      {
        $pull: {
          columnOrderIds: ObjectId(column._id)
        }
      },
      {
        returnDocument: 'after'
      }
    )

    return result.value
  } catch (err) {
    throw new Error(err)
  }
}

export const boardModel = {
  BOARD_COLLECTION_NAME,
  BOARD_COLLECTION_SCHEMA,
  createNew,
  findOneById,
  getDetail,
  pushColumnOrderIds,
  pullColumnOrderIds
}