import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { boardController } from '~/controllers/boardController'
import { boardValidation } from '~/validations/boardValidation'
const Router = express.Router()

Router.route('/')
  .get(boardController.createNew)
  .post(boardValidation.createNew, boardController.createNew)

export const boardRoute = Router