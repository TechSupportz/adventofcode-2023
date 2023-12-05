const parseInput = (input: string) => {
	return input.split("\n").map((card) =>
		card
			.split(":")[1]
			.trim()
			.split("|")
			.map((numbers) =>
				numbers
					.trim()
					.split(" ")
					.filter((item) => item !== ""),
			),
	)
}

const first = (input: string) => {
	const cards = parseInput(input)

	const cardPoints: number[] = []

	for (const card of cards) {
		const winning = card[0]
		const elfNum = card[1]

		let points = 0

		for (const number of elfNum) {
			if (winning.includes(number)) {
				if (points > 0) {
					points = points * 2
				} else {
					points = 1
				}
			}
		}

		cardPoints.push(points)
	}

	const sum = cardPoints.reduce((acc, curr) => acc + curr, 0)

	return sum
}

const expectedFirstSolution = 13

const second = (input: string) => {
	const cards = parseInput(input)

	let cardCount: Record<string, number> = {}

	for (let num = 0; num < cards.length; num++) {
		cardCount[`Card ${num}`] = 1
	}

	// console.log(cardCount)

	for (const [index, card] of cards.entries()) {
		const winning = card[0]
		const elfNum = card[1]

		let points = 0

		for (const number of elfNum) {
			if (winning.includes(number)) {
				points = points + 1
			}
		}

		for (let step = 0; step < points; step++) {
			cardCount[`Card ${index + step + 1}`] =
				cardCount[`Card ${index + step + 1}`] + 1 * cardCount[`Card ${index}`]
		}
	}

	// console.log(cardCount)

	return Object.values(cardCount).reduce((acc, curr) => acc + curr, 0)
}

const expectedSecondSolution = 30

export { first, expectedFirstSolution, second, expectedSecondSolution }
