export interface NormalizedReview {
  id: number;
  rating: number | null;
  publicReview: string;
  categories: { name: string; rating: number }[];
  submittedAt: string;
  listing: string;
  guest: string;
  type: string;
  channel: string;
}