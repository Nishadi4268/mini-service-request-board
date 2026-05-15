'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { jobsAPI } from '@/lib/api';

const STATUSES = ['Open', 'In Progress', 'Closed'];

export default function JobDetailPage() {
  const router = useRouter();
  const params = useParams();
  const jobId = params.id;

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchJob();
  }, [jobId]);

  const fetchJob = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await jobsAPI.getJobById(jobId);
      setJob(response.data);
    } catch (err) {
      setError('Failed to load job details. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (newStatus) => {
    setUpdatingStatus(true);
    try {
      const response = await jobsAPI.updateJobStatus(jobId, newStatus);
      setJob(response.data);
    } catch (err) {
      setError('Failed to update status. Please try again.');
      console.error(err);
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await jobsAPI.deleteJob(jobId);
      router.push('/');
    } catch (err) {
      if (err?.message === 'Authorization token is required' || err?.message === 'Invalid or expired token') {
        router.push('/login');
        return;
      }
      setError('Failed to delete job. Please try again.');
      console.error(err);
      setDeleting(false);
      setDeleteConfirm(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Open':
        return 'bg-blue-100 text-blue-800';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'Closed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      Plumbing: 'bg-blue-50 text-blue-700',
      Electrical: 'bg-yellow-50 text-yellow-700',
      Painting: 'bg-purple-50 text-purple-700',
      Joinery: 'bg-amber-50 text-amber-700',
      Carpentry: 'bg-orange-50 text-orange-700',
      HVAC: 'bg-cyan-50 text-cyan-700',
      Other: 'bg-gray-50 text-gray-700',
    };
    return colors[category] || colors.Other;
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Loading job details...</p>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 mb-4">Job not found</p>
        <Link href="/" className="btn-primary">
          Back to Jobs
        </Link>
      </div>
    );
  }

  const formattedDate = new Date(job.createdAt).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div>
      <Link href="/" className="text-blue-600 hover:text-blue-700 mb-6 inline-block">
        ← Back to Jobs
      </Link>

      <div className="bg-white rounded-lg shadow-lg p-8">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">{job.title}</h1>
            <p className="text-gray-600 text-lg">{job.location}</p>
          </div>
          <div className="flex gap-2">
            <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(job.status)}`}>
              {job.status}
            </span>
            <span className={`px-4 py-2 rounded-full text-sm font-medium ${getCategoryColor(job.category)}`}>
              {job.category}
            </span>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Description</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{job.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 bg-gray-50 p-6 rounded-lg">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1 uppercase">Contact Name</h3>
            <p className="text-lg font-semibold text-gray-800">{job.contactName}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1 uppercase">Contact Email</h3>
            <p className="text-lg font-semibold text-gray-800">
              <a href={`mailto:${job.contactEmail}`} className="text-blue-600 hover:text-blue-700">
                {job.contactEmail}
              </a>
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1 uppercase">Posted</h3>
            <p className="text-lg font-semibold text-gray-800">{formattedDate}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1 uppercase">Job ID</h3>
            <p className="font-semibold text-gray-800 font-mono text-sm">{job._id}</p>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Update Status</h2>
          <div className="flex gap-3 mb-6">
            {STATUSES.map((status) => (
              <button
                key={status}
                onClick={() => handleStatusChange(status)}
                disabled={updatingStatus || status === job.status}
                className={`px-4 py-2 rounded font-medium transition-colors ${
                  status === job.status
                    ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                    : 'btn-secondary'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Danger Zone</h2>
          {deleteConfirm ? (
            <div className="bg-red-50 border border-red-200 p-4 rounded mb-4">
              <p className="text-red-700 mb-4">
                Are you sure you want to delete this job request? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="btn-danger disabled:opacity-50"
                >
                  {deleting ? 'Deleting...' : 'Yes, Delete'}
                </button>
                <button
                  onClick={() => setDeleteConfirm(false)}
                  className="btn-outline"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setDeleteConfirm(true)}
              className="btn-danger"
            >
              Delete Job Request
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
