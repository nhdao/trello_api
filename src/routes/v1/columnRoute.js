/* eslint-disable no-unused-vars */

import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { columnController } from '~/controllers/columnController'
import { columnValidation } from '~/validations/columnValidation'
const Router = express.Router()

Router.route('/')
  .post(columnValidation.createNew, columnController.createNew)

Router.route(':id')
  .delete(columnValidation.deleteItem, columnController.deleteItem)

export const columnRouter = Router