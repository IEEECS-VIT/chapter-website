import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const htmlContent = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #222; max-width: 650px; margin: auto; padding: 30px; border-radius: 15px; background: #fff; box-shadow: 0 8px 30px rgba(0,0,0,0.05); border: 1px solid #eee;">
  <h1 style="color: #EF9E00; text-align: center; font-size: 28px; margin-bottom: 20px;">IEEE Computer Society, VIT</h1>
  <p style="font-size: 16px;">Hello Team,</p>
  <p style="font-size: 16px;">You've received a new message from your website's contact form.</p>

  <div style="margin-top: 25px; padding: 20px; background: #f9f9f9; border-radius: 12px; border: 1px solid #eee;">
    <p><strong style="color:#EF9E00;">Name:</strong> ${name}</p>
    <p><strong style="color:#EF9E00;">Email:</strong> ${email}</p>
    <p><strong style="color:#EF9E00;">Message:</strong></p>
    <div style="background: #f0f0f0; padding: 15px; border-radius: 10px; font-style: italic; font-size: 15px; color: #555;">${message}</div>
  </div>

  <p style="text-align: center; font-size: 13px; color: #999; margin-top: 30px;">This is an automated notification from IEEE Computer Society, VIT.</p>
  <p style="text-align: center; font-size: 13px; color: #999;">&copy; ${new Date().getFullYear()} IEEE Computer Society, VIT</p>
</div>

  `;

  const mailOptions = {
    from: `"${name} <${email}>" <${process.env.SMTP_USER}>`,
    to: "utkarshkashyap4549@gmail.com",
    subject: `New Message from ${name}`,
    html: htmlContent,
    replyTo: email,
    cc: process.env.SMTP_CC || "",
    bcc: process.env.SMTP_BCC || "",
    attachments: [],
    priority: "high",
    envelope: { from: email, to: process.env.SMTP_USER },
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully!", info });
  } catch (error) {
    res.status(500).json({ message: "Failed to send email.", error });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
