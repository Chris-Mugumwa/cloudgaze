import React, { useState, useEffect, useRef, useCallback } from 'react'

import Image from 'next/image'

import { motion } from 'framer-motion'

import { debounce } from 'lodash'

import moment from 'moment'

import { v4 as uuid } from 'uuid'

import weatherIcons from '@/constants/weatherIcons'

interface CurrentHourlyProps {
	current_hourly: GroupedDateData | undefined
}

export const CurrentHourly: React.FC<CurrentHourlyProps> = ({
	current_hourly,
}) => {
	const carouselRef = useRef<HTMLDivElement>(null)

	const [constraintLeft, setConstraintLeft] = useState(0)
	const [node, setNode] = useState<HTMLElement>()

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

	if (current_hourly) {
		return (
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
						{Object.values(current_hourly)[0]?.map((details, _index) => {
							const { clouds, main, dt, sys, wind, weather } = details

							const weatherCondition = weather[0].icon
							const iconUrl = weatherIcons[weatherCondition]

							return (
								<motion.div
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
		)
	}
}
