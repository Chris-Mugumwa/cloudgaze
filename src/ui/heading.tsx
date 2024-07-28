import React, { useMemo } from 'react'

import type { VariantProps } from 'tailwind-variants'
import { tv } from 'tailwind-variants'

import { cn } from '@/lib/utils'

/**
 *
 * Heading
 *
 */

const text = tv({
	base: '',

	variants: {
		size: {
			'7xl': 'text-7xl',
			'6xl': 'text-6xl',
			'5xl': 'text-5xl',
			'4xl': 'text-4xl',
			'3xl': 'text-3xl',
			'2xl': 'text-2xl',
			large: 'text-lg',
			medium: 'text-md',
			small: 'text-sm',
			xs: 'text-xs',
		},
		alignment: {
			default: 'text-left',
			left: 'text-left',
			right: 'text-right',
			center: 'text-center',
		},
		font: {
			'russo-one': 'font-russo-one',
			'chakra-petch': 'font-chakra-petch',
		},
		color: {
			default: 'text-error-base',
			white: 'text-white',
			black: 'text-black',
			primary: 'text-primary-base',
			'gray-500': 'text-grayScale-500',
			'gray-400': 'text-grayScale-400',
			'gray-900': 'text-grayScale-900',
		},
	},
})

type TextVariants = VariantProps<typeof text>

export interface HeadingProps extends TextVariants {
	styles?: string
	children: React.ReactNode
}

export const Heading: React.FC<HeadingProps> = ({
	styles,
	size,
	alignment,
	color,
	font,
	children,
}) => {
	const variantStyle = useMemo(
		() => text({ size, alignment, color, font }),
		[size, alignment, color, font],
	)

	return (
		<h1 className={cn(variantStyle, size, alignment, color, font, styles)}>
			{children}
		</h1>
	)
}
