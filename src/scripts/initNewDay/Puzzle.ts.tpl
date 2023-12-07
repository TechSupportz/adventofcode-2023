const inputParser = (input: string) => {
	const split = input.split("\n")
	return split
}

const first = (input: string) => {
	const split = inputParser(input)
	return "solution 1"
}

const expectedFirstSolution = "solution 1"

const second = (input: string) => {
	const split = inputParser(input)
	return "solution 2"
}

const expectedSecondSolution = "solution 2"

export { first, expectedFirstSolution, second, expectedSecondSolution }
