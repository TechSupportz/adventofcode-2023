import { gcd } from "./gcd"

export const lcm = (a: number, b: number) => {
	return (a / gcd(a, b)) * b
}
