const first = (input: string) => {
	const calValues = input.split("\n")
	const numList: number[] = []

	for (const value of calValues) {
		const digits = value.replace(/\D/g, "").split("")

		if (digits.length === 0) continue

		const number = parseInt(`${digits[0]}${digits.at(-1)}`)
		numList.push(number)
	}

	const sum = numList.reduce((acc, curr) => acc + curr, 0)

	return sum
}

const expectedFirstSolution = 142

const second = (input: string) => {
	const calValues = input.split("\n")
	const numList: number[] = []

	for (const value of calValues) {
		const chars = value.split("")
		let currIndex = 0
		const digits = []

		const checkNumWord = (numWord: string) => {
			return chars.slice(currIndex, currIndex + numWord.length).join("") === numWord
		}

		while (currIndex !== chars.length) {
			switch (chars[currIndex]) {
				case "o": {
					if (checkNumWord("one")) {
						digits.push(1)
						currIndex = currIndex + 2
						continue
					}

					currIndex++
					continue
				}
				case "t": {
					if (checkNumWord("two")) {
						digits.push(2)
						currIndex = currIndex + 2
						continue
					}

					if (checkNumWord("three")) {
						digits.push(3)
						currIndex = currIndex + 4
						continue
					}

					currIndex++
					continue
				}
				case "f": {
					if (checkNumWord("four")) {
						digits.push(4)
						currIndex = currIndex + 3
						continue
					}

					if (checkNumWord("five")) {
						digits.push(5)
						currIndex = currIndex + 3
						continue
					}

					currIndex++
					continue
				}
				case "s": {
					if (checkNumWord("six")) {
						digits.push(6)
						currIndex = currIndex + 2
						continue
					}

					if (checkNumWord("seven")) {
						digits.push(7)
						currIndex = currIndex + 4
						continue
					}

					currIndex++
					continue
				}
				case "e": {
					if (checkNumWord("eight")) {
						digits.push(8)
						currIndex = currIndex + 4
						continue
					}

					currIndex++
					continue
				}
				case "n": {
					if (checkNumWord("nine")) {
						digits.push(9)
						currIndex = currIndex + 3
						continue
					}

					currIndex++
					continue
				}
				case "1":
				case "2":
				case "3":
				case "4":
				case "5":
				case "6":
				case "7":
				case "8":
				case "9": {
					digits.push(parseInt(chars[currIndex]))
					currIndex++
					continue
				}
				default: {
					currIndex++
					continue
				}
			}
		}

		console.log(`${value} <<<`, digits)
		if (digits.length === 0) continue

		const number = parseInt(`${digits[0]}${digits.at(-1)}`)
		numList.push(number)
	}

	const sum = numList.reduce((acc, curr) => acc + curr, 0)

	return sum
}

const expectedSecondSolution = 281

export { first, expectedFirstSolution, second, expectedSecondSolution }
