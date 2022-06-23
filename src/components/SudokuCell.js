import React, {useCallback} from 'react'
import {useSpring, animated} from '@react-spring/web'

import {useSudokuContext} from 'contexts/SudokuContext'
import {isValidCellValue} from 'sudokuHelpers'
import {deepCopy} from 'utils'


export default function SudokuCell(props) {
	const {
		row, col,
		innerWidth, innerHeight, gridGap
	} = props

	const sudokuContextValue = useSudokuContext()
	const {
		selectedValue, setSelectedValue,
		inputMatrix, workingMatrix, setWorkingMatrix,
	} = sudokuContextValue


	const handleCellClick = useCallback(
		(row, col) => {
			// if selected value is not null and not 0
			if(selectedValue || selectedValue === 0) {

				// if clicked on a modifiable cell
				if(inputMatrix[row][col] === 0) {
					const newMatrix = deepCopy(workingMatrix)

					newMatrix[row][col] = (workingMatrix[row][col] === selectedValue)
						? 0
						: selectedValue

					setWorkingMatrix(newMatrix)
				}
				else {
					// select the value of the clicked cell
					setSelectedValue(inputMatrix[row][col])
				}
			}
			else {
				// select the value of the clicked cell
				setSelectedValue(workingMatrix[row][col])
			}

		},
		[ inputMatrix, workingMatrix, setWorkingMatrix, selectedValue, setSelectedValue ]
	)

	const inputMatrixVal = inputMatrix[row][col]
	const value = workingMatrix[row][col]
	const cellClassArr = ['sudoku_cell_g']

	if(inputMatrixVal !== 0) {
		cellClassArr.push('unmodifiable')
	}
	else {
		if(!isValidCellValue(workingMatrix, {row, col}, value)) {
			cellClassArr.push('incorrect')
		}
	}

	if(selectedValue && (selectedValue === value)) {
		cellClassArr.push('highlighted')
	}

	const sudokuCellClassName = cellClassArr.join(' ')

	const cellOuterWidth = (innerWidth - 2 * gridGap) / 9
	const cellOuterHeight = (innerHeight - 2 * gridGap) / 9
	const circleMargin = 2
	const radius = cellOuterWidth / 2 - circleMargin
	const translateX = col * cellOuterWidth + (parseInt(col / 3) * gridGap)
	const translateY = row * cellOuterHeight + (parseInt(row / 3) * gridGap)


	const animatedStyle = useSpring({
		transform: (value) ? 'scale(1)' : 'scale(0)',
		config: {
			duration: 150
		}
	})

	return (
		<g className={sudokuCellClassName}
			transform={`translate(${translateX}, ${translateY})`}>

			<animated.g
				style={{
					transformOrigin: 'center',
					transformBox: 'fill-box',
					...animatedStyle
				}}>
				{
					// ((inputMatrix[row][col] !== 0) || cellClassArr.includes('highlighted'))
					// ? (
						<circle 
							cx={cellOuterWidth/2}
							cy={cellOuterHeight/2}
							r={radius} />
					// )
					// : null
				}
				
				{
					(value)
					? (
						<text x={cellOuterWidth/2} y={cellOuterHeight/2}>
							{value}
						</text>
					)
					: null
				}
			</animated.g>

			<rect
				fill='transparent'
				width={cellOuterWidth} height={cellOuterHeight}
				onClick={() => handleCellClick(row, col)}
				/>
		</g>
	)
}
