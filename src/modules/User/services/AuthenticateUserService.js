import bc from 'bcryptjs'
import webtoken from 'jsonwebtoken'

import AppError from '../../../Error/AppError.js'
import User from '../../../models/User.js'
import auth from '../../../config/auth.js'

class AuthenticateUserService {
  async execute(email, password) {
    const user = await User.findOne({
      where: {email}
    })

    if(!user){
      throw new AppError('Incorrect email/password combination')
    }

    const passwordMatched = await bc.compare(password, user.password)

    if(!passwordMatched){
      throw new AppError('Incorrect email/password combination')
    }

    const {secret, expiresIn} = auth.jwt

    const token = webtoken.sign({}, secret, {
      subject: user.id,
      expiresIn,
    })

    return {token}
    
  }
}

export default AuthenticateUserService