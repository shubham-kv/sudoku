import React from 'react'

export default function SudokuFgBars({innerWidth, innerHeight}) {
	return (
		<g>
			<rect
				x={innerWidth/3 - 0.5} y={0}
				width={1} height={innerHeight}
				fill='white'
				fillOpacity={0.2} />
			
			<rect
				x={2*innerWidth/3 - 0.5} y={0}
				width={1} height={innerHeight}
				fill='white'
				fillOpacity={0.2} />
			
			<rect
				x={0} y={innerHeight/3 - 0.5}
				width={innerWidth} height={1}
				fill='white'
				fillOpacity={0.2} />
			
			<rect
				x={0} y={2*innerHeight/3 - 0.5}
				width={innerWidth} height={1}
				fill='white'
				fillOpacity={0.2} />
		</g>
	)
}
