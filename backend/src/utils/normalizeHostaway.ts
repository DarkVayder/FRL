export interface ReviewCategory {
  category: string;
  rating: number;
}

export interface HostawayRawReview {
  id: number;
  rating?: number;
  publicReview: string;
  reviewCategory: ReviewCategory[];
  submittedAt: string;
  listingName: string;
  guestName: string;
  type: string;
}

export interface NormalizedReview {
  id: number;
  rating: number | null;
  publicReview: string;
  categories: { name: string; rating: number }[];
  submittedAt: string;
  listing: string;
  listingSlug: string;
  guest: string;
  type: string;
  channel: string;
  approved: boolean;
}

export function normalizeHostawayReviews(raw: HostawayRawReview[]): NormalizedReview[] {
  return raw.map((review): NormalizedReview => ({
    id: review.id,
    rating: review.rating ?? averageCategory(review.reviewCategory),
    publicReview: review.publicReview,
    categories: review.reviewCategory.map((c) => ({ name: c.category, rating: c.rating })),
    submittedAt: review.submittedAt,
    listing: review.listingName,
    listingSlug: slugify(review.listingName),
    guest: review.guestName,
    type: review.type,
    channel: "Hostaway",
    approved: true
  }));
}

function averageCategory(categories: ReviewCategory[]): number | null {
  if (!categories?.length) return null;
  const total = categories.reduce((a, b) => a + b.rating, 0);
  return Math.round(total / categories.length);
}

function slugify(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");
}