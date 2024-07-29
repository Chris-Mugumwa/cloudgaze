import React from 'react'

import Image from 'next/image'

import { cn } from '@/lib/utils'

import {
	WiWindy,
	WiHumidity,
	WiThermometer,
	WiThermometerExterior,
	WiDayCloudy,
} from 'react-icons/wi'

import moment from 'moment'

import { v4 as uuid } from 'uuid'

import { useSelectedDayStore } from '@/store/weather/use-weather-store'

import weatherIcons from '@/constants/weatherIcons'

interface FiveDayHourly {
	daily_hourly: GroupedDateData | undefined
}

export const FiveDayHourly: React.FC<FiveDayHourly> = ({ daily_hourly }) => {
	const selectedDay = useSelectedDayStore(state => state?.selectedDay)
	const setSelectedDay = useSelectedDayStore(state => state?.setSelectedDay)

	if (daily_hourly) {
		return (
			<div className='mt-6'>
				<h2 className='font-russe-one text-2xl mx-2'>Hourly Forecast</h2>
				<section className='mt-4'>
					<nav className='flex items-center flex-wrap gap-2'>
						{Object.keys(daily_hourly).map((date, _index) => {
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
						{daily_hourly[selectedDay]?.map(forecast => {
							const { weather, main, dt_txt, wind } = forecast

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
		)
	}
}
