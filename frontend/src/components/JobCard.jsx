"use client";

export default function JobCard({ job, onViewDetails }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "Open":
        return "bg-blue-100 text-blue-800";
      case "In Progress":
        return "bg-yellow-100 text-yellow-800";
      case "Closed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      Plumbing: "bg-blue-50 text-blue-700",
      Electrical: "bg-yellow-50 text-yellow-700",
      Painting: "bg-purple-50 text-purple-700",
      Joinery: "bg-amber-50 text-amber-700",
      Carpentry: "bg-orange-50 text-orange-700",
      HVAC: "bg-cyan-50 text-cyan-700",
      Other: "bg-gray-50 text-gray-700"
    };
    return colors[category] || colors.Other;
  };

  return (
    <div className="card p-6 mb-4">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-1">
            {job.title}
          </h3>
          <p className="text-gray-600 text-sm">{job.location}</p>
        </div>
        <div className="flex gap-2">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(job.status)}`}
          >
            {job.status}
          </span>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(job.category)}`}
          >
            {job.category}
          </span>
        </div>
      </div>

      <p className="text-gray-700 mb-4 line-clamp-2">{job.description}</p>

      <div className="flex justify-between items-center text-sm text-gray-600">
        <div>
          <p className="font-medium text-gray-800">{job.contactName}</p>
          <p>{job.contactEmail}</p>
        </div>
        <button onClick={() => onViewDetails(job._id)} className="btn-primary">
          View Details
        </button>
      </div>
    </div>
  );
}
