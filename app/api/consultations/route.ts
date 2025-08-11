import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

interface ConsultationData {
  firstName: string
  lastName: string
  email: string
  phone: string
  country: string
  serviceType: string
  otherServiceDetails: string
  consultationType: string
  preferredDate: string
  preferredTime: string
  message: string
  agreeToTerms: boolean
  subscribeNewsletter: boolean
}

// Country codes to names (basic mapping) - Re-added for server-side email rendering
const countryNames: Record<string, string> = {
  'PH': 'Philippines',
  'US': 'United States',
  'CA': 'Canada',
  'AU': 'Australia',
  'GB': 'United Kingdom',
  'SG': 'Singapore',
  'JP': 'Japan',
  'KR': 'South Korea'
};

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

// Service type labels
const serviceTypeLabels: Record<string, string> = {
  'business-setup': 'Business Setup & Registration',
  'visa-services': 'Visa & Immigration Services',
  'tax-accounting': 'Tax & Accounting Services',
  'license-permit': 'License & Permit Applications',
  'business-renewal': 'Business Renewal Services',
  'amendment': 'Business Amendment Services',
  'consultation': 'General Business Consultation',
  'other': 'Other Services'
}

// Consultation type labels
const consultationTypeLabels: Record<string, string> = {
  'online': 'Online (Video Call)',
  'phone': 'Phone Call',
  'office': 'In-Person (Office Visit)'
}

