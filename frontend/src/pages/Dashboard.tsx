import { useEffect, useState } from "react";
import { FiCheckCircle, FiXCircle, FiSearch, FiStar } from "react-icons/fi";
import { fetchHostawayReviews, HostawayResponse, NormalizedReview } from "../lib/api";
import ReviewCard from "../components/ReviewCard";

export default function Dashboard() {
  const [data, setData] = useState<HostawayResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [channelFilter, setChannelFilter] = useState("All");
  const [dateRange, setDateRange] = useState("All");

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

  // Filtered reviews
  const filteredReviews =
    data?.reviews.filter((r) => {
      const normalizedFilter = filter.toLowerCase();
      const matchesFilter =
        r.listingSlug.toLowerCase().includes(normalizedFilter) ||
        r.listing.toLowerCase().includes(normalizedFilter);

      const matchesCategory =
        categoryFilter === "All" ||
        r.categories.some((c) => c.name.toLowerCase() === categoryFilter.toLowerCase());

      const matchesChannel =
        channelFilter === "All" || r.type.toLowerCase() === channelFilter.toLowerCase();

      const matchesDate =
        dateRange === "All" ||
        (dateRange === "Last 7 Days" &&
          new Date(r.submittedAt) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) ||
        (dateRange === "Last 30 Days" &&
          new Date(r.submittedAt) >= new Date(Date.now() - 30 * 24 * 60 * 60 * 1000));

      return matchesFilter && matchesCategory && matchesChannel && matchesDate;
    }) ?? [];

  // Summary cards per property
  const summaryCards = data
    ? Object.values(
        data.reviews.reduce((acc: any, r) => {
          if (!acc[r.listing]) {
            acc[r.listing] = { listing: r.listing, count: 0, approved: 0, avgRating: 0 };
          }
          acc[r.listing].count++;
          acc[r.listing].approved += r.approved ? 1 : 0;
          acc[r.listing].avgRating += r.rating ?? 0;
          return acc;
        }, {})
      ).map((s: any) => ({
        ...s,
        avgRating: s.count ? (s.avgRating / s.count).toFixed(1) : "-",
      }))
    : [];

  return (
    <div className="flex flex-col gap-6">
      {/* Summary cards */}
      {data && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {summaryCards.map((s) => (
            <div
              key={s.listing}
              className="p-4 rounded-lg shadow flex flex-col justify-between transition-transform hover:scale-105"
              style={{
                backgroundColor:
                  Number(s.avgRating) >= 8
                    ? "#d1fae5"
                    : Number(s.avgRating) >= 5
                    ? "#fef9c3"
                    : "#fee2e2",
              }}
            >
              <div className="font-semibold text-gray-800 text-lg">{s.listing}</div>
              <div className="text-gray-600 mt-1 text-sm">
                Avg Rating: <span className="font-bold">{s.avgRating}</span> / 10
              </div>
              <div className="text-gray-600 text-sm mt-1">
                Approved: <span className="font-bold">{s.approved}</span> / {s.count}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-center gap-3 justify-between">
        <div className="relative w-full sm:w-1/3">
          <FiSearch className="absolute top-2.5 left-2 text-gray-400" />
          <input
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Search by listing or ID..."
            className="pl-8 pr-3 py-2 w-full rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 border rounded-md shadow-sm"
          >
            <option>All</option>
            <option>cleanliness</option>
            <option>communication</option>
            <option>respect_house_rules</option>
          </select>

          <select
            value={channelFilter}
            onChange={(e) => setChannelFilter(e.target.value)}
            className="px-3 py-2 border rounded-md shadow-sm"
          >
            <option>All</option>
            <option>host-to-guest</option>
            <option>google</option>
          </select>

          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 border rounded-md shadow-sm"
          >
            <option>All</option>
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
          </select>
        </div>
      </div>

      {/* Loading / Empty */}
      {loading && <div className="text-center text-gray-500 py-10">Loading reviews…</div>}
      {!loading && filteredReviews.length === 0 && (
        <div className="text-center text-gray-400 py-10 italic">No reviews found</div>
      )}

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReviews.map((r: NormalizedReview) => (
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

            <ReviewCard review={r} />

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