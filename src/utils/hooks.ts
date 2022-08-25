import { MutableRefObject, useEffect } from "react"

export function useMutationObserver(
	ref: MutableRefObject<HTMLElement | null>,
	callback: MutationCallback,
	options: MutationObserverInit
): void {
	useEffect(() => {
		if (ref.current) {
			const observer = new MutationObserver(callback)

			observer.observe(ref.current, options)

			return () => {
				observer.disconnect()
			}
		}

		return
	}, [callback, options, ref])
}
