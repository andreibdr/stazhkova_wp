import { NextResponse } from 'next/server';
import { getAllReviews, saveReviews, getSettings, Review } from '@/lib/content';

function checkAuth(req: Request): boolean {
  const pin = req.headers.get('x-admin-pin');
  const settings = getSettings();
  return pin === settings.adminPin;
}

export async function GET(req: Request) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const reviews = getAllReviews(true);
  return NextResponse.json({ reviews });
}

export async function POST(req: Request) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { action, reviewId, hidden, review } = body;
    const reviews = getAllReviews(true);

    if (action === 'toggle_hidden') {
      const idx = reviews.findIndex((r) => r.id === reviewId);
      if (idx !== -1) {
        reviews[idx].hidden = hidden;
        saveReviews(reviews);
        return NextResponse.json({ success: true, reviews });
      }
      return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    }

    if (action === 'add') {
      const newReview: Review = {
        id: Date.now(),
        author: review.author || 'Client',
        date: new Date().toISOString().split('T')[0],
        rating: review.rating || 5,
        text: review.text || '',
        hidden: Boolean(review.hidden),
        source: 'Zillow',
      };
      reviews.unshift(newReview);
      saveReviews(reviews);
      return NextResponse.json({ success: true, reviews });
    }

    if (action === 'update') {
      const idx = reviews.findIndex((r) => r.id === review.id);
      if (idx !== -1) {
        reviews[idx] = { ...reviews[idx], ...review };
        saveReviews(reviews);
        return NextResponse.json({ success: true, reviews });
      }
      return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    }

    if (action === 'delete') {
      const filtered = reviews.filter((r) => r.id !== reviewId);
      saveReviews(filtered);
      return NextResponse.json({ success: true, reviews: filtered });
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update reviews' }, { status: 500 });
  }
}