export async function POST(request: NextRequest) {
  try {
    const data: ConsultationData = await request.json()

    // Validate required fields
    if (!data.firstName || !data.lastName || !data.email || !data.phone ||
        !data.country || !data.serviceType || !data.preferredDate ||
        !data.preferredTime || !data.agreeToTerms) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Additional validation for other service details
    if (data.serviceType === 'other' && !data.otherServiceDetails?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: 'Other service details are required when selecting "Other Services"',
          errors: {
            otherServiceDetails: ['Please describe the service you need']
          }
        },
        { status: 422 }
      )
    }

    // Submit to Laravel backend
    const backendResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/consultations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        phone: data.phone,
        country: data.country,
        service_type: data.serviceType,
        other_service_details: data.otherServiceDetails,
        consultation_type: data.consultationType,
        preferred_date: data.preferredDate,
        preferred_time: data.preferredTime,
        message: data.message,
        agree_to_terms: data.agreeToTerms,
        subscribe_newsletter: data.subscribeNewsletter
      })
    })

    if (!backendResponse.ok) {
      const errorData = await backendResponse.json()
      return NextResponse.json(
        { success: false, message: 'Failed to save consultation to backend', error: errorData },
        { status: 500 }
      )
    }

    const backendResult = await backendResponse.json()

    // Send email notification to admin
    try {
      const transporter = createTransporter()

      const adminEmail = process.env.ADMIN_EMAIL;
      const smtpFrom = process.env.SMTP_FROM;

      if (!adminEmail) {
        console.error('ADMIN_EMAIL environment variable is not set. Admin email will not be sent.');
      }
      if (!smtpFrom) {
        console.error('SMTP_FROM environment variable is not set. Emails might not be sent or might be marked as spam.');
      }

      const adminEmailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #10b981, #3b82f6); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px; }
            .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 20px 0; }
            .info-item { background: white; padding: 15px; border-radius: 6px; border-left: 4px solid #3b82f6; }
            .label { font-weight: bold; color: #374151; margin-bottom: 5px; }
            .value { color: #6b7280; }
            .message-box { background: white; padding: 20px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #10b981; }
            .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 New Consultation Request</h1>
              <p>A new consultation request has been submitted through your website.</p>
            </div>

            <div class="content">
              <div class="info-grid">
                <div class="info-item">
                  <div class="label">👤 Client Name</div>
                  <div class="value">${data.firstName} ${data.lastName}</div>
                </div>
                <div class="info-item">
                  <div class="label">📧 Email</div>
                  <div class="value">${data.email}</div>
                </div>
                <div class="info-item">
                  <div class="label">📱 Phone</div>
                  <div class="value">${data.phone}</div>
                </div>
                <div class="info-item">
                  <div class="label">🌍 Country</div>
                  <div class="value">${countryNames[data.country] || data.country}</div>
                </div>
                <div class="info-item">
                  <div class="label">🏢 Service Type</div>
                  <div class="value">${serviceTypeLabels[data.serviceType] || data.serviceType}</div>
                </div>
                <div class="info-item">
                  <div class="label">💬 Consultation Type</div>
                  <div class="value">${consultationTypeLabels[data.consultationType] || data.consultationType}</div>
                </div>
                <div class="info-item">
                  <div class="label">📅 Preferred Date</div>
                  <div class="value">${new Date(data.preferredDate).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</div>
                </div>
                <div class="info-item">
                  <div class="label">🕐 Preferred Time</div>
                  <div class="value">${data.preferredTime}</div>
                </div>
              </div>
              ${data.otherServiceDetails ? `
                <div class="message-box">
                  <div class="label">📝 Other Service Details</div>
                  <div class="value">${data.otherServiceDetails}</div>
                </div>
              ` : ''}
              ${data.message ? `
                <div class="message-box">
                  <div class="label">💭 Additional Message</div>
                  <div class="value">${data.message}</div>
                </div>
              ` : ''}
              <div class="info-grid">
                <div class="info-item">
                  <div class="label">📧 Newsletter Subscription</div>
                  <div class="value">${data.subscribeNewsletter ? 'Yes' : 'No'}</div>
                </div>
                <div class="info-item">
                  <div class="label">📅 Submitted</div>
                  <div class="value">${new Date().toLocaleString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}</div>
                </div>
              </div>
              <div class="footer">
                <p><strong>ABIC Consultancy</strong></p>
                <p>This email was automatically generated from your consultation form.</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `
      if (adminEmail && smtpFrom) { // Only attempt to send if both are defined
        await transporter.sendMail({
          from: smtpFrom,
          to: adminEmail,
          subject: `🎉 New Consultation Request - ${data.firstName} ${data.lastName}`,
          html: adminEmailHtml,
        })
      } else {
        console.warn('Admin email or SMTP_FROM is not configured, skipping admin email notification.');
      }

      // Send confirmation email to client
      const clientEmailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #10b981, #3b82f6); color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
            .content { background: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px; }
            .highlight-box { background: white; padding: 20px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #10b981; }
            .next-steps { background: white; padding: 20px; border-radius: 6px; margin: 20px 0; }
            .step { display: flex; align-items: center; margin: 10px 0; }
            .step-number { background: #3b82f6; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 10px; font-weight: bold; }
            .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✅ Consultation Request Confirmed!</h1>
              <p>Thank you for choosing ABIC Consultancy</p>
            </div>

            <div class="content">
              <p>Dear <strong>${data.firstName} ${data.lastName}</strong>,</p>

              <p>We've successfully received your consultation request. Here are the details:</p>
              <div class="highlight-box">
                <p><strong>📋 Service:</strong> ${serviceTypeLabels[data.serviceType] || data.serviceType}</p>
                <p><strong>💬 Type:</strong> ${consultationTypeLabels[data.consultationType] || data.consultationType}</p>
                <p><strong>📅 Preferred Date:</strong> ${new Date(data.preferredDate).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</p>
                <p><strong>🕐 Preferred Time:</strong> ${data.preferredTime}</p>
              </div>
              <div class="next-steps">
                <h3>What happens next?</h3>
                <div class="step">
                  <div class="step-number">1</div>
                  <div>Our team will review your request within 24 hours</div>
                </div>
                <div class="step">
                  <div class="step-number">2</div>
                  <div>We'll contact you via phone or email to confirm your appointment</div>
                </div>
                <div class="step">
                  <div class="step-number">3</div>
                  <div>You'll receive a calendar invitation with meeting details</div>
                </div>
              </div>
              <div class="highlight-box">
                <p><strong>📞 Need immediate assistance?</strong></p>
                <p>Phone: +63 915 5800518</p>
                <p>Email: zoe@abicph.com</p>
                <p>Office: Unit 402 Campos Rueda Building, Urban Ave. Makati City, Philippines</p>
              </div>
              <div class="footer">
                <p><strong>ABIC Consultancy</strong></p>
                <p>Streamlining Your Business Needs Since 2018</p>
                <p>This is an automated confirmation email.</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `
      if (smtpFrom) { // Only attempt to send if SMTP_FROM is defined
        await transporter.sendMail({
          from: smtpFrom,
          to: data.email,
          subject: '✅ Your Consultation Request Confirmed - ABIC Consultancy',
          html: clientEmailHtml,
        })
      } else {
        console.warn('SMTP_FROM is not configured, skipping client confirmation email.');
      }

    } catch (emailError) {
      console.error('Email sending failed:', emailError)
      // Don't fail the API call if email fails, but log the error
    }

    return NextResponse.json({
      success: true,
      message: 'Consultation request submitted successfully',
      data: backendResult.data
    })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
