import jwt from "jsonwebtoken";

const AdmingenarateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_CODE, {
    expiresIn: "10d",
  });
  console.log(token);
  res.cookie("jwt", token, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};

export default AdmingenarateToken;
