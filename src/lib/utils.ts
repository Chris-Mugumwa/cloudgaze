import { twMerge } from 'tailwind-merge'
import { clsx, ClassValue } from 'clsx'

/**
 *
 * 'cn' function allows us to use tailwind merge and clsx for
 *  conditionally rendering our styling without className repetitions.
 *
 *  Conditional rendering can now be done inline on a tailwind level compared
 *  to a react level.
 *
 *  Function call example:
 *
 *  className={cn('base classes here', conditional ? 'truthy classes' : 'falsy'
 *  classes', prop classes)}
 *
 */

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}
