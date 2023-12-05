const inputParser = (input: string): [number[], Record<string, number[][]>] => {
	const split = input.split("\n\n")

	const seeds = split[0]
		.split(": ")[1]
		.split(" ")
		.map((seed) => parseInt(seed))

	const maps: Record<string, number[][]> = {}

	split.splice(0, 1)

	split.forEach((item) => {
		const mapping = item.split(" map:")

		// console.log(mapping)

		maps[mapping[0]] = mapping[1]
			.split("\n")
			.map((range) =>
				range
					.trim()
					.split(" ")
					.map((num) => parseInt(num)),
			)
			.toSpliced(0, 1)
	})

	return [seeds, maps]
}

const first = (input: string) => {
	const [seeds, maps] = inputParser(input)

	for (const mapping of Object.values(maps)) {
		for (const [index, seed] of seeds.entries()) {
			for (const ranges of mapping) {
				const dst = ranges[0]
				const src = ranges[1]
				const rangeLen = ranges[2]

				if (seed >= src && seed < src + rangeLen) {
					const diff = Math.abs(seed - src)
					seeds.splice(index, 1, dst + diff)
					break
				}
			}
		}
	}

	return Math.min(...seeds)
}

const expectedFirstSolution = 35

const second = (input: string) => {
	const [seeds, maps] = inputParser(input)
	let minVal = Infinity

	for (let i = 0; i < seeds.length; i += 2) {
		const start = seeds[i]
		const range = seeds[i + 1]

		for (let seed = start; seed < start + range; seed++) {
			let mapped = seed
			for (const mapping of Object.values(maps)) {
				for (const ranges of mapping) {
					const dst = ranges[0]
					const src = ranges[1]
					const rangeLen = ranges[2]
					if (mapped >= src && mapped < src + rangeLen) {
						const diff = Math.abs(mapped - src)
						mapped = diff + dst
						break
					}
				}
			}

			minVal = Math.min(minVal, mapped)
		}
	}

	return minVal
}

const expectedSecondSolution = 46

export { first, expectedFirstSolution, second, expectedSecondSolution }
