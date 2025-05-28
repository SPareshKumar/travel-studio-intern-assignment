'use client';

import { useRequests } from '@/hooks/useRequests';
import { MessageCircle, Users, Clock } from 'lucide-react';

const DashboardHeader = () => {
  const { data: requests } = useRequests();
  const requestCount = requests?.length || 0;

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Guest Request Dashboard
          </h1>
          <p className="text-blue-100 text-lg">
            Luxury Hotel Management System
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mb-4">
              <MessageCircle className="h-6 w-6" />
            </div>
            <div className="text-2xl font-bold mb-1">{requestCount}</div>
            <div className="text-blue-100 text-sm">Pending Requests</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mb-4">
              <Users className="h-6 w-6" />
            </div>
            <div className="text-2xl font-bold mb-1">{new Set(requests?.map(r => r.guestPhone)).size || 0}</div>
            <div className="text-blue-100 text-sm">Unique Guests</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mb-4">
              <Clock className="h-6 w-6" />
            </div>
            <div className="text-2xl font-bold mb-1">
              {requests && requests.length > 0 
                ? Math.round((Date.now() - new Date(requests[0].createdAt).getTime()) / (1000 * 60))
                : 0}m
            </div>
            <div className="text-blue-100 text-sm">Earliest Request</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;