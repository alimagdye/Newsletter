import jwt from "jsonwebtoken";
import { Resend } from "resend";
import sanitize from "sanitize-html";


export const subscribeUser = async (req, res) => {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const rawEmail = req.body.email;
  const email: string = sanitize(rawEmail);
  const jwtSecret: string = process.env.JWT_SECRET || "defaultSecret";
  const jwtExpiry: string = process.env.JWT_EXPIRES_IN || "1h";

  // Validate email format
  if (!email) {
    return res.status(400).json({ message: "Email is required." });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ message: "Invalid email format." });
  }

  try {
    const token = jwt.sign(
      { email } as jwt.JwtPayload,
      jwtSecret as jwt.Secret,
      {
        expiresIn: jwtExpiry,
      } as jwt.SignOptions
    );

    // Construct confirmation link
    const confirmLink = `http://localhost:3000/api/v1/newsletter/subscribers/confirm?token=${token}`;

    // Send confirmation email
    const test = await resend.emails.send({
      from: "Ali Test <onboarding@resend.dev>",
      to: email,
      subject: "Confirm your subscription",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>📩 Confirm Your Subscription</h2>
          <p>Click the link below to confirm your email address:</p>
          <a href="${confirmLink}" style="color: #1d4ed8;">${confirmLink}</a>
          <p style="margin-top: 20px;">If you did not request this, please ignore this email.</p>
        </div>
      `,
    });
    console.log(test);

    res.status(200).json({ message: "Confirmation email sent!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to send confirmation email." });
  }
};
