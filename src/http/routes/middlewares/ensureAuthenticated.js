import AppError from '../../../Error/AppError.js';
import webtoken from 'jsonwebtoken';
import auth from '../../../config/auth.js';

const ensureAuthenticated = (request, response, next
) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing');
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = webtoken.verify(token, auth.jwt.secret);

    const { sub } = decoded

    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError('Invalid JWT token');
  }
}

export default ensureAuthenticated