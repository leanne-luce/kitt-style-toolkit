import * as Location from 'expo-location';

export interface LocationCoords {
  latitude: number;
  longitude: number;
}

/**
 * Requests location permissions and gets the current location
 * @returns Coordinates or null if permission denied
 */
export async function getCurrentLocation(): Promise<LocationCoords | null> {
  try {
    // Request permission
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      console.log('Location permission denied');
      return null;
    }

    // Get current location
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });

    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
  } catch (error) {
    console.error('Error getting location:', error);
    return null;
  }
}

/**
 * Gets the city name from coordinates using reverse geocoding
 */
export async function getCityFromCoords(
  latitude: number,
  longitude: number
): Promise<string> {
  try {
    const geocode = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });

    if (geocode.length > 0) {
      const { city, region, isoCountryCode } = geocode[0];

      // Return "City, State" format for US locations
      if (city && region && isoCountryCode === 'US') {
        return `${city}, ${region}`;
      }

      // Fallback to just city or region if one is missing
      return city || region || 'Unknown location';
    }

    return 'Unknown location';
  } catch (error) {
    console.error('Error getting city name:', error);
    return 'Unknown location';
  }
}
