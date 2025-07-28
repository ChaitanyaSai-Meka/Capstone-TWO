const AMADEUS_API_KEY = process.env.NEXT_PUBLIC_AMADEUS_API_KEY || 'dpygLfGMzSRMMgpb5UUo3PPM9I2A8mfn';
const AMADEUS_BASE_URL = 'https://test.api.amadeus.com';

interface AmadeusHotel {
  name: string;
  hotelId: string;
  chainCode: string;
  geoCode: {
    latitude: number;
    longitude: number;
  };
  address: {
    countryCode: string;
    cityCode: string;
    cityName: string;
    lines: string[];
    postalCode: string;
  };
  rating?: number;
  amenities?: string[];
  media?: {
    uri: string;
    category: string;
  }[];
}

interface HotelSearchParams {
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
}

let accessToken: string | null = null;
let tokenExpiry: number | null = null;

async function getAmadeusAccessToken(): Promise<string> {
  // Check if we have a valid token
  if (accessToken && tokenExpiry && Date.now() < tokenExpiry) {
    return accessToken;
  }

  try {
    const response = await fetch(`${AMADEUS_BASE_URL}/v1/security/oauth2/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
              body: new URLSearchParams({
          grant_type: 'client_credentials',
          client_id: AMADEUS_API_KEY,
          client_secret: process.env.AMADEUS_CLIENT_SECRET || 'LN1A28JW42RfJAzk',
        }),
    });

    if (!response.ok) {
      throw new Error(`Failed to get access token: ${response.statusText}`);
    }

    const data = await response.json();
    accessToken = data.access_token as string;
    tokenExpiry = Date.now() + (data.expires_in * 1000) - 60000; 

    return accessToken;
  } catch (error) {
    console.error('Error getting Amadeus access token:', error);
    throw error;
  }
}

export async function searchHotels(params: HotelSearchParams): Promise<AmadeusHotel[]> {
  try {
    const token = await getAmadeusAccessToken();
    
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

    const response = await fetch(`${AMADEUS_BASE_URL}/v1/reference-data/locations/hotels/by-city?${queryParams}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to search hotels: ${response.statusText}`);
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error searching hotels:', error);
    throw error;
  }
}

export async function getHotelOffers(hotelId: string, params: {
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
} = {}): Promise<unknown[]> {
  try {
    const token = await getAmadeusAccessToken();
    
    const queryParams = new URLSearchParams();
    
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

    const response = await fetch(`${AMADEUS_BASE_URL}/v2/shopping/hotel-offers?hotelIds=${hotelId}&${queryParams}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to get hotel offers: ${response.statusText}`);
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error getting hotel offers:', error);
    throw error;
  }
}

// Helper function to transform Amadeus hotel data to match our existing hotel format
export function transformAmadeusHotel(amadeusHotel: AmadeusHotel, index: number) {
  return {
    id: index + 1,
    image: amadeusHotel.media?.[0]?.uri || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop',
    name: amadeusHotel.name,
    rating: amadeusHotel.rating || 4.0 + Math.random() * 1.5, // Generate random rating if not provided
    price: Math.floor(150 + Math.random() * 400), // Generate random price for demo
    location: amadeusHotel.address.cityName,
    hotelId: amadeusHotel.hotelId,
    chainCode: amadeusHotel.chainCode,
    geoCode: amadeusHotel.geoCode,
    address: amadeusHotel.address,
    amenities: amadeusHotel.amenities,
  };
}
