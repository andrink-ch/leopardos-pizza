import nodemailer from "nodemailer";
import type { Booking } from "./types";

export async function sendBookingNotification(booking: Booking) {
  const pizzaLines = Object.entries(booking.pizzas)
    .filter(([, o]) => o.selected)
    .map(([name, o]) => `• ${name} ×${o.qty}${o.notes ? ` (${o.notes})` : ""}`)
    .join("\n");

  const body = `
New catering request received!

Name:     ${booking.name}
Email:    ${booking.email}
Phone:    ${booking.phone}
Date:     ${booking.date} at ${booking.time}
Location: ${booking.location}
Guests:   ${booking.guests}

Pizzas:
${pizzaLines || "None specified"}

Dietary: ${booking.dietary.length ? booking.dietary.join(", ") : "None"}
Allergies: ${booking.allergies || "None"}
Message: ${booking.message || "—"}

Review it in the admin panel.
  `.trim();

  const icloudPass = process.env.ICLOUD_APP_PASSWORD;

  if (icloudPass) {
    const transporter = nodemailer.createTransport({
      host: "smtp.mail.me.com",
      port: 587,
      secure: false,
      auth: { user: "andrin.kaech@icloud.com", pass: icloudPass },
    });
    await transporter.sendMail({
      from: "andrin.kaech@icloud.com",
      to: "andrin.kaech@icloud.com",
      subject: `New booking request from ${booking.name}`,
      text: body,
    });
  } else {
    // Test mode: prints a preview URL in the server console
    const testAccount = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: { user: testAccount.user, pass: testAccount.pass },
    });
    const info = await transporter.sendMail({
      from: `"Leopardo's Pizza" <${testAccount.user}>`,
      to: "andrin.kaech@icloud.com",
      subject: `New booking request from ${booking.name}`,
      text: body,
    });
    console.log("📧 Email preview URL:", nodemailer.getTestMessageUrl(info));
  }
}
