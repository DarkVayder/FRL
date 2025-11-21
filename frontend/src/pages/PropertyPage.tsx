import { FiStar } from "react-icons/fi";
import ReviewCard from "../components/ReviewCard";
import { NormalizedReview } from "../lib/api";

interface PropertyPageProps {
  slug: string;
  reviews: NormalizedReview[];
  loading: boolean;
}

export default function PropertyPage({ slug, reviews, loading }: PropertyPageProps) {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-5 text-gray-800">Property: {slug}</h2>

      {loading && <div className="text-center text-gray-500 py-10">Loading reviews…</div>}

      {!loading && reviews.length === 0 && (
        <div className="text-center text-gray-400 py-10 italic">No approved reviews yet.</div>
      )}

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((r: NormalizedReview) => (
          <div
            key={r.id}
            className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition-shadow duration-200 flex flex-col"
          >
            <div className="flex items-center text-xs text-gray-400 mb-2">
              <FiStar className="mr-1 text-yellow-500" /> Submitted: {new Date(r.submittedAt).toLocaleString()}
            </div>

            <ReviewCard review={r} />
          </div>
        ))}
      </section>
    </div>
  );
}
