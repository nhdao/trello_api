/* eslint-disable no-console */


/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

//import exitHook from 'async-exit-hook'
import express from 'express'
import { env } from '~/config/environment'
import { CONNECT_DB } from './config/mongodb'

const START_SERVER = () => {
  const app = express()

  const hostname = 'localhost'
  const port = 8017

  app.get('/', async (req, res) => {

    res.end('<h1>Hello World!</h1><hr>')
  })

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


