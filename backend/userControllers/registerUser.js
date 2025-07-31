import path from 'path';

const registerUser = (req, res) => {
    console.log("we reach here")
  res.sendFile(path.resolve('../frontend/signup-login/signup.html'));
};

export { registerUser };
