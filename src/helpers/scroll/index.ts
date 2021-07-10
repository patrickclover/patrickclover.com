const handleScroll = () => {
	const scrollTop = document.body.scrollTop
		? document.body.scrollTop
		: document.documentElement.scrollTop
	const newPos = `${scrollTop}px`

	document.documentElement.style.setProperty("--scrollPos", newPos)
}


export default handleScroll