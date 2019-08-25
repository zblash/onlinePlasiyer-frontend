export default function authHeader() {
  // return authorization header with jwt token
  let user = JSON.parse(localStorage.getItem('user'));

  if (user && user.token) {
    let token = 'Bearer ' + user.token;
    return token;
  } else {
    return {};
  }
}
