import nodemailer from 'nodemailer';

interface SendResetEmailParams {
  to: string;
  pin: string;
  resetUrl: string;
  adminName?: string;
  resetType?: 'pin' | 'password';
}

/**
 * Creates a Nodemailer transporter optimized for Vercel Serverless.
 * Uses Direct SSL Port 465 for smtp.gmail.com to prevent STARTTLS connection hangs.
 */
function getEmailTransporter() {
  const user = (process.env.EMAIL_USER || 'waseerdawakhana@gmail.com').trim().replace(/['"]/g, '');
  const rawPass =
    process.env.EMAIL_APP_PASSWORD ||
    process.env.GMAIL_APP_PASSWORD ||
    process.env.EMAIL_PASSWORD ||
    '';
  const pass = rawPass.replace(/[\s'"]/g, '');

  if (!pass) {
    console.warn(
      '[Email Service] Warning: EMAIL_APP_PASSWORD is not set in environment variables. ' +
      'Please add EMAIL_APP_PASSWORD to your .env.local and Vercel project settings.'
    );
    return null;
  }

  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // SSL
    auth: {
      user,
      pass,
    },
    // Serverless optimization: fast timeouts so Vercel lambdas don't block
    connectionTimeout: 8000,
    greetingTimeout: 5000,
    socketTimeout: 10000,
  });
}

/**
 * Sends luxury branded WASEER Dawa Khana Admin recovery email containing 6-digit PIN and direct reset link.
 */
export async function sendAdminPasswordResetEmail({
  to,
  pin,
  resetUrl,
  adminName = 'Waseer Admin',
  resetType = 'password',
}: SendResetEmailParams): Promise<{ success: boolean; preview?: boolean; messageId?: string }> {
  const transporter = getEmailTransporter();

  const isPinReset = resetType === 'pin';
  const subject = isPinReset
    ? `🔐 WASEER Admin Security PIN Recovery Code: ${pin}`
    : `🔐 WASEER Admin Password Reset Code: ${pin}`;
  const bannerTitle = isPinReset ? 'Admin Security PIN Reset' : 'Admin Password Reset';
  const descriptionText = isPinReset
    ? `A request was received to reset the <strong>Security PIN</strong> for your WASEER Dawa Khana Admin Portal account (<strong style="color: #FAF7F2;">${to}</strong>).`
    : `A request was received to reset the <strong>Login Password</strong> for your WASEER Dawa Khana Admin Portal account (<strong style="color: #FAF7F2;">${to}</strong>).`;
  const buttonText = isPinReset ? 'Reset Security PIN Now &rarr;' : 'Reset Password Now &rarr;';

  // If email password is not yet configured, provide developer simulation
  if (!transporter) {
    console.log('====================================================');
    console.log(`[DEV SIMULATION] ${bannerTitle} triggered:`);
    console.log(`Destination: ${to}`);
    console.log(`6-Digit Verification PIN: ${pin}`);
    console.log(`Direct Reset Link: ${resetUrl}`);
    console.log('====================================================');
    return {
      success: true,
      preview: true,
    };
  }

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${bannerTitle}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #040A07; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #FAF7F2;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #040A07; padding: 40px 15px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 560px; background-color: #0A1A12; border: 1px solid rgba(212, 175, 55, 0.35); border-radius: 24px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.6);">
          
          <!-- Header Banner -->
          <tr>
            <td style="padding: 36px 32px 24px; text-align: center; background: linear-gradient(180deg, #0E2419 0%, #0A1A12 100%); border-bottom: 1px solid rgba(212, 175, 55, 0.2);">
              <div style="display: inline-block; padding: 6px 16px; background-color: rgba(212, 175, 55, 0.12); border: 1px solid rgba(212, 175, 55, 0.4); border-radius: 999px; margin-bottom: 14px;">
                <span style="font-size: 11px; font-weight: 700; letter-spacing: 2px; color: #D4AF37; text-transform: uppercase;">
                  WASEER DAWA KHANA • OWNER SECURITY
                </span>
              </div>
              <h1 style="margin: 0; font-size: 24px; font-weight: 700; color: #FAF7F2; letter-spacing: -0.5px;">
                ${bannerTitle}
              </h1>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding: 32px 32px 20px;">
              <p style="margin: 0 0 16px; font-size: 15px; line-height: 1.6; color: #D5DDD8;">
                Hello <strong>${adminName}</strong>,
              </p>
              <p style="margin: 0 0 24px; font-size: 14px; line-height: 1.6; color: #9EAEA4;">
                ${descriptionText}
              </p>

              <!-- 6-Digit PIN Block -->
              <div style="background-color: #06110C; border: 1px solid rgba(212, 175, 55, 0.4); border-radius: 16px; padding: 24px; text-align: center; margin-bottom: 28px;">
                <span style="display: block; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1.5px; color: #9EAEA4; margin-bottom: 8px;">
                  Your 6-Digit Verification PIN
                </span>
                <span style="font-family: 'Courier New', Courier, monospace; font-size: 36px; font-weight: 800; letter-spacing: 10px; color: #D4AF37; text-shadow: 0 2px 8px rgba(212, 175, 55, 0.3);">
                  ${pin}
                </span>
                <span style="display: block; font-size: 12px; color: #73847A; margin-top: 8px;">
                  Valid for 15 minutes only
                </span>
              </div>

              <!-- Button CTA -->
              <div style="text-align: center; margin-bottom: 28px;">
                <a href="${resetUrl}" style="display: inline-block; background-color: #D4AF37; color: #040A07; font-size: 14px; font-weight: 700; text-decoration: none; padding: 16px 36px; border-radius: 12px; text-transform: uppercase; letter-spacing: 1px; box-shadow: 0 8px 20px rgba(212, 175, 55, 0.35);">
                  ${buttonText}
                </a>
              </div>

              <!-- Security Notice -->
              <div style="background-color: rgba(244, 63, 94, 0.08); border-left: 3px solid #F43F5E; padding: 12px 16px; border-radius: 8px; margin-bottom: 20px;">
                <p style="margin: 0; font-size: 12px; line-height: 1.5; color: #FDA4AF;">
                  <strong>Security Advisory:</strong> If you did not make this request, you can safely ignore this email. Your current credentials will remain active and unchanged.
                </p>
              </div>

              <p style="margin: 0; font-size: 12px; color: #73847A; line-height: 1.5;">
                Or copy and paste this link in your browser:<br>
                <a href="${resetUrl}" style="color: #D4AF37; word-break: break-all; text-decoration: underline;">${resetUrl}</a>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 32px 28px; text-align: center; border-top: 1px solid rgba(212, 175, 55, 0.15); background-color: #06110C;">
              <p style="margin: 0; font-size: 11px; color: #73847A; line-height: 1.5;">
                &copy; ${new Date().getFullYear()} Waseer Dawa Khana. All rights reserved.<br>
                Empowering Pure Herbal Wellness Across Pakistan.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  const mailOptions = {
    from: `"WASEER Dawa Khana" <${process.env.EMAIL_USER || 'waseerdawakhana@gmail.com'}>`,
    to,
    subject,
    text: `${subject}\n\nReset URL: ${resetUrl}\n\nThis code expires in 15 minutes. If you did not request this, please ignore.`,
    html: htmlContent,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`[Email Service] ${bannerTitle} email sent to ${to}, ID: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error: any) {
    console.error('[Email Service] SendMail Error:', error.message);
    if (
      error.message?.includes('535') ||
      error.message?.includes('BadCredentials')
    ) {
      throw new Error(
        'Gmail Authentication Error (535): Google ne password reject kar diya hai. Vercel Settings mein ja kar EMAIL_APP_PASSWORD mein 16-character Google App Password set karein aur project ko REDEPLOY karein.'
      );
    }
    if (
      error.message?.includes('534') ||
      error.message?.includes('5.7.9') ||
      error.message?.includes('Application-specific password required') ||
      error.message?.includes('WebLoginRequired')
    ) {
      throw new Error(
        'Gmail Authentication Failed: Google requires a 16-character App Password (not your regular Gmail password). Please generate a 16-letter App Password at https://myaccount.google.com/apppasswords and set it in EMAIL_APP_PASSWORD.'
      );
    }
    throw error;
  }
}
