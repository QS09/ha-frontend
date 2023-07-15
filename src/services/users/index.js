import { webApi } from '../config';

class UserApi {
  profile = () => webApi({ auth: true }).get(`/profile/`);

  getAll = () => webApi({ auth: true }).get(`/users/`);
  create = (body) => webApi({ auth: true }).post(`/users/`, body);
  getById = (id) => webApi({ auth: true }).get(`/users/${id}/`);
  update = (id, body) => webApi({ auth: true }).put(`/users/${id}/`, body);
  delete = (id) => webApi({ auth: true }).delete(`/users/${id}/`);
}

export const userApi = new UserApi();
