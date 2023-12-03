interface numberObj {
	value: number
	indexes: number[]
	line: number
}

interface symbolObj {
	symbol: string
	index: number
	line: number
}

const inputParser = (input: string): [Array<numberObj[]>, Array<symbolObj[]>] => {
	const schematicArray = input.split("\n")

	const numberArray: Array<numberObj[]> = []
	const symbolArray: Array<symbolObj[]> = []

	for (const [line, schematic] of schematicArray.entries()) {
		// console.log(line, schematic)

		const lineNumbers: numberObj[] = []
		const lineSymbols: symbolObj[] = []

		let digits: string[] = []
		let digitIndex: number[] = []

		for (const [index, part] of schematic.split("").entries()) {
			if (part.match(/\d/g)) {
				digits.push(part)
				digitIndex.push(index)
			} else {
				if (digits.length !== 0 && digitIndex.length !== 0) {
					lineNumbers.push({
						value: parseInt(digits.join("")),
						indexes: digitIndex,
						line,
					})

					digits = []
					digitIndex = []
				}

				if (part !== ".") {
					lineSymbols.push({
						symbol: part,
						index,
						line,
					})
				}
			}
		}

		if (digits.length !== 0 && digitIndex.length !== 0) {
			lineNumbers.push({
				value: parseInt(digits.join("")),
				indexes: digitIndex,
				line,
			})

			digits = []
			digitIndex = []
		}

		numberArray.push(lineNumbers)
		symbolArray.push(lineSymbols)
	}

	return [numberArray, symbolArray]
}

const first = (input: string) => {
	const [numberArray, symbolArray] = inputParser(input)

	const adjacentNums: number[] = []

	for (const [line, symbols] of symbolArray.entries()) {
		if (symbols.length === 0) {
			continue
		}

		for (const symbol of symbols) {
			const linesToCheck = [numberArray[line - 1], numberArray[line], numberArray[line + 1]]
			const IndexToCheck = [symbol.index - 1, symbol.index, symbol.index + 1]

			for (const [line, numbers] of linesToCheck.entries()) {
				numbers.forEach((number) => {
					const isAdjacent = IndexToCheck.some((index) => number.indexes.includes(index))

					if (isAdjacent) {
						// console.log(number.value)
						adjacentNums.push(number.value)
					}
				})
			}
		}
	}

	const sum = adjacentNums.reduce((acc, curr) => acc + curr, 0)

	return sum
}

const expectedFirstSolution = 4361

const second = (input: string) => {
	const [numberArray, symbolArray] = inputParser(input)

	const adjacentNums: number[] = []

	for (const [line, symbols] of symbolArray.entries()) {
		if (symbols.length === 0) {
			continue
		}

		for (const symbol of symbols) {
			const linesToCheck = [numberArray[line - 1], numberArray[line], numberArray[line + 1]]
			const IndexToCheck = [symbol.index - 1, symbol.index, symbol.index + 1]

			const gears: number[] = []

			for (const [line, numbers] of linesToCheck.entries()) {
				numbers.forEach((number) => {
					const isAdjacent = IndexToCheck.some((index) => number.indexes.includes(index))

					if (isAdjacent) {
						// console.log(number.value)
						gears.push(number.value)
					}
				})
			}

			if (gears.length === 2) {
				adjacentNums.push(gears[0] * gears[1])
			}
		}
	}

	const sum = adjacentNums.reduce((acc, curr) => acc + curr, 0)

	return sum
}

const expectedSecondSolution = 467835

export { first, expectedFirstSolution, second, expectedSecondSolution }
