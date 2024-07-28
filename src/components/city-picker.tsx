// 'use client'

// import React, { useState, useEffect, Fragment } from 'react'

// import {
// 	Listbox,
// 	ListboxButton,
// 	ListboxOption,
// 	ListboxOptions,
// 	Transition,
// } from '@headlessui/react'


// import {
// 	FlagIcon,
// 	ChevronDoubleDownIcon,
// 	CheckIcon,
// } from '@heroicons/react/20/solid'

// import format from 'pretty-format'
// import { v4 as uuid } from 'uuid'

// import { useCityStore } from '@/store/search/use-city-store'

// export const CityPicker = () => {
// 	const selectedCity = useCityStore(state => state?.selectedCity)
// 	const setSelectedCity = useCityStore(state => state?.setSelectedCity)

// 	return (
// 		<div>
// 			<Listbox
// 				value={selectedCity ? selectedCity : 'Location'}
// 				onChange={setSelectedCity}
// 			>
// 				<div className='relative mt-1'>
// 					<ListboxButton className='relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus:ring-2 focus:ring-opacity-75 focus:ring-white focus:ring-offset-orange-300 focus:ring-offset-2 sm:text-sm'>
// 						<span className='block truncate'>{selectedCity?.name}</span>
// 						<span className='absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
// 							<ChevronDoubleDownIcon
// 								className='w-5 h-5 text-gray-400'
// 								aria-hidden='true'
// 							/>
// 						</span>
// 					</ListboxButton>
// 					<Transition
// 						as={Fragment}
// 						leave='transition ease-in duration-100'
// 						leaveFrom='opacity-100'
// 						leaveTo='opacity-0'
// 					>
// 						<ListboxOptions className='absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
// 							{cities?.map(option => {
// 								const { name, countryCode } = option

// 								return (
// 									<ListboxOption
// 										key={uuid()}
// 										className={({ selected }) =>
// 											`cursor-default select-none relative py-2 pl-10 pr-4 ${
// 												selected
// 													? 'text-amber-900 bg-amber-100'
// 													: 'text-gray-900'
// 											}`
// 										}
// 										value={option}
// 									>
// 										{({ selected, active }) => (
// 											<>
// 												<span
// 													className={`block truncate ${
// 														selected
// 															? 'font-medium'
// 															: 'font-normal'
// 													}`}
// 												>
// 													{name}
// 												</span>
// 												{selected ? (
// 													<span
// 														className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
// 															active
// 																? 'text-amber-600'
// 																: 'text-amber-600'
// 														}`}
// 													>
// 														<CheckIcon
// 															className='w-5 h-5'
// 															aria-hidden='true'
// 														/>
// 													</span>
// 												) : null}
// 											</>
// 										)}
// 									</ListboxOption>
// 								)
// 							})}
// 						</ListboxOptions>
// 					</Transition>
// 				</div>
// 			</Listbox>
// 		</div>
// 	)
// }
