import { MailgunTemplate } from 'ts-mailgun/mailgun-template';

export const buildPasswordRecoveryTemplate = (link: string): MailgunTemplate => {
  const body = `<p>Para acceder nuevamente a tu cuenta genera una nueva contraseña haciendo clic <a href=${link}>aquí</a></p>`;
  const subject = 'De Taquito - Recuperación de cuenta';

  return {
    body,
    subject,
  };
};
