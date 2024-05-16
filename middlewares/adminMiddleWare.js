import jwt from "jsonwebtoken";

export default function adminMiddleWare(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, process.env.SECRET_KEY, (err, dec) => {
    if (err) {
      res.status(401).send({ message: "invalid token" });
      return;
    } else {
      if (dec.role !== 'ADMIN') {
        res.status(401).send({ message: "you're not admin" });
        return;
      }
      req.admin = dec;
      next();
    }
  });
}
