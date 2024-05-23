import jwt from "jsonwebtoken";

const secretKey = process.env.SECRET_KEY

export default function adminMiddleWare(req, res, next) {
  const accessToken = req.headers.authorization.split(" ")[1];
  const refreshToken = req.headers.cookie.split('=')[1];
  console.log(refreshToken)
  try {
    const decoded = jwt.verify(accessToken, secretKey);
    if (dec.role !== 'ADMIN') {
      return res.status(401).send({ message: "you're not admin" });
    }
    req.user = decoded.user;
    next();
  } catch (error) {
    if (!refreshToken) {
      return res.status(401).send('Access Denied. No refresh token provided.');
    }

    try {
      const decoded = jwt.verify(refreshToken, secretKey);
      const accessToken = jwt.sign({ _id: decoded._id, role: "ADMIN" }, secretKey, { expiresIn: '1m' });

      res
        .cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'strict' })
        .header('Authorization', accessToken)
        .send(decoded.user);
    } catch (error) {
      return res.status(400).send('Invalid Token.');
    }
  }
}
