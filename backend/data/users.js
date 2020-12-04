import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Orhan Turan",
    email: "orhan@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Yavuz Turan",
    email: "yavuz@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
