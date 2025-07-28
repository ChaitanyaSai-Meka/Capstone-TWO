import { NextRequest, NextResponse } from 'next/server';

const AMADEUS_API_KEY = process.env.AMADEUS_API_KEY || '';
const AMADEUS_BASE_URL = 'https://test.api.amadeus.com';

console.log('Environment check:');
console.log('AMADEUS_API_KEY:', AMADEUS_API_KEY ? '***' + AMADEUS_API_KEY.slice(-4) : 'NOT SET');
console.log('AMADEUS_CLIENT_SECRET:', process.env.AMADEUS_CLIENT_SECRET ? '***' + process.env.AMADEUS_CLIENT_SECRET.slice(-4) : 'NOT SET');

let accessToken: string | null = null;
let tokenExpiry: number | null = null;

async function getAmadeusAccessToken(): Promise<string> {
  if (accessToken && tokenExpiry && Date.now() < tokenExpiry) {
    return accessToken;
  }

  try {
    console.log('Requesting Amadeus access token...');
    console.log('Using API Key:', AMADEUS_API_KEY ? '***' + AMADEUS_API_KEY.slice(-4) : 'NOT SET');
    console.log('Using Client Secret:', process.env.AMADEUS_CLIENT_SECRET ? '***' + process.env.AMADEUS_CLIENT_SECRET.slice(-4) : 'NOT SET');
    
    const response = await fetch(`${AMADEUS_BASE_URL}/v1/security/oauth2/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: AMADEUS_API_KEY || '',
        client_secret: process.env.AMADEUS_CLIENT_SECRET || '',
      }),
    });

    console.log('Token request status:', response.status);
    console.log('Token request status text:', response.statusText);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Token request error response:', errorText);
      throw new Error(`Failed to get access token: ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    console.log('Token request successful, expires in:', data.expires_in, 'seconds');
    accessToken = data.access_token as string;
    tokenExpiry = Date.now() + (data.expires_in * 1000) - 60000;

    return accessToken;
  } catch (error) {
    console.error('Error getting Amadeus access token:', error);
    throw error;
  }
}

async function searchHotels(params: {
  cityCode?: string;
  latitude?: number;
  longitude?: number;
  radius?: number;
  radiusUnit?: 'KM' | 'MILE';
  checkInDate?: string;
  checkOutDate?: string;
  adults?: number;
  roomQuantity?: number;
  priceRange?: string;
  currency?: string;
  paymentPolicy?: string;
  boardType?: string;
  includeClosed?: boolean;
  bestRateOnly?: boolean;
  view?: 'FULL' | 'LIGHT';
  sort?: 'PRICE' | 'DISTANCE' | 'NAME';
}): Promise<unknown[]> {
  try {
    const token = await getAmadeusAccessToken();
    console.log('Got access token, searching hotels...');
    
    const queryParams = new URLSearchParams();
    
    if (params.cityCode) queryParams.append('cityCode', params.cityCode);
    if (params.latitude) queryParams.append('latitude', params.latitude.toString());
    if (params.longitude) queryParams.append('longitude', params.longitude.toString());
    if (params.radius) queryParams.append('radius', params.radius.toString());
    if (params.radiusUnit) queryParams.append('radiusUnit', params.radiusUnit);
    if (params.checkInDate) queryParams.append('checkInDate', params.checkInDate);
    if (params.checkOutDate) queryParams.append('checkOutDate', params.checkOutDate);
    if (params.adults) queryParams.append('adults', params.adults.toString());
    if (params.roomQuantity) queryParams.append('roomQuantity', params.roomQuantity.toString());
    if (params.priceRange) queryParams.append('priceRange', params.priceRange);
    if (params.currency) queryParams.append('currency', params.currency);
    if (params.paymentPolicy) queryParams.append('paymentPolicy', params.paymentPolicy);
    if (params.boardType) queryParams.append('boardType', params.boardType);
    if (params.includeClosed !== undefined) queryParams.append('includeClosed', params.includeClosed.toString());
    if (params.bestRateOnly !== undefined) queryParams.append('bestRateOnly', params.bestRateOnly.toString());
    if (params.view) queryParams.append('view', params.view);
    if (params.sort) queryParams.append('sort', params.sort);

    console.log('Searching hotels with params:', queryParams.toString());
    console.log('Full URL:', `${AMADEUS_BASE_URL}/v1/reference-data/locations/hotels/by-city?${queryParams}`);

    const response = await fetch(`${AMADEUS_BASE_URL}/v1/reference-data/locations/hotels/by-city?${queryParams}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    console.log('Hotel search response status:', response.status);
    console.log('Hotel search response status text:', response.statusText);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Hotel search error response:', errorText);
      throw new Error(`Failed to search hotels: ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    console.log('Hotel search successful, found hotels:', data.data?.length || 0);
    return data.data || [];
  } catch (error) {
    console.error('Error searching hotels:', error);
    throw error;
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const cityCode = searchParams.get('cityCode');
    const location = searchParams.get('location');

    if (!cityCode && !location) {
      return NextResponse.json({ error: 'City code or location is required' }, { status: 400 });
    }

    const searchParamsObj: {
      cityCode?: string;
    } = {};

    if (cityCode) {
      searchParamsObj.cityCode = cityCode;
    } else if (location) {
      // Map common city names to Amadeus city codes
      const cityCodeMap: { [key: string]: string } = {
        'new york': 'NYC',
        'nyc': 'NYC',
        'manhattan': 'NYC',
        'los angeles': 'LAX',
        'la': 'LAX',
        'chicago': 'CHI',
        'miami': 'MIA',
        'san francisco': 'SFO',
        'sf': 'SFO',
        'las vegas': 'LAS',
        'boston': 'BOS',
        'seattle': 'SEA',
        'denver': 'DEN',
        'atlanta': 'ATL',
        'dallas': 'DFW',
        'houston': 'IAH',
        'phoenix': 'PHX',
        'orlando': 'MCO',
        'san diego': 'SAN',
        'portland': 'PDX',
        'austin': 'AUS',
        'nashville': 'BNA',
        'new orleans': 'MSY',
        'charleston': 'CHS',
        'savannah': 'SAV',
        'aspen': 'ASE',
        'palm springs': 'PSP',
        'lake tahoe': 'TVL',
        'napa valley': 'APC',
        'cape cod': 'HYA',
      };

      const normalizedLocation = location.toLowerCase();
      const mappedCityCode = cityCodeMap[normalizedLocation];
      
      if (mappedCityCode) {
        searchParamsObj.cityCode = mappedCityCode;
      } else {
        return NextResponse.json({ error: 'Location not supported' }, { status: 400 });
      }
    }

    try {
      console.log('Attempting to search hotels with params:', searchParamsObj);
      const hotels = await searchHotels(searchParamsObj);
      console.log('Successfully retrieved hotels from Amadeus API:', hotels.length);
      
      // Enhanced hotel data generation based on chain codes and locations
      const generateHotelData = async (hotelData: {
        name: string;
        hotelId: string;
        chainCode: string;
        geoCode: { latitude: number; longitude: number };
        address: { 
          cityName: string; 
          countryCode: string; 
          stateCode: string;
          lines: string[]; 
          postalCode: string;
        };
      }, index: number) => {
        const chainCode = hotelData.chainCode;
        const cityName = hotelData.address.cityName;
        
        // Chain-based pricing and rating logic
        const chainData: { [key: string]: { basePrice: number; ratingRange: [number, number]; imageType: string } } = {
          'MC': { basePrice: 250, ratingRange: [4.2, 4.8], imageType: 'marriott' }, // Marriott
          'HH': { basePrice: 200, ratingRange: [4.0, 4.6], imageType: 'hilton' }, // Hilton
          'HI': { basePrice: 150, ratingRange: [3.8, 4.4], imageType: 'holiday' }, // Holiday Inn
          'BW': { basePrice: 180, ratingRange: [3.9, 4.5], imageType: 'bestwestern' }, // Best Western
          'CY': { basePrice: 220, ratingRange: [4.1, 4.7], imageType: 'courtyard' }, // Courtyard
          'LW': { basePrice: 350, ratingRange: [4.4, 4.9], imageType: 'luxury' }, // Luxury hotels
          'FS': { basePrice: 500, ratingRange: [4.6, 5.0], imageType: 'luxury' }, // Four Seasons
          'WA': { basePrice: 450, ratingRange: [4.5, 4.9], imageType: 'luxury' }, // Waldorf
          'MD': { basePrice: 300, ratingRange: [4.3, 4.8], imageType: 'boutique' }, // Boutique
          'SB': { basePrice: 280, ratingRange: [4.2, 4.7], imageType: 'boutique' }, // Sofitel
        };
        
        const chainInfo = chainData[chainCode] || { basePrice: 200, ratingRange: [4.0, 4.6], imageType: 'hotel' };
        
        // Location-based price adjustment
        const locationMultiplier = cityName === 'NEW YORK' ? 1.5 : 
                                 cityName === 'LOS ANGELES' ? 1.3 :
                                 cityName === 'SAN FRANCISCO' ? 1.4 :
                                 cityName === 'MIAMI' ? 1.2 : 1.0;
        
        // Generate realistic price with some variation
        const basePrice = chainInfo.basePrice * locationMultiplier;
        const priceVariation = 0.8 + Math.random() * 0.4; // ±20% variation
        const price = Math.floor(basePrice * priceVariation);
        
        // Generate realistic rating
        const [minRating, maxRating] = chainInfo.ratingRange;
        const rating = minRating + Math.random() * (maxRating - minRating);
        
        // Get hotel image from Pexels API
        const getHotelImage = async (hotelName: string, chainCode: string) => {
          try {
            // Create search query based on hotel type
            let searchQuery = hotelName.toLowerCase();
            
            // Add chain-specific keywords for better results
            const chainKeywords: { [key: string]: string } = {
              'MC': 'marriott hotel',
              'HH': 'hilton hotel', 
              'HI': 'holiday inn',
              'BW': 'best western hotel',
              'CY': 'courtyard hotel',
              'LW': 'luxury hotel',
              'FS': 'four seasons hotel',
              'WA': 'waldorf hotel',
              'MD': 'boutique hotel',
              'SB': 'sofitel hotel'
            };
            
            const chainKeyword = chainKeywords[chainCode] || 'hotel';
            searchQuery = `${searchQuery} ${chainKeyword}`;
            
            const response = await fetch(
              `https://api.pexels.com/v1/search?query=${encodeURIComponent(searchQuery)}&per_page=1&orientation=landscape`,
              {
                headers: {
                  'Authorization': process.env.PEXELS_API_KEY || 'YOUR_PEXELS_API_KEY'
                }
              }
            );
            
            if (response.ok) {
              const data = await response.json();
              if (data.photos && data.photos.length > 0) {
                return data.photos[0].src.large;
              }
            }
          } catch (error) {
            console.error('Error fetching Pexels image:', error);
          }
          
          // Fallback to Unsplash images if Pexels fails
          const fallbackImages = [
            'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop'
          ];
          
          return fallbackImages[index % fallbackImages.length];
        };
        
        const image = await getHotelImage(hotelData.name, hotelData.chainCode);
        
        // Generate amenities based on hotel type
        const generateAmenities = () => {
          const baseAmenities = ['Free WiFi', 'Air Conditioning'];
          const luxuryAmenities = ['Spa', 'Pool', 'Gym', 'Restaurant', 'Room Service', 'Concierge'];
          const businessAmenities = ['Business Center', 'Meeting Rooms', 'Free Breakfast'];
          
          const amenities = [...baseAmenities];
          
          if (chainInfo.basePrice > 300) {
            amenities.push(...luxuryAmenities.slice(0, 3 + Math.floor(Math.random() * 3)));
          } else if (chainCode === 'MC' || chainCode === 'CY') {
            amenities.push(...businessAmenities.slice(0, 2 + Math.floor(Math.random() * 2)));
          }
          
          return amenities.slice(0, 4 + Math.floor(Math.random() * 3)); // 4-6 amenities
        };
        
        return {
          id: index + 1,
          image,
          name: hotelData.name,
          rating: parseFloat(rating.toFixed(1)),
          price,
          location: hotelData.address.cityName,
          hotelId: hotelData.hotelId,
          chainCode: hotelData.chainCode,
          geoCode: hotelData.geoCode,
          address: hotelData.address,
          amenities: generateAmenities(),
        };
      };
      
      // Transform the hotels to match our expected format
      const transformedHotels = await Promise.all(hotels.map(async (hotel: unknown, index: number) => {
        const hotelData = hotel as {
          name: string;
          hotelId: string;
          chainCode: string;
          geoCode: { latitude: number; longitude: number };
          address: { 
            cityName: string; 
            countryCode: string; 
            stateCode: string;
            lines: string[]; 
            postalCode: string;
          };
        };
        
        return generateHotelData(hotelData, index);
      }));

      console.log('Successfully transformed hotels:', transformedHotels.length);
      return NextResponse.json(transformedHotels);
    } catch (amadeusError) {
      console.error('Amadeus API error, falling back to local data:', amadeusError);
      
      // Fallback to local JSON data
      try {
        const response = await fetch('http://localhost:3000/hotels.json');
        if (!response.ok) {
          throw new Error(`Failed to fetch local data: ${response.statusText}`);
        }
        const hotels = await response.json();
        console.log('Successfully loaded local hotel data:', hotels.length);
        return NextResponse.json(hotels);
      } catch (localError) {
        console.error('Failed to load local data:', localError);
        return NextResponse.json({ error: 'Failed to fetch hotels from both API and local data' }, { status: 500 });
      }
    }
  } catch (error) {
    console.error('Error in hotels API route:', error);
    return NextResponse.json({ error: 'Failed to fetch hotels' }, { status: 500 });
  }
} 