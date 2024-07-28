'use client'

import React, { useState, useEffect, Fragment, useRef } from 'react'

import { useRouter } from 'next/navigation'

import {
	Listbox,
	ListboxButton,
	ListboxOption,
	ListboxOptions,
	Transition,
} from '@headlessui/react'

import {
	IoChevronDownOutline,
	IoFlagOutline,
	IoLocateOutline,
	IoSearchOutline,
} from 'react-icons/io5'

import format from 'pretty-format'

import { useQuery } from '@tanstack/react-query'

import 'react-country-state-city/dist/react-country-state-city.css'

import debounce from 'lodash/debounce'

import { useCityStore } from '@/store/search/use-city-store'

import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'

import { City, Country } from 'country-state-city'
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

	const [countries, setCountries] = useState<SetCountryState[]>([])
	const [cities, setCities] = useState<any[]>()
	const [inputValue, setInputValue] = useState('')

	const selectedCity = useCityStore(state => state?.selectedCity)
	const setSelectedCity = useCityStore(state => state?.setSelectedCity)

	const [selectedCountry, setSelectedCountry] = useState<
		{ value: string; label: string } | undefined
	>(undefined)

	const { data, isPending, refetch } = useQuery({
		queryKey: ['searched-city'],
		queryFn: async () =>
			await fetchWeatherByNameAsync({ city_name: inputValue }),
		enabled: false,
		staleTime: 300000,
	})

	useEffect(() => {
		const allCountries = Country.getAllCountries()
		setCountries(
			allCountries.map(country => ({
				value: country.isoCode,
				label: country.name,
			})),
		)
	}, [])

	console.log(data)

	useEffect(() => {
		if (selectedCountry) {
			const allCities = City.getCitiesOfCountry(selectedCountry?.value)

			setCities(
				allCities?.map(city => ({
					value: city.name,
					label: city.name,
					latitude: city.latitude,
					longitude: city.longitude,
				})),
			)
		} else {
			setCities([])
		}
	}, [selectedCountry])

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value)
	}

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			inputValue && refetch()
		}
	}

	return (
		<div className='flex flex-col gap-y-1 w-full'>
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
							onClick={() => {
								refetch()
							}}
							className='p-3 rounded-md h-full bg-primary-base active:bg-primary-300 transition-all duration-300 absolute top-0 right-0'
						>
							<IoSearchOutline className='text-white' />
						</button>
					</div>
				</div>

				<div className='w-24'>
					<Listbox value={selectedCountry} onChange={setSelectedCountry}>
						<div className='relative'>
							<ListboxButton className='w-12 h-12 rounded-full bg-grayscale-light flex items-center justify-center'>
								<IoFlagOutline className='text-grayscale-100-' />
							</ListboxButton>
							<Transition
								as={Fragment}
								leave='transition ease-in duration-100'
								leaveFrom='opacity-100'
								leaveTo='opacity-0'
							>
								<ListboxOptions className='absolute -left-96 z-10 w-96 py-1 mt-1 overflow-auto text-white bg-grayscale-light rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
									{countries.map((country, idx) => (
										<ListboxOption
											key={idx}
											className={({ focus }) =>
												`${
													focus ? 'text-white bg-primary-base' : ''
												} cursor-default select-none relative py-2 pl-10 pr-4`
											}
											value={country}
										>
											{({ selected }) => (
												<>
													<span
														className={`${
															selected
																? 'font-medium'
																: 'font-normal'
														} block truncate`}
													>
														{country.label}
													</span>
													{selected ? (
														<span
															className={`${
																selected
																	? 'text-white'
																	: 'text-indigo-600'
															} absolute inset-y-0 left-0 flex items-center pl-3`}
														>
															<IoChevronDownOutline
																className='w-5 h-5'
																aria-hidden='true'
															/>
														</span>
													) : null}
												</>
											)}
										</ListboxOption>
									))}
								</ListboxOptions>
							</Transition>
						</div>
					</Listbox>
				</div>

				{selectedCountry && (
					<Listbox
						value={selectedCity}
						onChange={value => {
							setSelectedCity(value)
							router.push(`/search/${value?.label}`)
						}}
					>
						<div className='relative cursor-pointer'>
							<ListboxButton className='w-12 h-12 rounded-full bg-grayscale-light flex items-center justify-center'>
								<IoLocateOutline className='text-grayscale-100-' />
							</ListboxButton>
							<Transition
								as={Fragment}
								leave='transition ease-in duration-100'
								leaveFrom='opacity-100'
								leaveTo='opacity-0'
							>
								<ListboxOptions className='absolute -left-96 z-10 w-96 py-1 mt-1 overflow-auto text-white bg-grayscale-light rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
									{cities?.map((city, idx) => (
										<ListboxOption
											key={idx}
											className={({ focus }) =>
												`${
													focus ? 'text-white bg-primary-base' : ''
												} cursor-default select-none relative py-2 pl-10 pr-4`
											}
											value={city}
										>
											{({ selected }) => (
												<>
													<span
														className={`${
															selected
																? 'font-medium'
																: 'font-normal'
														} block truncate`}
													>
														{city.label}
													</span>
													{selected ? (
														<span
															className={`${
																selected
																	? 'text-white'
																	: 'text-indigo-600'
															} absolute inset-y-0 left-0 flex items-center pl-3`}
														>
															<IoChevronDownOutline
																className='w-5 h-5'
																aria-hidden='true'
															/>
														</span>
													) : null}
												</>
											)}
										</ListboxOption>
									))}
								</ListboxOptions>
							</Transition>
						</div>
					</Listbox>
				)}
			</div>
			<div className='px-1'>
				{selectedCountry && (
					<div className='p-3 w-fit rounded-xl bg-grayscale-light'>
						<h5>{selectedCountry?.label}</h5>
					</div>
				)}
			</div>
		</div>
	)
}
