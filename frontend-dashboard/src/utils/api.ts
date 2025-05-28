import { GuestRequest } from '@/types/request';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const fetchPendingRequests = async (): Promise<GuestRequest[]> => {
  const url = `${API_BASE_URL}/api/request`;
  
  console.log('Fetching from URL:', url);
  
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      // Add this header for ngrok to prevent HTML responses
      'ngrok-skip-browser-warning': 'true',
    },
  });

  console.log('Response status:', response.status);
  console.log('Response headers:', Object.fromEntries(response.headers.entries()));

  if (!response.ok) {
    const text = await response.text();
    console.log('Error response:', text);
    throw new Error(`Failed to fetch requests: ${response.status} - ${text}`);
  }

  const data = await response.json();
  console.log('API Response data:', data); // Debug log
  return data;
};