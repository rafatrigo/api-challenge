import bc from 'bcryptjs'
import webtoken from 'jsonwebtoken'

import AppError from '../../../Error/AppError.js'
import Admin from '../../../models/Admin.js'
import auth from '../../../config/auth.js'

class AuthenticateAdminService {
  async execute(email, password) {
    const admin = await Admin.findOne({
      where: {email}
    })

    if(!admin){
      throw new AppError('Incorrect email/password combination')
    }

    const passwordMatched = await bc.compare(password, admin.password)

    if(!passwordMatched){
      throw new AppError('Incorrect email/password combination')
    }

    const {secret, expiresIn} = auth.jwt

    const token = webtoken.sign({}, secret, {
      subject: admin.id,
      expiresIn,
    })

    return token
    
  }
}

export default AuthenticateAdminService