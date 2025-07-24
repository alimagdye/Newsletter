import jwt from "jsonwebtoken";
import Subscriber from "../models/subscriberModel.ts";
import sanitize from "sanitize-html";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const confirmEmail = async (req, res) => {
  const token = sanitize(req.query.token);

  if (!token) {
    return res
      .status(400)
      .sendFile(path.join(__dirname, "../../public/error.html"));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as jwt.JwtPayload;
    const existing = await Subscriber.findOne({ email: decoded.email });

    if (existing) {
      return res.sendFile(
        path.join(__dirname, "../../public/already-subscribed.html")
      );
    }

    await Subscriber.create({ email: decoded.email });
    return res
      .status(200)
      .sendFile(path.join(__dirname, "../../public/success.html"));
  } catch (err) {
    return res
      .status(400)
      .sendFile(path.join(__dirname, "../../public/error.html"));
  }
};
