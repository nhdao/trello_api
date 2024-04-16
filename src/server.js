/* eslint-disable no-console */

//import exitHook from 'async-exit-hook'
import express from 'express'
import cors from 'cors'
import { env } from '~/config/environment'
import { CONNECT_DB } from './config/mongodb'
import { APIs_V1 } from './routes/v1'
import { errorHandlingMiddleware } from './middlewares/errorHandlingMiddleware'
import { corsOptions } from './config/cors'

const START_SERVER = () => {
  const app = express()

  app.use(cors(corsOptions))

  //Enable req.body json data
  app.use(express.json())
  app.use('/v1', APIs_V1)

  app.use(errorHandlingMiddleware)

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    console.log(`Hello ${env.AUTHOR}, I am running at http://${ env.APP_HOST }:${ env.APP_PORT }/`)
  })

  // exitHook(() => {
  //   console.log('Closing DB connection...')
  // })
}

CONNECT_DB()
  .then(() => {
    console.log('Connected to MongoDB Cloud Atlas')
  })
  .then(() => START_SERVER())
  .catch(error => {
    console.error(error)
    process.exit(0)
  })


