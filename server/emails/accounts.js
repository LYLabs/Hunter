// const sgMail = require('@sendgrid/mail');

// const sendgridAPIKey = process.env.sendgridAPIKey;

// sgMail.setApiKey(sendgridAPIKey);

// const sendEmail = (email, name, progress, date, contactName) => {
//   const msg = {
//     to: email,
//     from: 'toeshoe3@gmail.com',
//     subject: `IMPORTANT REMINDER: next step with your application`,
//     text: `Hi ${name}, This is a friendly reminder that you have an upcoming ${progress} with ${contactName} on ${date}. Thank you!`,
//   };

//   sgMail
//     .send(msg)
//     .then(() => {
//       console.log('Email sent');
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// };

// module.exports = {
//   sendEmail,
// };
