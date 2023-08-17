const {formatTime} = require('../src/myUtils')

test('formats seconds correctly', () => {
	const nOfSeconds = 60 * 60 * 23 + 89
	const formattedTime = formatTime(nOfSeconds)
	expect(formattedTime).toBe('2m 9s')
})
