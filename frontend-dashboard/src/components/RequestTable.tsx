'use client';

import { useRequests } from '@/hooks/useRequests';
import { GuestRequest } from '@/types/request';
import { Phone, MessageCircle, Clock, Loader2, AlertCircle } from 'lucide-react';

const RequestTable = () => {
  const { data: requests, isLoading, error, isError } = useRequests();

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatPhone = (phone: string) => {
    // Format phone number for better display
    if (phone.length === 10) {
      return `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6)}`;
    }
    return phone;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <span className="ml-3 text-gray-600">Loading requests...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center">
        <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Requests</h3>
        <p className="text-gray-600">
          {error instanceof Error ? error.message : 'Unable to fetch requests'}
        </p>
      </div>
    );
  }

  if (!requests || requests.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center">
        <MessageCircle className="h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Pending Requests</h3>
        <p className="text-gray-600">All requests have been handled.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden md:block">
        <table className="w-full">
          <thead className="bg-blue-50 border-b border-blue-100">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-blue-900">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  Guest Phone
                </div>
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-blue-900">
                <div className="flex items-center">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Request
                </div>
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-blue-900">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  Timestamp
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {requests.map((request: GuestRequest) => (
              <tr key={request.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <Phone className="h-4 w-4 text-blue-600" />
                    </div>
                    <span className="font-medium text-gray-900">
                      {formatPhone(request.guestPhone)}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-gray-900 max-w-md truncate">
                    {request.requestText}
                  </p>
                </td>
                <td className="px-6 py-4">
                  <span className="text-gray-600 text-sm">
                    {formatTimestamp(request.createdAt)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden">
        <div className="p-4 bg-blue-50 border-b border-blue-100">
          <h3 className="text-sm font-semibold text-blue-900 flex items-center">
            <MessageCircle className="h-4 w-4 mr-2" />
            Pending Requests ({requests.length})
          </h3>
        </div>
        <div className="divide-y divide-gray-100">
          {requests.map((request: GuestRequest) => (
            <div key={request.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <Phone className="h-4 w-4 text-blue-600" />
                  </div>
                  <span className="font-medium text-gray-900">
                    {formatPhone(request.guestPhone)}
                  </span>
                </div>
                <span className="text-xs text-gray-500 flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {formatTimestamp(request.createdAt)}
                </span>
              </div>
              <p className="text-gray-700 text-sm pl-11">
                {request.requestText}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RequestTable;