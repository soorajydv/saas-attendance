import nodemailer from 'nodemailer';
import { GMAIL_USER, GMAIL_PASSWORD } from '../config/env.cofig';

const sendEmail = async (to: string, subject: string, htmlContent: string): Promise<void> => {
  // Create reusable transporter object using SMTP (e.g., Gmail or SMTP provider)
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Or use 'smtp.ethereal.email' for testing
    auth: {
      user: GMAIL_USER as string,
      pass: GMAIL_PASSWORD as string,
    },
  });

  const mailOptions = {
    from: `"Attendance System" <${GMAIL_USER}>`,
    to,
    subject,
    html: htmlContent,
  };
  console.log(mailOptions);
  

  await transporter.sendMail(mailOptions);
};

export default sendEmail;
