import decode from 'jwt-decode';

class AuthService {
  getProfile() {
    return decode(this.getToken());
  }

  loggedIn() {
<<<<<<< HEAD
    // Checks if there is a saved token and it's still valid
=======

>>>>>>> 6d43a92140da87e06fe716f6d1fa5d5deb4f17a6
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  getToken() {
<<<<<<< HEAD
    // Retrieves the user token from localStorage
=======

>>>>>>> 6d43a92140da87e06fe716f6d1fa5d5deb4f17a6
    return localStorage.getItem('id_token');
  }

  login(idToken) {
<<<<<<< HEAD
    // Saves user token to localStorage
=======

>>>>>>> 6d43a92140da87e06fe716f6d1fa5d5deb4f17a6
    localStorage.setItem('id_token', idToken);

    window.location.assign('/');
  }

  logout() {
<<<<<<< HEAD
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token');
    // this will reload the page and reset the state of the application
=======

    localStorage.removeItem('id_token');

>>>>>>> 6d43a92140da87e06fe716f6d1fa5d5deb4f17a6
    window.location.assign('/');
  }
}

export default new AuthService();
