import {Router} from 'express'

import movieRouter from '../../modules/Movie/http/movie.routes.js'
import categoryRouter from '../../modules/Category/http/category.routes.js'
import userRouter from '../../modules/User/http/user.routes.js'
import ensureAuthenticated from './middlewares/ensureAuthenticated.js'
import sessionsRouter from './sessions.routes.js'
import adminRouter from '../../modules/Admin/http/admin.routes.js'

const routes = Router()

routes.use('/', sessionsRouter)

routes.use(ensureAuthenticated)

routes.use('/admin', adminRouter)
routes.use('/user', userRouter)
routes.use('/movie', movieRouter)
routes.use('/category', categoryRouter)

export default routes