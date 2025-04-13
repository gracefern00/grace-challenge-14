import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  // Get the decoded token (user profile)
  getProfile() {
    const token = this.getToken();
    if (token) {
      return jwtDecode<JwtPayload>(token); // Decoding the token to get user data
    }
    return null; // Return null if there's no token
  }

  // Check if the user is logged in
  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token); // Return true if token exists and is not expired
  }

  // Check if the token has expired
  isTokenExpired(token: string) {
    try {
      const decoded: JwtPayload = jwtDecode(token); // Decode the token
      const exp = decoded.exp as number;
      return Date.now() >= exp * 1000; // Compare current time with expiration time
    } catch (e) {
      return true; // If decoding fails, assume the token is expired
    }
  }

  // Get the token from localStorage
  getToken(): string {
    return localStorage.getItem("jwt") || ""; // Retrieve the token from localStorage
  }

  // Store the token and redirect to home
  login(idToken: string) {
    localStorage.setItem("jwt", idToken); // Store the token
    window.location.href = "/"; // Redirect to home page (or Kanban board page)
  }

  // Remove the token and redirect to login
  logout() {
    localStorage.removeItem("jwt"); // Remove token from localStorage
    window.location.href = "/login"; // Redirect to login page
  }
}

export default new AuthService();
