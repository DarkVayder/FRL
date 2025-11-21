import { API_BASE } from "./config";

// Raw review from backend
export interface HostawayRawReview {
  id: number;
  rating?: number;
  publicReview: string;
  categories: { name: string; rating: number }[];
  submittedAt: string;
  listing: string;
  listingSlug?: string;
  guest: string;
  type: string;
  channel?: string;
  approved?: boolean;
}

// Normalized review for frontend
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

// Response type for frontend usage
export interface HostawayResponse {
  provider: string;
  count: number;
  reviews: NormalizedReview[];
  listings: any[];
}

// Helper: URL-friendly slug
export function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/^-+|-+$/g, "");
}

// Average category rating
function averageCategory(categories: { name: string; rating: number }[]): number | null {
  if (!categories?.length) return null;
  const total = categories.reduce((sum, c) => sum + c.rating, 0);
  return Math.round(total / categories.length);
}

// Normalize backend reviews
export function normalizeHostawayReviews(raw: HostawayRawReview[]): NormalizedReview[] {
  return raw.map((review) => ({
    id: review.id,
    rating: review.rating ?? averageCategory(review.categories),
    publicReview: review.publicReview,
    categories: review.categories.map((c) => ({ name: c.name, rating: c.rating })),
    submittedAt: review.submittedAt,
    listing: review.listing,
    listingSlug: review.listingSlug || slugify(review.listing),
    guest: review.guest,
    type: review.type,
    channel: review.channel || "Hostaway",
    approved: review.approved ?? true,
  }));
}

// Fetch + normalize reviews
export async function fetchHostawayReviews(): Promise<HostawayResponse> {
  const res = await fetch(`${API_BASE}/api/reviews/hostaway`);
  if (!res.ok) throw new Error("Failed to fetch reviews");

  const json = await res.json(); // backend returns { success: true, data: [...] }
  const raw: HostawayRawReview[] = Array.isArray(json.data) ? json.data : [];
  const normalized = normalizeHostawayReviews(raw);

  return {
    provider: "Hostaway",
    count: normalized.length,
    reviews: normalized,
    listings: [],
  };
}