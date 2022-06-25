import React, {useCallback} from 'react'
import {useSpring, animated} from '@react-spring/web'

import {useSudokuContext} from 'contexts/SudokuContext'
import {isValidCellValue} from 'sudokuHelpers'
import {deepCopy} from 'myUtils'


export default function SudokuCell(props) {
	const {
		row, col,
		innerWidth, innerHeight, gridGap,
		focusedCell, setFocusedCell
	} = props

	const sudokuContextValue = useSudokuContext()
	const {
		selectedValue, setSelectedValue,
		inputMatrix, workingMatrix, setWorkingMatrix,
		gameComplete
	} = sudokuContextValue


	const handleCellClick = useCallback(
		(row, col) => {
			// if selected value is not null or 0
			if(selectedValue || selectedValue === 0) {

				// if clicked on a modifiable cell
				if(inputMatrix[row][col] === 0) {
					const newMatrix = deepCopy(workingMatrix)

					newMatrix[row][col] = (workingMatrix[row][col] === selectedValue)
						? 0
						: selectedValue

					setWorkingMatrix(newMatrix)
					setFocusedCell(null)
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
		[
			selectedValue, setSelectedValue,
			inputMatrix, workingMatrix, setWorkingMatrix,
			setFocusedCell
		]
	)

	const inputMatrixVal = inputMatrix[row][col]
	const value = workingMatrix[row][col]
	const cellClassArr = ['sudoku_cell_g']

	if(inputMatrixVal !== 0) {
		cellClassArr.push('unmodifiable')
	}
	else {
		if((value !== 0) && !isValidCellValue(workingMatrix, {row, col}, value)) {
			cellClassArr.push('incorrect')
		}
	}

	if(selectedValue && (selectedValue === value)) {
		cellClassArr.push('highlighted')
	}

	const cellClassName = cellClassArr.join(' ')


	// Grid gap is the gap between the grids and also
	// is the gap between the peripheral cells and the container's edge
	const cellOuterWidth = (innerWidth - 3 * gridGap) / 9
	const cellOuterHeight = (innerHeight - 3 * gridGap) / 9
	const circleMargin = 2
	const radius = cellOuterWidth / 2 - circleMargin
	const translateX = col * cellOuterWidth + (parseInt(col / 3) * gridGap + gridGap/2)
	const translateY = row * cellOuterHeight + (parseInt(row / 3) * gridGap + gridGap/2)


	const animatedStyle = useSpring({
		transform: (value) ? 'scale(1)' : 'scale(0)',
		config: {
			duration: 150
		}
	})

	return (
		<g className={cellClassName}
			transform={`translate(${translateX}, ${translateY})`}>

			{
				(focusedCell && ((row === focusedCell.row) && (col === focusedCell.col)))
				? (
					<rect
						width={cellOuterWidth}
						height={cellOuterHeight}
						fill={cellClassArr.includes('incorrect') ? 'red' : 'white'}
						fillOpacity={0.1}
						rx={cellOuterWidth/4}
						stroke={cellClassArr.includes('incorrect') ? 'red' : 'white'}
						strokeOpacity={0.2}
						/>
				)
				: null
			}

			<animated.g
				style={{
					transformOrigin: 'center',
					transformBox: 'fill-box',
					...animatedStyle
				}}>

				<circle 
					cx={cellOuterWidth/2}
					cy={cellOuterHeight/2}
					r={radius} />
				
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

			{
				(!gameComplete)
				? (
					<rect
						fill='transparent'
						width={cellOuterWidth} height={cellOuterHeight}
						onClick={() => handleCellClick(row, col)}
						/>
				)
				: null
			}
		</g>
	)
}
