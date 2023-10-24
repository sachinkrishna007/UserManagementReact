import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

import Admin from "../models/adminModel.js";


const Adminprotect = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_CODE);

      req.user = await Admin.findById(decoded.userId).select("-password");

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

export { Adminprotect };
