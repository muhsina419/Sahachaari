import { useState, useEffect } from 'react';

export const useLocation = () => {
  const [location, setLocation] = useState<[number, number] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation([position.coords.latitude, position.coords.longitude]);
      },
      (error) => {
        setError('Unable to retrieve your location.');
        // Default to downtown area if location access is denied
        setLocation([40.7589, -73.9851]);
      }
    );
  }, []);

  return { location, error };
};