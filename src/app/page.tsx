'use client'

import { useState } from 'react'

import { useQuery } from '@tanstack/react-query'

import moment from 'moment'

import { UserWeather } from './user-weather'
import { fetchCoords } from '@/api/openweathermap/use-weather'

export default function Home() {
	const { data: coordsData, isPending } = useQuery({
		queryKey: ['coords'],
		queryFn: async () => await fetchCoords(),
	})

	const [groupedData, setGroupedData] = useState({})

	if (isPending) {
	}

	if (coordsData) {
		const { city, country } = coordsData

		return (
			<main className='flex flex-col min-h-screen px-2 mt-4 max-w-7xl mx-auto'>
				<section className='w-full'>
					<div className='flex flex-col w-full'>
						<div className='flex'>
							<h2 className='font-russe-one text-2xl text-white'>
								{city},
							</h2>
							<span className='w-3' />
							<p className='font-russe-one text-2xl'> {country}</p>
						</div>
						<h4 className='font-russe-one text-grayscale-100/90'>{`${moment().format(
							'DD MMMM. dddd',
						)}`}</h4>
					</div>
				</section>

				<section className='mt-2'>
					<div>{coordsData && <UserWeather coords={coordsData} />}</div>

					<div></div>
				</section>
			</main>
		)
	}
}
