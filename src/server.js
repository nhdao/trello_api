/* eslint-disable no-console */

//import exitHook from 'async-exit-hook'
import express, { urlencoded } from 'express'
import { env } from '~/config/environment'
import { CONNECT_DB } from './config/mongodb'
import { APIs_V1 } from '~/src/routes/v1'

const START_SERVER = () => {
  const app = express()

  const hostname = 'localhost'
  const port = 8017

  //Enable req.body json data
  app.use(express.json())
  app.use('/v1', APIs_V1)

  app.listen(port, hostname, () => {
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


