import { type Theme, useTheme } from "@emotion/react"
import { useMedia } from "react-use"

const useBreakpointMedia = (breakpoint: string) =>
	useMedia(`(min-width: ${breakpoint})`, false)

const breakpointToNumber: Record<keyof Theme['breakpoints'], number> = {
	extraSmall: 0,
	small: 1,
	medium1: 2,
	medium2: 3,
	large: 4,
}

/**
 * Returns the breakpoint at which the screen is at.
 */
export function useBreakpoint(): keyof Theme["breakpoints"] {
	const theme = useTheme()
	const isSmall = useBreakpointMedia(theme.breakpoints.small)
	const isMedium1 = useBreakpointMedia(theme.breakpoints.medium1)
	const isMedium2 = useBreakpointMedia(theme.breakpoints.medium2)
	const isLarge = useBreakpointMedia(theme.breakpoints.large)

	return isSmall
		? "small"
		: isMedium1
		? "medium1"
		: isMedium2
		? "medium2"
		: isLarge
		? "large"
		: "extraSmall"
}

/**
 * Returns if the screen is at least at the given breakpoint.
 */
export function useIsBreakpoint(breakpoint: keyof Theme["breakpoints"]): boolean {
	const breakpointHook = useBreakpoint()
	const numBreakpointHook = breakpointToNumber[breakpointHook]
	const numBreakpoint = breakpointToNumber[breakpoint]
	return numBreakpointHook >= numBreakpoint
}