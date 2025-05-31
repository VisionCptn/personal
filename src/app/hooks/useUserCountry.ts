import { useEffect, useState } from 'react';

export function useUserCountry() {
  const [userCountry, setUserCountry] = useState<string | boolean>(false);

  useEffect(() => {
    async function fetchUserCountry() {
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        const userIP = data.ip;
        const countryResponse = await fetch(`https://ipapi.co/${userIP}/country/`);
        const country = await countryResponse.text();
        setUserCountry(country);
      } catch (error) {
        console.error('Error fetching user country:', error);
      }
    }
    fetchUserCountry();
  }, []);

  return userCountry;
}
