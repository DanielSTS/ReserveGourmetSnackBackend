import nodemailer from 'nodemailer';
import SendEmailService from '../../application/send-email-service';

export class NodeMailerService implements SendEmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      secure: true,
      port: 465,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
      }
    });
  }

  async sendEmail(
    recipientEmail: string,
    subject: string,
    message: string
  ): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: process.env.MAIL_USERNAME,
        to: recipientEmail,
        subject,
        text: message
      });
    } catch (error) {
      throw new Error(`Error to send email ${error}`);
    }
  }
}
