'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import JobCard from '@/components/JobCard';
import JobFilter from '@/components/JobFilter';
import { jobsAPI } from '@/lib/api';

const CATEGORIES = ['Plumbing', 'Electrical', 'Painting', 'Joinery', 'Carpentry', 'HVAC', 'Other'];
const STATUSES = ['Open', 'In Progress', 'Closed'];

export default function HomePage() {
  const router = useRouter();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: '',
    status: '',
    search: '',
  });

  useEffect(() => {
    fetchJobs();
  }, [filters]);

  const fetchJobs = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await jobsAPI.getAllJobs(filters);
      setJobs(response.data || []);
    } catch (err) {
      setError('Failed to load jobs. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
  };

  const handleViewDetails = (jobId) => {
    router.push(`/jobs/${jobId}`);
  };

  const handleSearchChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      search: e.target.value,
    }));
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Service Requests</h1>
        <p className="text-gray-600">Browse open service requests and help someone today</p>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by title or description..."
          value={filters.search}
          onChange={handleSearchChange}
          className="input-field w-full"
        />
      </div>

      <JobFilter
        categories={CATEGORIES}
        statuses={STATUSES}
        onFilterChange={handleFilterChange}
      />

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-600">Loading jobs...</p>
        </div>
      ) : jobs.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-600 text-lg">No jobs found matching your filters</p>
        </div>
      ) : (
        <div>
          <p className="text-gray-600 mb-4 font-medium">
            Found {jobs.length} job{jobs.length !== 1 ? 's' : ''}
          </p>
          {jobs.map((job) => (
            <JobCard key={job._id} job={job} onViewDetails={handleViewDetails} />
          ))}
        </div>
      )}
    </div>
  );
}
