import './globals.css'

import type { Metadata } from 'next'
import { Russo_One, Chakra_Petch } from 'next/font/google'

import { Search } from '@/components/search'
import { Navigation } from '@/components/navigation'

import ReactQueryProvider from '@/utils/react-query-provider'

const russo_one = Russo_One({
	subsets: ['latin'],
	display: 'auto',
	weight: '400',
	variable: '--font-russo-one',
})

const chakra_petch = Russo_One({
	subsets: ['latin'],
	display: 'auto',
	weight: ['400'],
	variable: '--font-chakra-petch',
})

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<ReactQueryProvider>
				<body
					className={`${russo_one.variable} ${chakra_petch?.variable} font-sans bg-grayscale-base overflow-x-hidden`}
				>
					<header>
						<Navigation />

						<div className='flex lg:hidden'>
							<Search />
						</div>
					</header>
					{children}
				</body>
			</ReactQueryProvider>
		</html>
	)
}
