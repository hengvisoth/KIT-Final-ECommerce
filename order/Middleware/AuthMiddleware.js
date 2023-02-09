import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import axios from "axios";
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const res = await axios.get('http://localhost:3001/api/users/' +decoded.id, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + token
        }
      }
          )
          req.user = res.data
    // await fetch('http://localhost:3001/api/users/' +decoded.id, {
      //   method: 'GET',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': 'Bearer ' + token
      //   }
      // }
      // )
        next()
      // req.user = await User.findById(decoded.id).select("-password");
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

export default protect;
