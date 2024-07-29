'use client'

import React, { useState, useEffect } from 'react'

import moment from 'moment'

import {
	useGroupedDataStore,
	useSearchedDataStore,
} from '@/store/weather/use-weather-store'

import { CurrentHourly } from '@/components/current-hourly'
import { FiveDayHourly } from '@/components/five-day-hourly'

export default function SearchedPage() {
	const searchedData = useSearchedDataStore(state => state.searchedData)
	const groupedData = useGroupedDataStore(state => state?.groupedData)
	const setGroupedData = useGroupedDataStore(state => state?.setGroupedData)

	const [selectedDayForecast, setSelectedDayForecast] = useState<
		ForecastList[]
	>([])

	useEffect(() => {
		if (searchedData) {
			groupForecastsByDay(searchedData?.list)
		}
	}, [searchedData])

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

	if (searchedData && groupedData && selectedDayForecast) {
		const { city } = searchedData

		return (
			<main className='flex flex-col min-h-screen px-2 mt-4 max-w-7xl mx-auto'>
				<section className='w-full'>
					<div className='flex flex-col w-full'>
						<div className='flex'>
							<h2 className='font-russe-one text-2xl text-white'>
								{city?.name},
							</h2>
							<span className='w-3' />
							<p className='font-russe-one text-2xl'> {city?.country}</p>
						</div>
						<h4 className='font-russe-one text-grayscale-100/90'>{`${moment().format(
							'DD MMMM. dddd',
						)}`}</h4>
					</div>
				</section>

				<section className='mt-2'>
					<main className='w-full mx-auto overflow-x-hidden'>
						<CurrentHourly current_hourly={groupedData} />

						<FiveDayHourly daily_hourly={groupedData} />
					</main>
				</section>
			</main>
		)
	}
}
