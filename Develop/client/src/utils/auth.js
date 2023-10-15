import decode from 'jwt-decode';

class AuthService {
  // Decode the token to get user data
  getProfile() {
    return decode(this.getToken());
  }

  // Check if the user is logged in
  loggedIn() {
    const token = this.getToken();
    if (!token) {
      return false;
    }
    const isExpired = this.isTokenExpired(token);
    if (isExpired) {
      this.logout(); // Log out automatically if the token is expired
      return false;
    }
    return true;
  }

  // Check if the token has expired
  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      }
      return false;
    } catch (err) {
      console.error("Failed to decode token:", err);
      return true; // If there's an error, consider the token expired
    }
  }

  // Retrieve the user token from localStorage
  getToken() {
    return localStorage.getItem('id_token');
  }

  // Save the user token to localStorage and redirect to homepage
  login(idToken) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  // Clear the user token from localStorage and redirect to homepage
  logout() {
    localStorage.removeItem('id_token');
    window.location.assign('/');
  }
}

export default new AuthService();
