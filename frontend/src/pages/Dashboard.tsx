import { useEffect, useState } from "react";
import { FiCheckCircle, FiXCircle, FiSearch, FiStar } from "react-icons/fi";
import { fetchHostawayReviews, HostawayResponse, NormalizedReview } from "../lib/api";
import ReviewCard from "../components/ReviewCard";

export default function Dashboard() {
  const [data, setData] = useState<HostawayResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    setLoading(true);
    fetchHostawayReviews()
      .then((res) => setData(res))
      .finally(() => setLoading(false));
  }, []);

  const toggleApprove = (review: NormalizedReview) => {
    if (!data) return;
    const updated = data.reviews.map((r) =>
      r.id === review.id ? { ...r, approved: !r.approved } : r
    );
    setData({ ...data, reviews: updated });
  };

  const filteredReviews =
    data?.reviews.filter((r) => {
      const normalizedFilter = filter.toLowerCase();
      return (
        r.listingSlug.toLowerCase().includes(normalizedFilter) ||
        r.listing.toLowerCase().includes(normalizedFilter)
      );
    }) ?? [];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Filter & stats */}
      <div className="mb-6 flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-1/3">
          <FiSearch className="absolute top-2.5 left-2 text-gray-400" />
          <input
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter by listing or slug"
            className="pl-8 pr-3 py-2 border rounded-md w-full shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>
        <div className="text-gray-500 text-sm font-medium">
          Total reviews: <span className="font-bold">{data?.count ?? 0}</span>
        </div>
      </div>

      {/* Loading & empty states */}
      {loading && (
        <div className="text-center text-gray-500 py-10">Loading reviews…</div>
      )}
      {!loading && filteredReviews.length === 0 && (
        <div className="text-center text-gray-400 py-10 italic">No reviews found</div>
      )}

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReviews.map((r) => (
          <div
            key={r.id}
            className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition-shadow duration-200 flex flex-col justify-between"
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-3">
              <div>
                <div className="text-sm font-semibold text-gray-800">{r.listing}</div>
                <div className="text-xs text-gray-400 mt-1">
                  Submitted: {new Date(r.submittedAt).toLocaleString()}
                </div>
              </div>
              <div className="text-right flex flex-col items-end">
                <div className="flex items-center gap-1 font-semibold text-yellow-500">
                  <FiStar /> {r.rating ?? "-"} / 10
                </div>
                <div className="flex items-center gap-1 text-xs mt-1">
                  {r.approved ? (
                    <span className="text-green-600 flex items-center gap-1">
                      <FiCheckCircle /> Approved
                    </span>
                  ) : (
                    <span className="text-red-500 flex items-center gap-1">
                      <FiXCircle /> Not approved
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Review Card */}
            <ReviewCard review={r} />

            {/* Approve/Unpublish Button */}
            <button
              onClick={() => toggleApprove(r)}
              className={`mt-4 px-4 py-2 rounded-md font-medium text-sm shadow transition-colors duration-150
                ${r.approved ? "bg-red-100 text-red-700 hover:bg-red-200" : "bg-green-100 text-green-700 hover:bg-green-200"}`}
            >
              {r.approved ? "Unpublish" : "Approve"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
