import { NextResponse } from 'next/server';
import { getLeads, saveLeads, getSettings } from '@/lib/content';

function checkAuth(req: Request): boolean {
  const pin = req.headers.get('x-admin-pin');
  const settings = getSettings();
  return pin === settings.adminPin;
}

export async function GET(req: Request) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const leads = getLeads();
  return NextResponse.json({ leads });
}

export async function PUT(req: Request) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, status, notes } = body;
    const leads = getLeads();
    const idx = leads.findIndex((l) => l.id === id);

    if (idx !== -1) {
      if (status !== undefined) leads[idx].status = status;
      if (notes !== undefined) leads[idx].notes = notes;
      saveLeads(leads);
      return NextResponse.json({ success: true, lead: leads[idx] });
    }

    return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update lead' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Missing ID' }, { status: 400 });

    const leads = getLeads().filter((l) => l.id !== id);
    saveLeads(leads);
    return NextResponse.json({ success: true, leads });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete lead' }, { status: 500 });
  }
}
