export function getData(key, data) {
	let DataDet = localStorage.getItem(key)

	if (DataDet) {
		return (data = JSON.parse(DataDet))
	} else {
		return setData(key, data)
	}
}

export function setData(key, data) {
	localStorage.setItem(key, JSON.stringify(data))
}
