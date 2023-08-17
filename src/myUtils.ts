
export const genEmptySudokuMatrix = () => Array(9).fill(Array(9).fill(0))

export const deepCopy = (arr) => JSON.parse(JSON.stringify(arr))

export const isSmallScreen = () => window.screen.width < 480

// creates and returns a string in the format 'xh ym zs' where 'x' 'y' and 'z' is
// the number of hours, minutes and seconds passed respectively
export const formatTime = (timeInSeconds) => {
	let hours = 0, minutes = 0, seconds = 0

	minutes = parseInt(timeInSeconds / 60)
	seconds = timeInSeconds % 60

	if(minutes >= 60) {
		hours = parseInt(minutes / 60)
		minutes = minutes % 60
	}

	return (hours > 0)
		? `${hours}h ${minutes}m ${seconds}s`
		: (
			(minutes > 0)
			? `${minutes}m ${seconds}s`
			: `${seconds}s`
		)
}
