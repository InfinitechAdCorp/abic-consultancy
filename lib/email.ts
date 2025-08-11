import nodemailer from "nodemailer"

// Create a transporter using your SMTP settings from environment variables
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number.parseInt(process.env.SMTP_PORT || "587", 10),
  secure: process.env.SMTP_SECURE === "true", // Use 'true' for SSL/TLS, 'false' for STARTTLS
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function sendEmail(to: string, subject: string, html: string) {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to,
      subject,
      html,
    })
    console.log(`Email sent to ${to} successfully.`)
  } catch (error) {
    console.error(`Failed to send email to ${to}:`, error)
    throw new Error(`Failed to send email to ${to}`)
  }
}
