function datecalc(pattern: string, fromDate: Date = new Date(Date.now())) {
	const match = pattern.match(/([0-9-]+[DWMYhms])/g);
	if (!match) return fromDate;
	return match
		.map((period) => period.match(/([0-9-]+)([DWMYhms])/))
		.map((periodMatch) => (periodMatch ? periodMatch.slice(1) : []))
		.map(([number, unit]): [number, string] => [Number(number), unit])
		.reduce((date, [number, unit]) => {
			switch (unit) {
				case "D":
					date.setDate(date.getDate() + number);
					break;
				case "W":
					date.setDate(date.getDate() + number * 7);
					break;
				case "M":
					date.setMonth(date.getMonth() + number);
					break;
				case "Y":
					date.setFullYear(date.getFullYear() + number);
					break;
				case "h":
					date.setTime(date.getTime() + number * 60 * 60 * 1000);
					break;
				case "m":
					date.setTime(date.getTime() + number * 60 * 1000);
					break;
				case "s":
					date.setTime(date.getTime() + number * 1000);
					break;
				default:
			}

			return new Date(date.getTime() - date.getTimezoneOffset() * 60000);
		}, fromDate);
}

export default datecalc;
