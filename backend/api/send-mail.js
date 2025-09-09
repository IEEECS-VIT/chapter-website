import nodemailer from "nodemailer";

export default async function handler(req, res) {
  //allowing all requests
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

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
      <p>Hello Team,</p>
      <p>You've received a new message from your website's contact form.</p>
      <div style="margin-top: 25px; padding: 20px; background: #f9f9f9; border-radius: 12px; border: 1px solid #eee;">
        <p><strong style="color:#EF9E00;">Name:</strong> ${name}</p>
        <p><strong style="color:#EF9E00;">Email:</strong> ${email}</p>
        <p><strong style="color:#EF9E00;">Message:</strong></p>
        <div style="background: #f0f0f0; padding: 15px; border-radius: 10px; font-style: italic; font-size: 15px; color: #555;">${message}</div>
      </div>
      <p style="text-align: center; font-size: 13px; color: #999; margin-top: 30px;">This is an automated notification from IEEE Computer Society, VIT.</p>
    </div>
  `;

  try {
    const info = await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: "utkarshkashyap4549@gmail.com",
      subject: `New Message from ${name}`,
      html: htmlContent,
      replyTo: email,
    });

    return res.status(200).json({ message: "Email sent successfully!", info });
  } catch (error) {
    return res.status(500).json({ message: "Failed to send email.", error: error.message });
  }
}
