'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'

import Image from 'next/image'

import { useQuery } from '@tanstack/react-query'

import { motion } from 'framer-motion'
import { debounce } from 'lodash'

import {
	WiWindy,
	WiHumidity,
	WiThermometer,
	WiThermometerExterior,
	WiDayCloudy,
} from 'react-icons/wi'

import moment from 'moment'
import { v4 as uuid } from 'uuid'

import {
	useGroupedDataStore,
	useSelectedDayStore,
} from '@/store/weather/use-weather-store'

import { cn } from '@/lib/utils'

import weatherIcons from '@/constants/weatherIcons'

import { fetchWeatherAsync } from '@/api/openweathermap/use-weather'

export const UserWeather = ({ coords }: { coords: CoordsProps }) => {
	const { latitude, longitude } = coords

	const { data: userWeatherData, isPending } = useQuery({
		queryKey: [],
		queryFn: async () =>
			await fetchWeatherAsync({ lat: latitude, lon: longitude }),
		staleTime: 300000,
	})

	const carouselRef = useRef<HTMLDivElement>(null)

	const [selectedDayForecast, setSelectedDayForecast] = useState<
		ForecastList[]
	>([])

	const [constraintLeft, setConstraintLeft] = useState(0)
	const [node, setNode] = useState<HTMLElement>()
	const groupedData = useGroupedDataStore(state => state?.groupedData)
	const setGroupedData = useGroupedDataStore(state => state?.setGroupedData)

	const selectedDay = useSelectedDayStore(state => state?.selectedDay)
	const setSelectedDay = useSelectedDayStore(state => state?.setSelectedDay)

	const containerRef = useCallback((node: HTMLElement | null) => {
		if (!node) return
		setNode(node)
	}, [])

	useEffect(() => {
		if (!node) return

		const handleResize = debounce(() => {
			setConstraintLeft(-(node.scrollWidth - node.clientWidth))
		}, 500)

		handleResize()

		const resizeObserver = new ResizeObserver(handleResize)
		resizeObserver.observe(node)

		return () => resizeObserver.disconnect()
	}, [node])

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
		const todayDate = new Date().toLocaleDateString()

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
		const { weather, main, wind } = selectedDayForecast[0]
		const todayIconUrl = weatherIcons[weather[0].icon]

		return (
			<main className='w-full mx-auto overflow-x-hidden'>
				<section>
					<div
						key={uuid()}
						className='flex items-center justify-between lg:max-w-md'
					>
						<div className='flex items-center gap-x-2'>
							<div className='flex flex-col items-center'>
								<h2 className='text-white font-chakra-petch font-bold relative text-7xl text-center'>
									{Math.round(main.temp)}

									<span className='w-3 h-3 rounded-full bg-white absolute' />
								</h2>

								<h5 className='text-grayscale-200/80 font-russe-one text-2xl text-center'>
									{weather[0].description}
								</h5>
							</div>

							<div className='flex flex-col gap-y-3'>
								<div className='flex items-center'>
									<Image
										src={'/images/min_temp.png'}
										alt='Min Temp'
										width={40}
										height={40}
									/>

									<div className='flex flex-col items-center'>
										<h3 className='text-white font-russe-one text-md font-semibold relative'>
											{Math.round(main.temp_min)}

											<span className='w-1 h-1 rounded-full bg-white absolute' />
										</h3>

										<h5 className='text-grayscale-200/80 font-russe-one text-xs font-regular'>
											Min
										</h5>
									</div>
								</div>

								<div className='flex items-center'>
									<Image
										src={'/images/max_temp.png'}
										alt='Max temp'
										width={40}
										height={40}
									/>

									<div className='flex flex-col items-center'>
										<h3 className='text-white font-russe-one text-md font-semibold relative'>
											{Math.round(main.temp_max)}

											<span className='w-1 h-1 rounded-full bg-white absolute' />
										</h3>

										<h5 className='text-grayscale-200/80 font-russe-one text-xs font-regular'>
											Max
										</h5>
									</div>
								</div>
							</div>
						</div>

						<Image
							src={todayIconUrl}
							alt={weather[0].description}
							width={200}
							height={200}
							className='pointer-events-none'
						/>
					</div>

					<div className='px-3 py-7 rounded-xl bg-grayscale-light flex items-center justify-evenly'>
						<div className='flex flex-col items-center'>
							<Image
								src={'/images/wind.png'}
								alt='Wind speed'
								width={40}
								height={40}
							/>

							<h3 className='text-white font-russe-one text-md font-semibold'>
								{wind.speed} km/h
							</h3>

							<h5 className='text-grayscale-200/80 font-russe-one text-xs font-regular'>
								Wind
							</h5>
						</div>

						<div className='flex flex-col items-center'>
							<Image
								src={'/images/humidity.png'}
								alt='Humidity'
								width={40}
								height={40}
							/>

							<h3 className='text-white font-russe-one text-md font-semibold'>
								{Math.round(main.humidity)} %
							</h3>

							<h5 className='text-grayscale-200/80 font-russe-one text-xs font-regular'>
								Humidity
							</h5>
						</div>

						<div className='flex flex-col items-center'>
							<Image
								src={'/images/feels_like.png'}
								alt='Feels like'
								width={40}
								height={40}
							/>

							<h3 className='text-white font-russe-one text-md font-semibold relative'>
								{Math.round(main.feels_like)}
								<span className='w-1 h-1 rounded-full bg-white absolute' />
							</h3>

							<h5 className='text-grayscale-200/80 font-russe-one text-xs font-regular'>
								Feels like
							</h5>
						</div>
					</div>
				</section>

				<div className='mt-6'>
					<h2 className='font-russe-one text-2xl mx-2'>Today</h2>
					<motion.div
						// ref={carouselRef}
						ref={carouselRef}
						className='mt-1 overflow-hidden'
					>
						<motion.div
							ref={containerRef}
							dragConstraints={{ right: 0, left: constraintLeft }}
							drag='x'
							whileHover={{ cursor: 'grab' }}
							whileDrag={{ cursor: 'grabbing' }}
							className='flex items-center'
						>
							{Object.values(groupedData)[0]?.map((details, _index) => {
								const { clouds, main, dt, sys, wind, weather } = details

								const weatherCondition = weather[0].icon
								const iconUrl = weatherIcons[weatherCondition]

								return (
									<motion.div
										onClick={() => {
											console.log('Cheese', details)
										}}
										key={uuid()}
										className='flex flex-col bg-grayscale-light w-48 m-1 px-1 py-1 max-h-72 min-h-72 min-w-48 rounded-lg  justify-center'
									>
										<header>
											<h5 className='text-primary-base text-center font-russe-one font-medium'>
												{`${moment.unix(dt).format('HH:mm')}`}
											</h5>
										</header>

										<div className='flex items-center'>
											<Image
												src={iconUrl}
												alt={weather[0].description}
												width={90}
												height={90}
											/>

											<div className='flex items-center flex-col'>
												<p className='font-russe-one text-3xl relative'>
													{Math.round(main.temp)}
													<span className='w-1 h-1 rounded-full bg-white absolute' />
												</p>
												<p className='font-russe-one text-primary-300 text-md relative font-normal'>
													{weather[0].description}
												</p>
											</div>
										</div>

										<div className='flex flex-col items-start px-2 mt-2 gap-y-0.5'>
											<div>
												<p className='font-russe-one text-sm relative'>
													Feels like: {main.feels_like}
													<span className='w-1 h-1 rounded-full bg-white absolute' />
												</p>
											</div>

											<div>
												<p className='font-russe-one text-sm'>
													Wind: {wind.speed} km/h
												</p>
											</div>

											<div>
												<p className='font-russe-one text-sm'>
													Humidity: {main.humidity}%
												</p>
											</div>
										</div>
									</motion.div>
								)
							})}
						</motion.div>
					</motion.div>
				</div>

				<div className='mt-6'>
					<h2 className='font-russe-one text-2xl mx-2'>Hourly Forecast</h2>
					<section className='mt-4'>
						<nav className='flex items-center flex-wrap gap-2'>
							{Object.keys(groupedData).map((date, _index) => {
								return (
									<div
										key={uuid()}
										onClick={() => {
											console.log(date)
											setSelectedDay(date)
										}}
										className={cn(
											'py-2 px-4 bg-grayscale-light rounded-xl w-24 flex items-center justify-center border-2 cursor-pointer transition-all duration-500',
											date === selectedDay
												? 'border-primary-base'
												: 'border-transparent',
										)}
									>
										<h4 className='font-russe-one'>
											{moment(date, 'DD-MM-YYYY').format('ddd')}
										</h4>
									</div>
								)
							})}
						</nav>

						<div className='mt-4'>
							{groupedData[selectedDay]?.map(forecast => {
								const { dt, weather, main, dt_txt } = forecast

								const weatherCondition = weather[0].icon
								const iconUrl = weatherIcons[weatherCondition]

								return (
									<div
										key={uuid()}
										onClick={() => {
											console.log(forecast)
										}}
										className={cn(
											' p-4 rounded-lg  m-1 cursor-pointer max-w-2xl lg:p-6',
											selectedDay === dt_txt
												? 'bg-primary-base'
												: 'bg-grayscale-light',
										)}
									>
										<section className='flex  justify-between items-center'>
											<div>
												<p className='text-white font-russe-one text-md relative'>
													{`${moment
														.unix(forecast.dt)
														.format('HH:mm')}`}
												</p>

												<h3 className='text-white font-russe-one text-3xl relative'>
													{weather[0].main}
												</h3>

												<h5 className='text-primary-base font-chakra-petch text-md relative'>
													{weather[0].description}
												</h5>
											</div>

											<div className='flex flex-col items-center'>
												<Image
													src={iconUrl}
													alt={weather[0].description}
													width={90}
													height={90}
												/>

												<p className='font-russe-one text-3xl relative'>
													{Math.round(main.temp)}
													<span className='w-1 h-1 rounded-full bg-white absolute' />
												</p>
											</div>
										</section>

										<section
											className={cn(
												'flex flex-row justify-between gap-y-1 items-start mt-4',
											)}
										>
											<div>
												<div className='flex items-center gap-x-2'>
													<WiDayCloudy className='text-white text-2xl' />

													<p className='font-russe-one text-sm relative'>
														Feels like: {main.feels_like}
														<span className='w-1 h-1 rounded-full bg-white absolute' />
													</p>
												</div>

												<div className='flex items-center gap-x-2'>
													<WiWindy className='text-white text-2xl' />

													<p className='font-russe-one text-sm relative'>
														Wind Speed: {wind.speed} km/h
													</p>
												</div>

												<div className='flex items-center gap-x-2'>
													<WiHumidity className='text-white text-2xl' />

													<p className='font-russe-one text-sm relative'>
														Humidity: {main.humidity} %
													</p>
												</div>
											</div>

											<div>
												<div className='flex items-center gap-x-2'>
													<WiThermometerExterior className='text-white text-2xl' />

													<p className='font-russe-one text-sm relative'>
														Min Temp: {main.temp_min}
														<span className='w-1 h-1 rounded-full bg-white absolute' />
													</p>
												</div>

												<div className='flex items-center gap-x-2'>
													<WiThermometer className='text-white text-2xl' />

													<p className='font-russe-one text-sm relative'>
														Max Temp: {main.temp_max}
														<span className='w-1 h-1 rounded-full bg-white absolute' />
													</p>
												</div>
											</div>
										</section>
									</div>
								)
							})}
						</div>
					</section>
				</div>
			</main>
		)
	}
}
