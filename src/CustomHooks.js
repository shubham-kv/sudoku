import {useEffect} from 'react'

export const useOutsideClickHandler = (ref, outsideClickHandler) => {
	useEffect(() => {
		const clickHandler = (e) => {
			if(ref && !ref.current.contains(e.target)) {
				outsideClickHandler()
			}
		}
		document.addEventListener('click', clickHandler)

		return () => {
			document.removeEventListener('click', clickHandler)
		}
	}, [ref, outsideClickHandler])
}
