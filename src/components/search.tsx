'use client'

import React, { useState } from 'react'

import { useRouter } from 'next/navigation'

import { IoSearchOutline } from 'react-icons/io5'

import ClipLoader from 'react-spinners/ClipLoader'

import toast, { Toaster } from 'react-hot-toast'

import { useQuery } from '@tanstack/react-query'

import 'react-country-state-city/dist/react-country-state-city.css'

import { useSearchedDataStore } from '@/store/weather/use-weather-store'

import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'

import { fetchWeatherByNameAsync } from '@/api/openweathermap/use-weather'

/**
 * Search component:
 *
 * This is essentially where most city search events will be dispatched
 *
 */

interface SetCountryState {
	value: string
	label: string
}

export const Search = () => {
	const router = useRouter()

	const [inputValue, setInputValue] = useState('')

	const setSearchedData = useSearchedDataStore(state => state?.setSearchedData)

	const { isFetching, refetch } = useQuery({
		queryKey: ['searched-city'],
		queryFn: async () =>
			await fetchWeatherByNameAsync({ city_name: inputValue }),
		enabled: false,
		staleTime: 300000,
	})

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value)
	}

	const handleKeyDown = async (
		event: React.KeyboardEvent<HTMLInputElement>,
	) => {
		if (event.key === 'Enter') {
			event.preventDefault()
			if (!inputValue) {
				toast.error('Please enter a city.')

				return
			}

			await refetch()
				.then(response => {
					if (response.data) {
						const { data, isSuccess, isError } = response
						if (response.data) {
						}

						if (isSuccess) {
							setSearchedData(data)

							router.push(`/searched/${inputValue}`)
						}
					}
				})
				.catch(error => {
					console.log('This is error', error)
				})
		}
	}

	return (
		<>
			<Toaster />
			<div className='flex flex-col gap-y-1 w-full relative'>
				<div className='flex flex-1 items-center gap-x-2 justify-center px-2 lg:ml-6 lg:justify-end'>
					<div className='w-full max-w-xl '>
						<label htmlFor='search' className='sr-only'>
							Search
						</label>
						<div className='relative'>
							<div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
								<MagnifyingGlassIcon
									aria-hidden='true'
									className='h-5 w-5 text-gray-400'
								/>
							</div>
							<input
								id='search'
								name='search'
								type='search'
								value={inputValue}
								onChange={handleInputChange}
								onKeyDown={handleKeyDown}
								placeholder='Search city'
								className='block w-full rounded-md border-0 bg-gray-700 py-3 pl-10 pr-3 text-gray-300 placeholder:text-gray-400 focus:bg-white focus:text-gray-900 focus:ring-0 sm:text-sm sm:leading-6'
							/>

							<button
								disabled={isFetching}
								onClick={async () => {
									if (!inputValue) {
										toast.error('Please enter a city.')
									}

									await refetch().then(response => {
										if (response.isSuccess) {
											setSearchedData(response?.data)

											router.push(`/searched/${inputValue}`)
										} else if (response.isError) {
											toast.error(
												'Oops, something went wrong please make sure you entered you city correctly',
											)
										}
									})
								}}
								className='p-3 rounded-md h-full bg-primary-base active:bg-primary-300 transition-all duration-300 absolute top-0 right-0'
							>
								{!isFetching && (
									<IoSearchOutline className='text-white' />
								)}
								{isFetching && <ClipLoader size={12} color={'#FFF'} />}
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
