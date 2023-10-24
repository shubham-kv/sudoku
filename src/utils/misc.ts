export const deepCopy = <T>(object: T): T => JSON.parse(JSON.stringify(object))

export const isSmallScreen = () => window.screen.width < 480

// creates and returns a string in the format 'xh ym zs' where 'x' 'y' and 'z' is
// the number of hours, minutes and seconds passed respectively
export const formatTime = (timeInSeconds: number) => {
	let hours = 0,
		minutes = 0,
		seconds = 0

	minutes = Math.floor(timeInSeconds / 60)
	seconds = timeInSeconds % 60

	if (minutes >= 60) {
		hours = Math.floor(minutes / 60)
		minutes = minutes % 60
	}

	return hours > 0
		? `${hours}h ${minutes}m ${seconds}s`
		: minutes > 0
		? `${minutes}m ${seconds}s`
		: `${seconds}s`
}
