import nodemailer from 'nodemailer';
import { Lead, getSettings } from './content';

export interface NotificationResult {
  emailSent: boolean;
  whatsappPrepared: boolean;
  telegramSent: boolean;
  whatsappUrl: string;
}

export async function sendLeadNotifications(lead: Lead): Promise<NotificationResult> {
  const settings = getSettings();
  const summaryText = `🏠 Новый лид с сайта Elena Stazhkova Real Estate!
---------------------------------------
👤 Имя: ${lead.name}
📞 Телефон: ${lead.phone || 'Не указан'}
✉️ Email: ${lead.email || 'Не указан'}
🛏️ Спальни: ${lead.bedrooms}
📍 Район: ${lead.area}
⏱️ Сроки: ${lead.timeline}
💰 Бюджет: ${lead.budget}
🌐 Язык: ${lead.lang.toUpperCase()}
📅 Дата: ${new Date(lead.createdAt).toLocaleString()}
---------------------------------------`;

  const htmlBody = `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; background-color: #ffffff;">
  <div style="background-color: #31312c; color: white; padding: 20px; text-align: center;">
    <h2 style="margin: 0; color: #20c063; font-size: 22px;">Новая заявка с сайта</h2>
    <p style="margin: 5px 0 0 0; font-size: 14px; color: #d1d5db;">Elena Stazhkova Real Estate</p>
  </div>
  <div style="padding: 24px;">
    <table style="width: 100%; border-collapse: collapse; font-size: 15px;">
      <tr><td style="padding: 8px 0; color: #6b7280; width: 140px;">Клиент:</td><td style="padding: 8px 0; font-weight: bold; color: #111827;">${lead.name}</td></tr>
      <tr><td style="padding: 8px 0; color: #6b7280;">Телефон:</td><td style="padding: 8px 0; font-weight: bold; color: #111827;"><a href="tel:${lead.phone}" style="color: #20c063; text-decoration: none;">${lead.phone || 'Не указан'}</a></td></tr>
      <tr><td style="padding: 8px 0; color: #6b7280;">Email:</td><td style="padding: 8px 0; color: #111827;"><a href="mailto:${lead.email}" style="color: #20c063; text-decoration: none;">${lead.email || 'Не указан'}</a></td></tr>
      <tr><td style="padding: 8px 0; color: #6b7280;">Спальни:</td><td style="padding: 8px 0; color: #111827;">${lead.bedrooms}</td></tr>
      <tr><td style="padding: 8px 0; color: #6b7280;">Район:</td><td style="padding: 8px 0; font-weight: bold; color: #111827;">${lead.area}</td></tr>
      <tr><td style="padding: 8px 0; color: #6b7280;">Бюджет:</td><td style="padding: 8px 0; font-weight: bold; color: #20c063;">${lead.budget}</td></tr>
      <tr><td style="padding: 8px 0; color: #6b7280;">Сроки покупки:</td><td style="padding: 8px 0; color: #111827;">${lead.timeline}</td></tr>
      <tr><td style="padding: 8px 0; color: #6b7280;">Язык:</td><td style="padding: 8px 0; color: #111827;">${lead.lang.toUpperCase()}</td></tr>
      <tr><td style="padding: 8px 0; color: #6b7280;">Дата:</td><td style="padding: 8px 0; color: #6b7280; font-size: 13px;">${new Date(lead.createdAt).toLocaleString()}</td></tr>
    </table>
    ${
      lead.phone
        ? `<div style="margin-top: 24px; text-align: center;">
      <a href="https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}" style="display: inline-block; background-color: #20c063; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 14px;">Написать клиенту в WhatsApp</a>
    </div>`
        : ''
    }
  </div>
</div>
`;

  // 1. WhatsApp Direct Link
  const clientCleanPhone = lead.phone.replace(/[^0-9]/g, '');
  const encodedClientMsg = encodeURIComponent(
    `Hello ${lead.name}! This is Elena Stazhkova, licensed Florida realtor. I received your property search request for ${lead.area} (Budget: ${lead.budget}). When would be a convenient time for a brief call?`
  );
  const whatsappUrl = `https://wa.me/${clientCleanPhone}?text=${encodedClientMsg}`;

  let emailSent = false;
  const whatsappPrepared = true;
  let telegramSent = false;

  // 2. Email Notification Dispatcher (SMTP via nodemailer or Resend)
  if (settings.notifications.emailEnabled) {
    try {
      const smtpHost = process.env.SMTP_HOST;
      const smtpUser = process.env.SMTP_USER;
      const smtpPass = process.env.SMTP_PASS;
      const smtpPort = Number(process.env.SMTP_PORT) || 465;

      // Extract recipients: from env NOTIFICATION_EMAILS (comma-separated), or settings
      const rawRecipients =
        process.env.NOTIFICATION_EMAILS || settings.contactEmail || 'elena@stazhkova.com';
      const recipients = rawRecipients
        .split(',')
        .map((e) => e.trim())
        .filter((e) => Boolean(e) && e.includes('@'));

      if (smtpHost && smtpUser && smtpPass) {
        const isSecure = smtpPort === 465;
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: isSecure,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        const fromAddress = process.env.SMTP_FROM || `"Elena Stazhkova Website" <${smtpUser}>`;

        await transporter.sendMail({
          from: fromAddress,
          to: recipients.join(', '),
          subject: `🏠 Новый лид: ${lead.name} (${lead.area}, ${lead.budget})`,
          text: summaryText,
          html: htmlBody,
        });

        console.log(`[SMTP SUCCESS] Sent lead email to: ${recipients.join(', ')}`);
        emailSent = true;
      } else if (process.env.RESEND_API_KEY) {
        const res = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: process.env.RESEND_FROM || 'onboarding@resend.dev',
            to: recipients,
            subject: `🏠 Новый лид: ${lead.name} (${lead.area}, ${lead.budget})`,
            text: summaryText,
            html: htmlBody,
          }),
        });
        if (res.ok) {
          console.log(`[RESEND SUCCESS] Sent lead email to: ${recipients.join(', ')}`);
          emailSent = true;
        } else {
          console.error('[RESEND ERROR]', await res.text());
        }
      } else {
        console.log(
          `[EMAIL STUB] SMTP credentials not set. Prepared email to ${recipients.join(', ')}:\n${summaryText}`
        );
      }
    } catch (err) {
      console.error('[EMAIL ERROR]', err);
    }
  }

  // 3. Telegram Dispatcher
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (botToken && chatId) {
    try {
      const res = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: summaryText,
        }),
      });
      if (res.ok) {
        console.log('[TELEGRAM SUCCESS] Notification delivered to chat:', chatId);
        telegramSent = true;
      } else {
        console.error('[TELEGRAM ERROR]', await res.text());
      }
    } catch (err) {
      console.error('[TELEGRAM ERROR]', err);
    }
  }

  // 4. WhatsApp Dispatcher (CallMeBot)
  const callMeBotKey = process.env.CALLMEBOT_API_KEY;
  const rawCallMeBotPhones = process.env.CALLMEBOT_PHONE || settings.contactWhatsApp;
  if (callMeBotKey && rawCallMeBotPhones) {
    const phones = rawCallMeBotPhones
      .split(',')
      .map((p) => p.replace(/[^0-9]/g, ''))
      .filter(Boolean);
    for (const phone of phones) {
      try {
        const waText = encodeURIComponent(summaryText);
        const res = await fetch(
          `https://api.callmebot.com/whatsapp.php?phone=${phone}&text=${waText}&apikey=${callMeBotKey}`
        );
        if (res.ok) {
          console.log(`[WHATSAPP SUCCESS] Sent lead notification to WhatsApp: ${phone}`);
        } else {
          console.error('[WHATSAPP ERROR]', await res.text());
        }
      } catch (err) {
        console.error('[WHATSAPP ERROR]', err);
      }
    }
  }

  return {
    emailSent,
    whatsappPrepared,
    telegramSent,
    whatsappUrl,
  };
}
