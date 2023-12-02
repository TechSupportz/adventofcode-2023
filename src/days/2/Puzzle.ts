interface CubeCount {
	red: number
	green: number
	blue: number
}

const first = (input: string) => {
	const games = input.split("\n")

	const maxCount: CubeCount = {
		red: 12,
		green: 13,
		blue: 14,
	}

	const validGames: number[] = []

	for (let i = 0; i < games.length; i++) {
		let isValid = true

		const sets = games[i]
			.split(": ")[1]
			.split("; ")
			.map((item) => {
				const cubeObj: CubeCount = {
					red: 0,
					green: 0,
					blue: 0,
				}

				item.trim()
					.split(", ")
					.forEach((cube) => {
						const num = parseInt(cube.split(" ")[0])

						if (cube.includes("red")) {
							cubeObj.red = cubeObj.red + num
						}

						if (cube.includes("green")) {
							cubeObj.green = cubeObj.green + num
						}

						if (cube.includes("blue")) {
							cubeObj.blue = cubeObj.blue + num
						}
					})

				return cubeObj
			})

		for (const set of sets) {
			if (set.red > maxCount.red || set.green > maxCount.green || set.blue > maxCount.blue) {
				isValid = false
			}
		}

		if (isValid) validGames.push(i + 1)
	}

	const sum = validGames.reduce((acc, curr) => acc + curr, 0)

	return sum
}

const expectedFirstSolution = 8

const second = (input: string) => {
	const games = input.split("\n")

	const gamePower: number[] = []

	for (let i = 0; i < games.length; i++) {
		const maxCount: CubeCount = {
			red: 0,
			green: 0,
			blue: 0,
		}

		const sets = games[i]
			.split(": ")[1]
			.split("; ")
			.map((item) => {
				const cubeObj: CubeCount = {
					red: 0,
					green: 0,
					blue: 0,
				}

				item.trim()
					.split(", ")
					.forEach((cube) => {
						const num = parseInt(cube.split(" ")[0])

						if (cube.includes("red")) {
							cubeObj.red = cubeObj.red + num
						}
						if (cube.includes("green")) {
							cubeObj.green = cubeObj.green + num
						}
						if (cube.includes("blue")) {
							cubeObj.blue = cubeObj.blue + num
						}
					})

				return cubeObj
			})

		for (const set of sets) {
			if (set.red > maxCount.red) {
				maxCount.red = set.red
			}
			if (set.blue > maxCount.blue) {
				maxCount.blue = set.blue
			}
			if (set.green > maxCount.green) {
				maxCount.green = set.green
			}
		}

		const power = maxCount.red * maxCount.green * maxCount.blue
		gamePower.push(power)
	}

	const sum = gamePower.reduce((acc, curr) => acc + curr, 0)

	return sum
}

const expectedSecondSolution = 2286

export { first, expectedFirstSolution, second, expectedSecondSolution }
