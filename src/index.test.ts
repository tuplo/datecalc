import datecalc from "./index";

describe("datecalc", () => {
	// 2020-02-28T12:51:39.000Z
	const dateNowSpy = vi
		.spyOn(Date, "now")
		.mockReturnValue(new Date("2020-02-28T12:51:39.000Z").getTime());

	afterAll(() => {
		dateNowSpy.mockRestore();
	});

	it.each([
		["1X", new Date("2020-02-28T12:51:39")],
		["foo", new Date("2020-02-28T12:51:39")],
		["bar", new Date("2020-02-28T12:51:39")],
	])("returns current date if pattern is wrong - %s", (pattern, expected) => {
		expect.assertions(1);
		const actual = datecalc(pattern);

		expect(actual).toStrictEqual(expected);
	});

	it.each([
		["1D", "2020-02-29T12:51:39.000Z"],
		["3D", "2020-03-02T12:51:39.000Z"],
		["4W", "2020-03-27T12:51:39.000Z"],
		["9M", "2020-11-28T12:51:39.000Z"],
		["23Y", "2043-02-28T12:51:39.000Z"],
		["17h", "2020-02-29T05:51:39.000Z"],
		["34m", "2020-02-28T13:25:39.000Z"],
		["40000s", "2020-02-28T23:58:19.000Z"],
	])("calculates dates in the future - %s", (pattern, expected) => {
		expect.assertions(1);
		const actual = datecalc(pattern);

		expect(actual).toStrictEqual(new Date(expected));
	});

	it.each([
		["-1D", "2020-02-27T12:51:39.000Z"],
		["-3D", "2020-02-25T12:51:39.000Z"],
		["-4W", "2020-01-31T12:51:39.000Z"],
		["-9M", "2019-05-28T12:51:39.000Z"],
		["-23Y", "1997-02-28T12:51:39.000Z"],
		["-17h", "2020-02-27T19:51:39.000Z"],
		["-34m", "2020-02-28T12:17:39.000Z"],
		["-40000s", "2020-02-28T01:44:59.000Z"],
	])("calculates dates in the past - %s", (pattern, expected) => {
		const actual = datecalc(pattern);

		expect(actual).toStrictEqual(new Date(expected));
	});

	it.each([
		["1D1h", "2020-02-29T13:51:39.000Z"],
		["2W-1h", "2020-03-13T11:51:39.000Z"],
		["2W -1h", "2020-03-13T11:51:39.000Z"],
	])(
		"calculates dates with successive date operations - %s",
		(pattern, expected) => {
			const actual = datecalc(pattern);

			expect(actual).toStrictEqual(new Date(expected));
		}
	);

	it.each([
		["4W", "2020-03-08T19:00:00.000Z"],
		["1Y -4M", "2020-10-09T19:00:00.000Z"],
		["13h -30m", "2020-02-10T07:30:00.000Z"],
	])("calculates dates from a given date - %s", (pattern, expected) => {
		const fromDate = new Date("2020-02-09T19:00:00.000Z");
		const actual = datecalc(pattern, fromDate);

		expect(actual).toStrictEqual(new Date(expected));
	});
});
