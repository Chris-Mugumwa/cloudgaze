'use client'

import React from 'react'

import { useSearchedDataStore } from '@/store/weather/use-weather-store'

export default function SearchedPage() {
	const searchedData = useSearchedDataStore(state => state.searchedData)

	console.log(searchedData)

	return <div>page</div>
}
