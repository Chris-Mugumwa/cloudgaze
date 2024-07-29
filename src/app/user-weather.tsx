'use client'

import React, { useState, useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'

import { useGroupedDataStore } from '@/store/weather/use-weather-store'

import { fetchWeatherAsync } from '@/api/openweathermap/use-weather'

import { CurrentWeather } from '@/components/current-weather'
import { CurrentHourly } from '@/components/current-hourly'
import { FiveDayHourly } from '@/components/five-day-hourly'

export const UserWeather = ({ coords }: { coords: CoordsProps }) => {
	const { latitude, longitude } = coords

	const { data: userWeatherData, isPending } = useQuery({
		queryKey: [],
		queryFn: async () =>
			await fetchWeatherAsync({ lat: latitude, lon: longitude }),
		staleTime: 300000,
	})

	const [selectedDayForecast, setSelectedDayForecast] = useState<
		ForecastList[]
	>([])

	const groupedData = useGroupedDataStore(state => state?.groupedData)
	const setGroupedData = useGroupedDataStore(state => state?.setGroupedData)

	useEffect(() => {
		if (userWeatherData) {
			groupForecastsByDay(userWeatherData?.list)
		}
	}, [userWeatherData])

	const groupForecastsByDay = (
		forecastData: ForecastList[],
	): GroupedDateData => {
		const tempGroupData: GroupedDateData = {}
		const tempSelectedDayForecast: ForecastList[] = []

		forecastData.forEach(forecast => {
			const date = new Date(forecast.dt_txt).toLocaleDateString()

			tempSelectedDayForecast.push(forecast)

			if (!tempGroupData[date]) {
				tempGroupData[date] = []
			}
			tempGroupData[date].push(forecast)
		})

		setSelectedDayForecast(tempSelectedDayForecast)
		setGroupedData(tempGroupData)
		return tempGroupData
	}

	if (isPending) {
	}

	if (groupedData && selectedDayForecast) {
		return (
			<main className='w-full mx-auto overflow-x-hidden'>
				<CurrentWeather current={selectedDayForecast} />

				<CurrentHourly current_hourly={groupedData} />

				<FiveDayHourly daily_hourly={groupedData} />
			</main>
		)
	}
}
