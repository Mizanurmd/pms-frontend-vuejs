import axios from 'axios';

const API_URL = 'http://localhost:8082/api/v1/';

class AuthService {
  async register(user) {
    return axios.post(`${API_URL}register`, user);
  }

  async login(user) {
    return axios.post(`${API_URL}login`, user);
  }

  async refreshToken() {
    return axios.post(`${API_URL}refresh_token`);
  }
}

export default new AuthService();
