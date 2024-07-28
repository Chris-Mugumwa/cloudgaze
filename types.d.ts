interface LocationProps {
	lon: number
	lat: number
}

interface CoordinatesVariables {
	lat: number
	lon: number
}

interface ErrorResponse {
	response: {
		status: number | undefined
		data: {
			detail: string
		}
	}
}

interface ForecastList {
	dt: number
	main: {
		temp: number
		feels_like: number
		temp_min: number
		temp_max: number
		pressure: number
		sea_level: number
		grnd_level: number
		humidity: number
		temp_kf: number
	}
	weather: {
		id: number
		main: string
		description: string
		icon: string
	}[]
	clouds: {
		all: number
	}
	wind: {
		speed: number
		deg: number
		gust: number
	}
	visibility: number
	pop: number
	rain: {
		'3h': number
	}
	sys: {
		pod: string
	}
	dt_txt: string
}

interface City {
	latitude: string
	longitude: string
	value: string
	label: string
}

interface GroupedDateData {
	[key: string]: ForecastList[]
}

interface Weather {
	cod: string
	message: number
	cnt: number
	list: ForecastList[]
	city: {
		id: number
		name: string
		coord: {
			lat: number
			lon: number
		}
		country: string
		population: number
		timezone: number
		sunrise: number
		sunset: number
	}
}

interface CoordsProps {
	asn: string
	city: string
	continent_code: string
	country: string
	country_area: number
	country_calling_code: string
	country_capital: string
	country_code: string
	country_code_iso3: string
	country_name: string
	country_population: number
	country_tld: string
	currency: string
	currency_name: string
	in_eu: boolean
	ip: string
	languages: string
	latitude: number
	longitude: number
	network: string
	org: string
	postal: string
	region: string
	region_code: string
	timezone: string
	utc_offset: string
	version: string
}
