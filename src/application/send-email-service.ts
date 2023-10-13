export default interface SendEmailService {
  sendEmail(
    recipientEmail: string,
    subject: string,
    message: string
  ): Promise<void>;
}
