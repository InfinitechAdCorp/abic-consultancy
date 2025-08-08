import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// Create transporter for sending emails
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
}

export async function POST(request: NextRequest) {
  try {
    const { consultationId, to, subject, message, clientName } = await request.json()

    if (!to || !subject || !message) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      )
    }

    const transporter = createTransporter()

    const replyEmailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #10b981, #3b82f6); color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
          .content { background: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px; }
          .message-content { background: white; padding: 20px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #3b82f6; }
          .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; }
          .contact-info { background: white; padding: 20px; border-radius: 6px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📧 Message from ABIC Business</h1>
            <p>Personal response to your consultation request</p>
          </div>
          
          <div class="content">
            <p>Dear <strong>${clientName}</strong>,</p>
            
            <div class="message-content">
              ${message.replace(/\n/g, '<br>')}
            </div>

            <div class="contact-info">
              <h3>📞 Contact Information</h3>
              <p><strong>Phone:</strong> +63 915 5800518</p>
              <p><strong>Email:</strong> zoe@abicph.com</p>
              <p><strong>Office:</strong> Unit 402 Campos Rueda Building, Urban Ave. Makati City, Philippines</p>
            </div>

            <div class="footer">
              <p><strong>ABIC Consultancy</strong></p>
              <p>Streamlining Your Business Needs Since 2018</p>
              <p>This email was sent in response to your consultation request.</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `

    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: to,
      subject: subject,
      html: replyEmailHtml,
    })

    return NextResponse.json({
      success: true,
      message: 'Reply sent successfully'
    })

  } catch (error) {
    console.error('Reply email error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to send reply' },
      { status: 500 }
    )
  }
}
