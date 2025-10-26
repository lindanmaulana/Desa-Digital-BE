export const removeUndefined = (obj: any) => {
	return Object.fromEntries(
		Object.fromEntries(obj).filter(([_, v]: [string, any]) => v !== undefined)
	)
}
