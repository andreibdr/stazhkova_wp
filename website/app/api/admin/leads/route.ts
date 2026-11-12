import { NextResponse } from 'next/server';
import { getLeadsAsync, saveLeads, getSettingsAsync } from '@/lib/content';

async function checkAuth(req: Request): Promise<boolean> {
  const pin = req.headers.get('x-admin-pin');
  const settings = await getSettingsAsync();
  return pin === settings.adminPin;
}

export async function GET(req: Request) {
  if (!(await checkAuth(req))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const leads = await getLeadsAsync();
  return NextResponse.json({ leads });
}

export async function PUT(req: Request) {
  if (!(await checkAuth(req))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, status, notes } = body;
    const leads = await getLeadsAsync();
    const idx = leads.findIndex((l) => l.id === id);

    if (idx !== -1) {
      if (status !== undefined) leads[idx].status = status;
      if (notes !== undefined) leads[idx].notes = notes;
      await saveLeads(leads);
      return NextResponse.json({ success: true, lead: leads[idx] });
    }

    return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update lead' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  if (!(await checkAuth(req))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Missing ID' }, { status: 400 });

    const currentLeads = await getLeadsAsync();
    const leads = currentLeads.filter((l) => l.id !== id);
    await saveLeads(leads);
    return NextResponse.json({ success: true, leads });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete lead' }, { status: 500 });
  }
}
