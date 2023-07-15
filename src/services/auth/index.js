import { webApi } from '../config';

class AuthApi {
  register = (body) => webApi().post('/auth/register/', body);
  login = (body) => webApi().post('/auth/login/', body);
  logout = () => webApi({ auth: true }).post('/auth/logout/');
}

export const authApi = new AuthApi();
