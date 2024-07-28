'use client'

import React from 'react'
import Avatar, { genConfig } from 'react-nice-avatar'

import Image from 'next/image'

import { Disclosure } from '@headlessui/react'

import { Search } from './search'

export const Navigation = () => {
	/*
	 * Generating a random avatar  *
	 */
	const config = genConfig()

	return (
		<Disclosure as='nav' className='bg-grayscale-base'>
			<div className='mx-auto max-w-7xl sm:px-4 lg:px-8'>
				<div className='relative flex h-20 items-center justify-between'>
					<div className='flex items-center px-2 lg:px-0'>
						<div className='flex-shrink-0'>
							<Image
								src='/svg/logo.svg'
								width={150}
								height={100}
								priority
								alt='Cloud gaze logo'
							/>
						</div>
						<div className='hidden lg:ml-6 lg:block'></div>
					</div>

					<div className='hidden lg:block max-w-4xl w-full'>
						<Search />
					</div>

					<Avatar style={{ width: '3rem', height: '3rem' }} {...config} />
				</div>
			</div>
		</Disclosure>
	)
}
