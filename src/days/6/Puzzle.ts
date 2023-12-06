const inputParser = (input: string) => {
	const split = input.split("\n")

	const sheet = split.map((item) => item.split(":")[1].trim())

	const time = sheet[0].split(/\s+/)
	const distance = sheet[1].split(/\s+/)

	const parsedSheet = time.map((value, index) => {
		return { time: parseInt(value), distance: parseInt(distance[index]) }
	})

	return parsedSheet
}

const first = (input: string) => {
	const sheet = inputParser(input)

	/* 
		dist = (time - speed) * speed
	*/

	const allWays = []

	for (const race of sheet) {
		let ways = 0

		for (let speed = 0; speed < race.time; speed++) {
			if ((race.time - speed) * speed > race.distance) {
				ways = ways + 1
			}
		}

		allWays.push(ways)
	}

	console.log(allWays)

	return allWays.reduce((acc, curr) => acc * curr, 1)

	// return "solution 1"
}

const expectedFirstSolution = 288

const second = (input: string) => {
	const split = input.split("\n")

	const sheet = split.map((item) => item.split(":")[1].trim())

	const time = parseInt(sheet[0].replace(/\D/g, ""))
	const distance = parseInt(sheet[1].replace(/\D/g, ""))

	let ways = 0

	for (let speed = 0; speed < time; speed++) {
		if ((time - speed) * speed > distance) {
			ways = ways + 1
		}
	}

	return ways
}

const expectedSecondSolution = 71503

export { first, expectedFirstSolution, second, expectedSecondSolution }
