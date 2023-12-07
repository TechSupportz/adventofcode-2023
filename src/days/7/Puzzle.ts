import { groupBy } from "../../utils/groupBy"

type CardType = "A" | "K" | "Q" | "J" | "T" | "9" | "8" | "7" | "6" | "5" | "4" | "3" | "2"

type HandType = {
	cards: CardType[]
	bid: string
	rank: number
}[]

const inputParser = (input: string): HandType => {
	const hands = input.split("\n")

	const parsedHands = hands.map((hand) => ({
		cards: hand.split(" ")[0].split("") as CardType[],
		bid: hand.split(" ")[1],
		rank: 0,
	}))

	return parsedHands
}

const first = (input: string) => {
	const hands = inputParser(input)

	const cardWeight = {
		A: 13,
		K: 12,
		Q: 11,
		J: 10,
		T: 9,
		"9": 8,
		"8": 7,
		"7": 6,
		"6": 5,
		"5": 4,
		"4": 3,
		"3": 2,
		"2": 1,
	}

	for (const hand of hands) {
		const occurrences: { [key: string]: number } = {}

		for (const card of hand.cards) {
			occurrences[card] = (occurrences[card] || 0) + 1
		}

		switch (Object.keys(occurrences).length) {
			case 1:
				hand.rank = 7
				break
			case 5:
				hand.rank = 1
				break
			case 2: {
				if (Object.values(occurrences).includes(4)) {
					hand.rank = 6
					break
				}

				if (Object.values(occurrences).includes(3)) {
					hand.rank = 5
					break
				}
			}
			case 3: {
				if (Object.values(occurrences).includes(3)) {
					hand.rank = 4
					break
				}

				if (Object.values(occurrences).filter((value) => value === 2).length === 2) {
					hand.rank = 3
					break
				}
			}
			case 4: {
				hand.rank = 2
				break
			}
		}
	}

	const groupedHands: Record<string, HandType> = groupBy(hands, "rank")

	const sortedHands: HandType = []

	// console.log(groupedHands)

	let currRank = 1

	for (const group in groupedHands) {
		const sortedGroup = groupedHands[group].toSorted((a, b) => {
			for (let i = 0; i <= 5; i++) {
				if (a.cards[i] === b.cards[i]) continue

				return cardWeight[a.cards[i]] - cardWeight[b.cards[i]]
			}
		})

		sortedGroup.forEach((hand) => {
			hand.rank = currRank
			currRank++
		})

		sortedHands.push(...sortedGroup)
	}

	// console.log(JSON.stringify(sortedHands))

	const sum = sortedHands.reduce((prev, curr, index) => prev + parseInt(curr.bid) * curr.rank, 0)

	return sum
}

const expectedFirstSolution = 6440

const second = (input: string) => {
	const hands = inputParser(input)

	const cardWeight = {
		A: 13,
		K: 12,
		Q: 11,
		T: 10,
		"9": 9,
		"8": 8,
		"7": 7,
		"6": 6,
		"5": 5,
		"4": 4,
		"3": 3,
		"2": 2,
		J: 1,
	}

	for (const hand of hands) {
		const occurrences: { [key: string]: number } = {}

		for (const card of hand.cards) {
			occurrences[card] = (occurrences[card] || 0) + 1
		}

		if (Object.keys(occurrences).includes("J") && Object.keys(occurrences).length > 1) {
			const occurArray = Object.entries(occurrences).toSorted((a, b) => b[1] - a[1])

			const mode = Object.entries(occurrences).toSorted((a, b) => b[1] - a[1])[0]

			if (mode[0] === "J") {
				occurrences[occurArray[1][0]] += occurrences["J"]
			} else {
				occurrences[mode[0]] += occurrences["J"]
			}

			delete occurrences["J"]
		}

		switch (Object.keys(occurrences).length) {
			case 1:
				hand.rank = 7
				break
			case 5:
				hand.rank = 1
				break
			case 2: {
				if (Object.values(occurrences).includes(4)) {
					hand.rank = 6
					break
				}

				if (Object.values(occurrences).includes(3)) {
					hand.rank = 5
					break
				}
			}
			case 3: {
				if (Object.values(occurrences).includes(3)) {
					hand.rank = 4
					break
				}

				if (Object.values(occurrences).filter((value) => value === 2).length === 2) {
					hand.rank = 3
					break
				}
			}
			case 4: {
				hand.rank = 2
				break
			}
		}
	}

	const groupedHands: Record<string, HandType> = groupBy(hands, "rank")

	const sortedHands: HandType = []

	// console.log(JSON.stringify(groupedHands))

	let currRank = 1

	for (const group in groupedHands) {
		const sortedGroup = groupedHands[group].toSorted((a, b) => {
			for (let i = 0; i <= 5; i++) {
				if (a.cards[i] === b.cards[i]) continue

				return cardWeight[a.cards[i]] - cardWeight[b.cards[i]]
			}
		})

		// console.log(sortedGroup)
		// console.log("----------------------------------------")

		sortedGroup.forEach((hand) => {
			hand.rank = currRank
			currRank++
		})

		sortedHands.push(...sortedGroup)
	}

	// console.log(JSON.stringify(sortedHands))

	const sum = sortedHands.reduce((prev, curr, index) => prev + parseInt(curr.bid) * curr.rank, 0)

	return sum
}

const expectedSecondSolution = 6839

export { first, expectedFirstSolution, second, expectedSecondSolution }
