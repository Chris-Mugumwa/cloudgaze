import { useState, useEffect } from 'react'

/**
 * The app works on a city search basis but I essentially wanted to
 * add a default load feature where on the initial entry to this web app
 * I display the user's weather data for their specific location before they
 * begin searching for specific areas.
 */

export const useGeolocation = () => {
	const [userLocation, setUserLocation] = useState<LocationProps | undefined>(
		undefined,
	)

	useEffect(() => {
		onFetchUserLocation()
	}, [])

	const onLocationSuccess = (location: GeolocationPosition) => {
		if (location) {
			const { latitude, longitude } = location?.coords

			setUserLocation({
				lat: latitude,
				lon: longitude,
			})
		}
	}

	const onLocationError = () => {
		/* Cape Town as a default if there is an error */
		setUserLocation({
			lon: 18.25,
			lat: 33.55,
		})
	}

	const onFetchUserLocation = () => {
		if (!('geolocation' in navigator)) {
			onLocationError()
		}

		navigator.geolocation.getCurrentPosition(
			onLocationSuccess,
			onLocationError,
		)
	}

	return userLocation
}
