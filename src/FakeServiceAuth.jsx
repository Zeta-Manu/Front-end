export const AuthArgs = {
    password: '',
    username: '',
  };
  
  export const AuthFunction = (args) => {
    return new Promise((resolve, reject) => {
      // authentication logic 
      // check if the login and password are correct
      // If they are correct, resolve the promise, otherwise reject it
      if (args.username === 'correct_login' && args.password === 'correct_password') {
        resolve();
      } else {
        reject(new Error('Invalid login or password'));
      }
    });
  };

  export const loginUser = ({ password, username }) => new Promise((resolve, reject) => setTimeout(() => {
    if (username === 'testusername' && password === 'testpassword') {
      resolve(true);
    } else {
      reject('Credentials are wrong');
    }
  }, 1500));
  
  export const registerUser = ({ password, username, email }) => new Promise((resolve, reject) => setTimeout(() => {
    if (username === 'testusername' && password === 'testpassword' && email === 'tsebtseb.alone@gmail.com') {
      reject('Login already taken');
    } else {
      resolve(true);
    }
  }, 1500));
  
  