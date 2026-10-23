import { NextResponse } from 'next/server';
import { getSettings, saveSettings } from '@/lib/content';

function checkAuth(req: Request): boolean {
  const pin = req.headers.get('x-admin-pin');
  const settings = getSettings();
  return pin === settings.adminPin;
}

export async function GET(req: Request) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const settings = getSettings();
  return NextResponse.json({ settings });
}

export async function POST(req: Request) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const current = getSettings();
    const updated = {
      ...current,
      ...body,
      notifications: {
        ...current.notifications,
        ...(body.notifications || {}),
      },
    };
    saveSettings(updated);
    return NextResponse.json({ success: true, settings: updated });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}
