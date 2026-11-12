import { NextResponse } from 'next/server';
import { getSettingsAsync, saveSettings } from '@/lib/content';

async function checkAuth(req: Request): Promise<boolean> {
  const pin = req.headers.get('x-admin-pin');
  const settings = await getSettingsAsync();
  return pin === settings.adminPin;
}

export async function GET(req: Request) {
  if (!(await checkAuth(req))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const settings = await getSettingsAsync();
  return NextResponse.json({ settings });
}

export async function POST(req: Request) {
  if (!(await checkAuth(req))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const current = await getSettingsAsync();
    const updated = {
      ...current,
      ...body,
      notifications: {
        ...current.notifications,
        ...(body.notifications || {}),
      },
    };
    await saveSettings(updated);
    return NextResponse.json({ success: true, settings: updated });
  } catch (error: any) {
    console.error('Error updating settings:', error);
    return NextResponse.json({ error: error?.message || 'Failed to update settings' }, { status: 500 });
  }
}
