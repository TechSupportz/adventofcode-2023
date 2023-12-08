export const gcd = (a: number, b: number): number => {
	var t = 0
	a < b && ((t = b), (b = a), (a = t)) // swap them if a < b
	t = a % b
	return t ? gcd(b, t) : b
}
