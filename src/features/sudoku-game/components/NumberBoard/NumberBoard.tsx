'use client'

import {useEffect, useState, forwardRef} from 'react'
import {useSprings, animated} from '@react-spring/web'

import {NumberButton} from './NumberButton'
import {PropsWithStyle} from '@/types'

import styles from './number-board.module.scss'

export const NumberBoard = forwardRef<HTMLDivElement, PropsWithStyle>(
	(props, ref) => {
		const [toggle, setToggle] = useState(false)
		const AnimatedNumberButton = animated(NumberButton)

		const nOfSprings = 9
		const springs = useSprings(
			nOfSprings,
			[...Array(nOfSprings).fill(0)].map((_, i) => ({
				opacity: toggle ? 1 : 0,
				transform: toggle ? 'scale(1)' : 'scale(0)',
				delay: i * nOfSprings * 5,
				config: {duration: 200}
			}))
		)

		useEffect(() => {
			setToggle(true)
		}, [setToggle])

		return (
			<animated.div ref={ref} style={props.style} className={styles.container}>
				{springs.map((animatedStyles, i) => (
					<AnimatedNumberButton key={i} number={i + 1} style={animatedStyles} />
				))}
			</animated.div>
		)
	}
)

NumberBoard.displayName = 'NumberBoard'
