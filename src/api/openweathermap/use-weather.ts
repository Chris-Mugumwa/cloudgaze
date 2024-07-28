import { client } from '../client'

import { useQuery } from '@tanstack/react-query'
import { createMutation } from 'react-query-kit'

import type { AxiosError } from 'axios'

import axios from 'axios'

import { format } from 'pretty-format'

const appid = process.env.NEXT_PUBLIC_WEATHER_API_KEY

export async function fetchWeatherAsync({
	lat,
	lon,
}: LocationProps): Promise<Weather> {
	const res = await fetch(
		`https://api.openweathermap.org/data/2.5/forecast?appid=${appid}&lat=${lat}&lon=${lon}&cnt=0&units=metric`,
	)

	const weatherData = (await res.json()) as Weather

	return weatherData
}

export async function fetchWeatherByNameAsync({
	city_name,
}: {
	city_name: string
}): Promise<Weather> {
	const res = await fetch(
		`https://api.openweathermap.org/data/2.5/forecast?appid=${appid}&q=${city_name}&cnt=0&units=metric`,
	)

	const weatherData = (await res.json()) as Weather

	return weatherData
}

export const fetchCoords = async () => {
	const response = await axios.get('https://ipapi.co/json/')
	return response.data as CoordsProps
}
