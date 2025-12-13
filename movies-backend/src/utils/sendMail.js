// // src/utils/sendMail.js
// const nodemailer = require("nodemailer");

// let transporter = null;

// if (process.env.MAIL_USER && process.env.MAIL_PASS) {
//   transporter = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 587,
//     secure: false, // STARTTLS
//     auth: {
//       user: process.env.MAIL_USER,
//       pass: process.env.MAIL_PASS,
//     },
//   });
// } else {
//   console.log(
//     "⚠️ MAIL_USER or MAIL_PASS missing — emails will only be shown in console."
//   );
// }

// /**
//  * Generic mail sender
//  * @param {string} to
//  * @param {string} subject
//  * @param {string} text  - plain text body (we’ll also wrap it in simple HTML)
//  */
// async function sendMail(to, subject, text) {
//   // No real transporter? Just log in console (dev mode).
//   if (!transporter) {
//     console.log("\n===== DEV EMAIL LOG =====");
//     console.log(`To: ${to}`);
//     console.log(`Subject: ${subject}`);
//     console.log(`Text: ${text}`);
//     console.log("=================================\n");
//     return;
//   }

//   const html = `
//     <div style="font-family: Arial, sans-serif; padding: 10px;">
//       <h2>${subject}</h2>
//       <p>${text.replace(/\n/g, "<br/>")}</p>
//       <br/>
//       <p>Regards,<br/>CineSnap Team 🎬</p>
//     </div>
//   `;

//   const info = await transporter.sendMail({
//     from: `"CineSnap" <${process.env.MAIL_USER}>`,
//     to,
//     subject,
//     text,
//     html,
//   });

//   console.log("📧 Email sent:", info.messageId);
// }

// module.exports = sendMail;
// src/utils/sendMail.js

// Dev-only mail helper: just log to console, no real email sending
async function sendMail(to, subject, text) {
  console.log("\n===== DEV EMAIL LOG =====");
  console.log(`To: ${to}`);
  console.log(`Subject: ${subject}`);
  console.log("Text:");
  console.log(text);
  console.log("=================================\n");
  // Do NOT throw anything – pretend send was successful
}

module.exports = sendMail;
