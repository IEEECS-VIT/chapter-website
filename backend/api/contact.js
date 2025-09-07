import nodemailer from "nodemailer";

export default async function handler(req, res) {
  const allowedOrigins = ["https://ieee-cs-website-latest.vercel.app"];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  } else {
    // fallback for debugging (remove later)
    res.setHeader("Access-Control-Allow-Origin", "*");
  }

  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end(); // Preflight OK
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: process.env.EMAIL_SECURE === "true",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"IEEE CS VIT Website"`,
      to: process.env.EMAIL_TO,
      subject: "New Contact Form Submission – IEEE CS VIT",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #EF9E00; text-align: center;">IEEE Computer Society, VIT</h2>
          <p>Hello Team,</p>
          <p>You've received a new message from your website's contact form.</p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p style="background: #f5f5f5; padding: 10px; border-radius: 5px;">${message}</p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          <p style="text-align: center; color: #777;">This is an automated notification from IEEE Computer Society, VIT.</p>
        </div>
      `,
    });

    res.status(200).json({
      status: "success",
      message: "Email sent successfully!",
      style: {
        color: "green",
        fontWeight: "600",
        backgroundColor: "#e6ffed",
        padding: "10px 15px",
        borderRadius: "6px",
      },
    });
  } catch (err) {
    console.error("Error sending email:", err);
    res.status(500).json({ error: "Failed to send email" });
  }
}

export const config = {
  api: {
    bodyParser: true,
  },
};
