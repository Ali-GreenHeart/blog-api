import jwt from "jsonwebtoken";
export default function userMiddleWare(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, process.env.SECRET_KEY, (err, dec) => {
    if (err) {
      res.status(401).send({ message: "invalid token" });
      return;
    } else {
      req.user = dec;
      next();
    }
  });
}
