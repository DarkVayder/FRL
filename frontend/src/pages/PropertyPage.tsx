import { useEffect, useState } from "react";
import { fetchHostawayReviews, NormalizedReview } from "../lib/api";
import ReviewCard from "../components/ReviewCard";

interface PropertyPageProps {
  slug: string;
}

export default function PropertyPage({ slug }: PropertyPageProps) {
  const [reviews, setReviews] = useState<NormalizedReview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchHostawayReviews()
      .then((data) => {
        const approvedReviews = data.reviews.filter(
          (r) => r.listingSlug.toLowerCase() === slug.toLowerCase() && r.approved
        );
        setReviews(approvedReviews);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  return (
    <div className="p-6 sm:p-10">
      <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-center">{slug}</h2>

      {loading && <div className="text-center text-gray-500 py-10">Loading reviews…</div>}

      {!loading && reviews.length === 0 && (
        <div className="text-center text-gray-400 py-10 italic">No approved reviews yet.</div>
      )}

      <section className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((r) => (
          <div key={r.id} className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition-shadow duration-200">
            <div className="mb-2 text-xs text-gray-400">
              Submitted: {new Date(r.submittedAt).toLocaleString()}
            </div>
            <ReviewCard review={r} />
          </div>
        ))}
      </section>
    </div>
  );
}
