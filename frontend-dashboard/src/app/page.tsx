import DashboardHeader from '@/components/DashboardHeader';
import RequestTable from '@/components/RequestTable';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Pending Requests
          </h2>
          <p className="text-gray-600">
            Monitor and manage guest requests in real-time
          </p>
        </div>
        
        <RequestTable />
      </main>
    </div>
  );
}