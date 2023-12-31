const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

const hashed = (pwd) => {
  const hashedPass = bcrypt.hashSync(pwd, salt);
  return hashedPass;
};

const match = (typed_pwd, hased_pwd) => {
  return bcrypt.compareSync(typed_pwd, hased_pwd);
};

module.exports = {
  hashed,
  match,
};