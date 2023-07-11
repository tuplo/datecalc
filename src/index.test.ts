import expect from "node:assert/strict";
import { describe, it, mock } from "node:test";

import datecalc from "./index";

describe("datecalc", () => {
	mock.method(Date, "now", () =>
		new Date("2020-02-28T12:51:39.000Z").getTime()
	);

	[
		["1X", "2020-02-28T12:51:39"],
		["foo", "2020-02-28T12:51:39"],
		["bar", "2020-02-28T12:51:39"],
	].forEach((fixture) => {
		const [pattern] = fixture as [string, Date];
		const expected = new Date(fixture[1]);

		it(`returns current date if pattern is wrong: ${pattern}`, () => {
			const actual = datecalc(pattern);
			expect.deepEqual(actual, expected);
		});
	});

	[
		["1D", "2020-02-29T12:51:39.000Z"],
		["3D", "2020-03-02T12:51:39.000Z"],
		["4W", "2020-03-27T12:51:39.000Z"],
		["9M", "2020-11-28T12:51:39.000Z"],
		["23Y", "2043-02-28T12:51:39.000Z"],
		["17h", "2020-02-29T05:51:39.000Z"],
		["34m", "2020-02-28T13:25:39.000Z"],
		["40000s", "2020-02-28T23:58:19.000Z"],
	].forEach((fixture) => {
		const [pattern] = fixture as [string, Date];
		const expected = new Date(fixture[1]);

		it(`calculates dates in the future: ${pattern}`, () => {
			const actual = datecalc(pattern);
			expect.deepEqual(actual, expected);
		});
	});

	[
		["1D1h", "2020-02-29T13:51:39.000Z"],
		["2W-1h", "2020-03-13T11:51:39.000Z"],
		["2W -1h", "2020-03-13T11:51:39.000Z"],
	].forEach((fixture) => {
		const [pattern] = fixture as [string, Date];
		const expected = new Date(fixture[1]);

		it(`calculates dates with successive date operations: ${pattern}`, () => {
			const actual = datecalc(pattern);
			expect.deepEqual(actual, expected);
		});
	});

	[
		["4W", "2020-03-08T19:00:00.000Z"],
		["1Y -4M", "2020-10-09T19:00:00.000Z"],
		["13h -30m", "2020-02-10T07:30:00.000Z"],
	].forEach((fixture) => {
		const [pattern] = fixture as [string, Date];
		const expected = new Date(fixture[1]);

		it(`calculates dates from a given date: ${pattern}`, () => {
			const fromDate = new Date("2020-02-09T19:00:00.000Z");
			const actual = datecalc(pattern, fromDate);

			expect.deepEqual(actual, expected);
		});
	});
});
