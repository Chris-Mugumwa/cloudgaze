interface WeatherIcons {
	[key: string]: string
}

const weatherIcons: WeatherIcons = {
	'01d': '/images/sunny.png', // Clear sky (day)
	'01n': '/images/clear_night.png', // Clear sky (night)
	'02d': '/images/partly_cloudy.png', // Few clouds (day)
	'02n': '/images/partly_cloudy_night.png', // Few clouds (night)
	'03d': '/images/cloudy.png', // Scattered clouds (day)
	'03n': '/images/cloudy_night.png', // Scattered clouds (night)
	'04d': '/images/broken_clouds.png', // Broken clouds (day)
	'04n': '/images/broken_clouds_night.png', // Broken clouds (night)
	'09d': '/images/shower_rain.png', // Shower rain (day)
	'09n': '/images/shower_rain_night.png', // Shower rain (night)
	'10d': '/images/rain.png', // Rain (day)
	'10n': '/images/rain_night.png', // Rain (night)
	'11d': '/images/thunderstorm.png', // Thunderstorm (day)
	'11n': '/images/thunderstorm_night.png', // Thunderstorm (night)
	'13d': '/images/snow.png', // Snow (day)
	'13n': '/images/snow_night.png', // Snow (night)
	'50d': '/images/mist.png', // Mist (day)
	'50n': '/images/mist_night.png', // Mist (night)
}

export default weatherIcons
