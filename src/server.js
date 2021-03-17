import 'dotenv/config.js'
import 'express-async-errors'
import './database/index.js'

import express from 'express'
import cors from 'cors'

import AppError from './Error/AppError.js'
import routes from './http/routes/index.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)

app.use(
  (err, requerst, response, next) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    }

    console.error(err);

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
);

app.listen(3333, () => {
  console.log('🚀 server started on port 3333')
})