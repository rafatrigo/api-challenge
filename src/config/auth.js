export default {
  jwt: {
    secret: process.env.TOKEN_KEY || 'default',
    expiresIn: '1d',
  }
}