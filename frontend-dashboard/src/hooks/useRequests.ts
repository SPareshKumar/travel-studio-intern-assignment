import { useQuery } from '@tanstack/react-query';
import { fetchPendingRequests } from '@/utils/api';

export const useRequests = () => {
  return useQuery({
    queryKey: ['requests', 'pending'],
    queryFn: fetchPendingRequests,
    refetchInterval: 30000, // Refetch every 30 seconds
    staleTime: 10000, // Consider data stale after 10 seconds
  });
};