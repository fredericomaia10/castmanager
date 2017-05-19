import { Accounts } from 'meteor/accounts-base';

const name = 'castmanager';
const email = '<suporte@castmanager.com.br>';
const from = `${name} ${email}`;
const emailTemplates = Accounts.emailTemplates;

emailTemplates.siteName = name;
emailTemplates.from = from;

emailTemplates.resetPassword = {
  subject() {
    return `[${name}] Redefina Sua Senha`;
  },
  text(user, url) {
    const userEmail = user.emails[0].address;
    const urlWithoutHash = url.replace('#/', '');

    return `Uma redefinição de senha foi solicitada para a conta relacionada à este email (${userEmail}). 
Para redefinir sua senha, visite o link a seguir:

${urlWithoutHash}

Se você não fez esta solicitação, por favor ignore este email.`;
  },
};
