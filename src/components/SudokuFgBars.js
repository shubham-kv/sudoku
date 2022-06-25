import React from 'react'

export default function SudokuFgBars({innerWidth, innerHeight, margin}) {

	const oneThirdX = (innerWidth) / 3
	const oneThirdY = (innerHeight) / 3

	return (
		<g>
			<rect
				x={oneThirdX - 0.5} y={0}
				width={1} height={innerHeight}
				fill='white'
				fillOpacity={0.2} />
			
			<rect
				x={2 * innerWidth / 3 - 0.5} y={0}
				width={1} height={innerHeight}
				fill='white'
				fillOpacity={0.2} />
			
			<rect
				x={0} y={oneThirdY - 0.5}
				width={innerWidth} height={1}
				fill='white'
				fillOpacity={0.2} />
			
			<rect
				x={0} y={2*oneThirdY - 0.5}
				width={innerWidth} height={1}
				fill='white'
				fillOpacity={0.2} />
		</g>
	)
}
