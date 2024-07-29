import React from 'react'

import Image from 'next/image'

import { v4 as uuid } from 'uuid'

import weatherIcons from '@/constants/weatherIcons'

interface CurrentWeatherProps {
	current: ForecastList[] | undefined
}

export const CurrentWeather: React.FC<CurrentWeatherProps> = ({ current }) => {
	if (current) {
		const { weather, main, wind } = current?.[0]
		const todayIconUrl = weatherIcons?.[weather[0].icon]
		return (
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
		)
	}
}
