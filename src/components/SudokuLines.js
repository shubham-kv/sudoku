import React from 'react'


export default function SudokuLines() {
	return (
		<g className='lines_g'>
			<line className='horizontal_line'
				x1={100} y1={0} x2={100} stroke='white' strokeWidth={0.5}>
				<animate
					attributeName='y2'
					dur='0.4s'
					fill='freeze'
					begin='1s'
					calcMode='spline'
					values='0; 300'
					keyTimes='0; 1'
					keySplines='1,0,1,1'
				/>
			</line>

			<line className='horizontal_line'
				x1={200} y1={0} x2={200} stroke='white' strokeWidth={0.5} >
				<animate
					attributeName='y2'
					dur='0.4s'
					fill='freeze'
					begin='1s'
					calcMode='spline'
					values='0; 300'
					keyTimes='0; 1'
					keySplines='1,0,1,1'
				/>
			</line>

			<line x1={0} y1={100} y2={100} stroke='white' strokeWidth={0.5} >
				<animate
					attributeName='x2'
					dur='0.4s'
					fill='freeze'
					begin='1s'
					calcMode='spline'
					values='0; 300'
					keyTimes='0; 1'
					keySplines='1,0,1,1'
				/>
			</line>

			<line x1={0} y1={200} y2={200} stroke='white' strokeWidth={0.5} >
				<animate
					attributeName='x2'
					dur='0.4s'
					fill='freeze'
					begin='1s'
					calcMode='spline'
					values='0; 300'
					keyTimes='0; 1'
					keySplines='1,0,1,1'
				/>
			</line>
		</g>
	)
}
