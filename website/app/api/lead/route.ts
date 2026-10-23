import { NextResponse } from 'next/server';
import { addLead } from '@/lib/content';
import { sendLeadNotifications } from '@/lib/notifications';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, email, bedrooms, area, timeline, budget, lang } = body;

    if (!name || (!phone && !email)) {
      return NextResponse.json(
        { error: 'Name and either phone or email are required' },
        { status: 400 }
      );
    }

    const lead = addLead({
      name: name.trim(),
      phone: (phone || '').trim(),
      email: (email || '').trim(),
      bedrooms: bedrooms || 'Not specified',
      area: area || 'South Florida',
      timeline: timeline || 'Not specified',
      budget: budget || 'Not specified',
      lang: lang || 'ru',
    });

    const notifResult = await sendLeadNotifications(lead);

    return NextResponse.json({
      success: true,
      lead,
      notification: notifResult,
    });
  } catch (error) {
    console.error('Error processing lead:', error);
    return NextResponse.json(
      { error: 'Internal server error processing lead' },
      { status: 500 }
    );
  }
}
