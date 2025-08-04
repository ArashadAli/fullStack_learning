import path from 'path';

const registerUser = (req, res) => {
  res.sendFile(path.resolve('../frontend/signup-login/signup.html'));
};

export { registerUser };
