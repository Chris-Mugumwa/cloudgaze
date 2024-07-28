'use client'

import React from 'react'

import { useQuery } from '@tanstack/react-query'

import { fetchWeatherByNameAsync } from '@/api/openweathermap/use-weather'

import { useCityStore } from '@/store/search/use-city-store'

export default function SearchedQuery() {
	const selectedCity = useCityStore(state => state?.selectedCity)

	console.log(selectedCity)

	const { data: searchedData, isPending } = useQuery({
		queryKey: ['searched-city'],
		queryFn: async () => {
			if (selectedCity) {
				const { label: city_name } = selectedCity
				fetchWeatherByNameAsync({ city_name })
			}
		},
	})

	console.log(searchedData)
	return <div>[query]</div>
}
