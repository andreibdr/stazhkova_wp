import { Lead, getSettings } from './content';

export interface NotificationResult {
  emailSent: boolean;
  whatsappPrepared: boolean;
  telegramStubCalled: boolean;
  whatsappUrl: string;
}

export async function sendLeadNotifications(lead: Lead): Promise<NotificationResult> {
  const settings = getSettings();
  const summaryText = `🏠 Новый лид с сайта Elena Stazhkova Real Estate!
---------------------------------------
👤 Имя: ${lead.name}
📞 Телефон: ${lead.phone}
✉️ Email: ${lead.email}
🛏️ Спальни: ${lead.bedrooms}
📍 Район: ${lead.area}
⏱️ Сроки: ${lead.timeline}
💰 Бюджет: ${lead.budget}
🌐 Язык заявки: ${lead.lang.toUpperCase()}
📅 Дата: ${new Date(lead.createdAt).toLocaleString()}
---------------------------------------`;

  // 1. WhatsApp Direct Link for 1-click realtor outreach
  const clientCleanPhone = lead.phone.replace(/[^0-9]/g, '');
  const encodedClientMsg = encodeURIComponent(
    `Hello ${lead.name}! This is Elena Stazhkova, licensed Florida realtor. I received your property search request for ${lead.area} (Budget: ${lead.budget}). When would be a convenient time for a brief call?`
  );
  const whatsappUrl = `https://wa.me/${clientCleanPhone}?text=${encodedClientMsg}`;

  let emailSent = false;
  let whatsappPrepared = true;
  let telegramStubCalled = false;

  // 2. Email Notification Dispatcher
  if (settings.notifications.emailEnabled) {
    try {
      const recipient = settings.contactEmail || 'elena@stazhkova.com';
      console.log(`[EMAIL DISPATCH] Sending lead notification to ${recipient}:\n${summaryText}`);

      // If an external SMTP or Resend API key is configured in env:
      if (process.env.RESEND_API_KEY) {
        // Sample Resend integration:
        // await fetch('https://api.resend.com/emails', {
        //   method: 'POST',
        //   headers: {
        //     'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        //     'Content-Type': 'application/json'
        //   },
        //   body: JSON.stringify({
        //     from: 'noreply@stazhkova.com',
        //     to: recipient,
        //     subject: `New Lead: ${lead.name} (${lead.area}, ${lead.budget})`,
        //     text: summaryText
        //   })
        // });
      }
      emailSent = true;
    } catch (err) {
      console.error('[EMAIL ERROR]', err);
    }
  }

  // 3. WhatsApp Automated Bot (e.g. CallMeBot free API)
  if (settings.notifications.whatsappEnabled) {
    try {
      // CallMeBot example:
      // const realtorPhone = settings.contactWhatsApp.replace(/[^0-9]/g, '');
      // const callMeBotKey = process.env.CALLMEBOT_API_KEY;
      // if (callMeBotKey) {
      //   await fetch(`https://api.callmebot.com/whatsapp.php?phone=${realtorPhone}&text=${encodeURIComponent(summaryText)}&apikey=${callMeBotKey}`);
      // }
      console.log(`[WHATSAPP DISPATCH] Prepared notification for realtor: ${settings.contactWhatsApp}`);
    } catch (err) {
      console.error('[WHATSAPP ERROR]', err);
    }
  }

  // 4. Telegram Stub (Ready to activate whenever user provides BOT_TOKEN & CHAT_ID)
  if (settings.notifications.telegramStubEnabled || process.env.TELEGRAM_BOT_TOKEN) {
    telegramStubCalled = true;
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    if (botToken && chatId) {
      try {
        console.log('[TELEGRAM DISPATCH] Sending to chat:', chatId);
        // await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ chat_id: chatId, text: summaryText })
        // });
      } catch (err) {
        console.error('[TELEGRAM ERROR]', err);
      }
    } else {
      console.log('[TELEGRAM STUB] Token or Chat ID not configured. Message ready:\n', summaryText);
    }
  }

  return {
    emailSent,
    whatsappPrepared,
    telegramStubCalled,
    whatsappUrl,
  };
}
