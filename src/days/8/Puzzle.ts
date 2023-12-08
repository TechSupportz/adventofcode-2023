import { lcm } from "../../utils/lcm"

type NetworkObj = {
	[key: string]: {
		L: string
		R: string
	}
}

const inputParser = (input: string): [("L" | "R")[], NetworkObj] => {
	const split = input.split("\n\n")

	const instructions: ("L" | "R")[] = split[0].split("") as ("L" | "R")[]
	const network: NetworkObj = {}

	split[1].split("\n").forEach((node) => {
		network[node.split(" = ")[0]] = {
			L: node.split(" = ")[1].split(", ")[0].substring(1),
			R: node.split(" = ")[1].split(", ")[1].substring(0, 3),
		}
	})

	return [instructions, network]
}

const first = (input: string) => {
	const [instructions, network] = inputParser(input)

	let currPos = "AAA"
	let step = 0

	let index = 0

	do {
		const newPos = network[currPos][instructions[index]]

		currPos = newPos
		step++

		if (index === instructions.length - 1) {
			index = 0
		} else {
			index = index + 1
		}
	} while (currPos !== "ZZZ")

	return step
}

const expectedFirstSolution = 6

const second = (input: string) => {
	const [instructions, network] = inputParser(input)

	const nodes = Object.keys(network).filter((node) => node[2] === "A")
	const steps = []

	for (const node of nodes) {
		let currPos = node
		let step = 0

		let index = 0

		do {
			const newPos = network[currPos][instructions[index]]

			currPos = newPos
			step++

			if (index === instructions.length - 1) {
				index = 0
			} else {
				index = index + 1
			}
		} while (currPos[2] !== "Z")

		steps.push(step)
	}

	return steps.reduce(lcm)
}

const expectedSecondSolution = 6

export { first, expectedFirstSolution, second, expectedSecondSolution }
