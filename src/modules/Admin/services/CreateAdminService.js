import AppError from '../../../Error/AppError.js'
import Admin from '../../../models/Admin.js'

import bc from 'bcryptjs'

class CreateAdminService {
  async execute(email, password) {
    const admin = await Admin.findOne({where: {email}})

    if(admin){
      throw new AppError('The email adress alredy exists')
    }

    const hashedPassword = await bc.hash(password, 8)

    const newAdmin = await Admin.create({
      email,
      password: hashedPassword
    })
    
    return newAdmin
  }
}

export default CreateAdminService