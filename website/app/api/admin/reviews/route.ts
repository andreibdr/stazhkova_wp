import { NextResponse } from 'next/server';
import { getAllReviewsAsync, saveReviews, getSettingsAsync, Review } from '@/lib/content';

async function checkAuth(req: Request): Promise<boolean> {
  const pin = req.headers.get('x-admin-pin');
  const settings = await getSettingsAsync();
  return pin === settings.adminPin;
}

export async function GET(req: Request) {
  if (!(await checkAuth(req))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const reviews = await getAllReviewsAsync(true);
  return NextResponse.json({ reviews });
}

export async function POST(req: Request) {
  if (!(await checkAuth(req))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { action, reviewId, hidden, review } = body;
    const reviews = await getAllReviewsAsync(true);

    if (action === 'toggle_hidden') {
      const idx = reviews.findIndex((r) => r.id === reviewId);
      if (idx !== -1) {
        reviews[idx].hidden = hidden;
        await saveReviews(reviews);
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
      await saveReviews(reviews);
      return NextResponse.json({ success: true, reviews });
    }

    if (action === 'update') {
      const idx = reviews.findIndex((r) => r.id === review.id);
      if (idx !== -1) {
        reviews[idx] = { ...reviews[idx], ...review };
        await saveReviews(reviews);
        return NextResponse.json({ success: true, reviews });
      }
      return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    }

    if (action === 'delete') {
      const filtered = reviews.filter((r) => r.id !== reviewId);
      await saveReviews(filtered);
      return NextResponse.json({ success: true, reviews: filtered });
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update reviews' }, { status: 500 });
  }
}
