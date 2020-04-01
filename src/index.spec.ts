import datecalc from '.';

describe(`datecalc`, () => {
  const dateNowSpy = jest.spyOn(Date, `now`).mockReturnValue(1582894299000);

  afterAll(() => {
    dateNowSpy.mockRestore();
  });

  it(`returns current date if pattern is wrong`, () => {
    expect.assertions(3);
    const patterns = [`1X`, `foo`, `bar`];
    const expected = new Date(`2020-02-28T12:51:39`);
    patterns.forEach((pattern) => {
      const result = datecalc(pattern);
      expect(result).toStrictEqual(expected);
    });
  });

  it(`calculates dates in the future`, () => {
    expect.assertions(5);
    const patterns = [`1D`, `3D`, `4W`, `9M`, `23Y`];
    // 2020-02-28T12:51:39.000Z
    const expected = [
      `2020-02-29T12:51:39.000Z`,
      `2020-03-02T12:51:39.000Z`,
      `2020-03-27T12:51:39.000Z`,
      `2020-11-28T12:51:39.000Z`,
      `2043-02-28T12:51:39.000Z`,
    ].map((d) => new Date(d));
    patterns.forEach((pattern, i) => {
      const result = datecalc(pattern);
      expect(result).toStrictEqual(expected[i]);
    });
  });

  it(`calculates dates in the past`, () => {
    expect.assertions(5);
    const patterns = [`-1D`, `-3D`, `-4W`, `-9M`, `-23Y`];
    // 2020-02-28T12:51:39.000Z
    const expected = [
      `2020-02-27T12:51:39.000Z`,
      `2020-02-25T12:51:39.000Z`,
      `2020-01-31T12:51:39.000Z`,
      `2019-05-28T12:51:39.000Z`,
      `1997-02-28T12:51:39.000Z`,
    ].map((d) => new Date(d));
    patterns.forEach((pattern, i) => {
      const result = datecalc(pattern);
      expect(result).toStrictEqual(expected[i]);
    });
  });

  it(`calculates times in the future`, () => {
    expect.assertions(3);
    const patterns = [`17h`, `34m`, `40000s`];
    // 2020-02-28T12:51:39.000Z
    const expected = [
      `2020-02-29T05:51:39.000Z`,
      `2020-02-28T13:25:39.000Z`,
      `2020-02-28T23:58:19.000Z`,
    ].map((d) => new Date(d));
    patterns.forEach((pattern, i) => {
      const result = datecalc(pattern);
      expect(result).toStrictEqual(expected[i]);
    });
  });

  it(`calculates times in the past`, () => {
    expect.assertions(3);
    const patterns = [`-17h`, `-34m`, `-40000s`];
    // 2020-02-28T12:51:39.000Z
    const expected = [
      `2020-02-27T19:51:39.000Z`,
      `2020-02-28T12:17:39.000Z`,
      `2020-02-28T01:44:59.000Z`,
    ].map((d) => new Date(d));
    patterns.forEach((pattern, i) => {
      const result = datecalc(pattern);
      expect(result).toStrictEqual(expected[i]);
    });
  });

  it(`calculates dates with successive date operations`, () => {
    expect.assertions(3);
    const patterns = [`1D1h`, `2W-1h`, `2W -1h`];
    // 2020-02-28T12:51:39.000Z
    const expected = [
      `2020-02-29T13:51:39.000Z`,
      `2020-03-13T11:51:39.000Z`,
      `2020-03-13T11:51:39.000Z`,
    ].map((d) => new Date(d));
    patterns.forEach((pattern, i) => {
      const result = datecalc(pattern);
      expect(result).toStrictEqual(expected[i]);
    });
  });

  it(`calculates dates from a given date`, () => {
    expect.assertions(3);
    const patterns = [`4W`, `1Y -4M`, `13h -30m`];
    const expected = [
      `2020-03-08T19:00:00.000Z`,
      `2020-10-09T19:00:00.000Z`,
      `2020-02-10T07:30:00.000Z`,
    ].map((d) => new Date(d));
    patterns.forEach((pattern, i) => {
      const fromDate = new Date(`2020-02-09T19:00:00.000Z`);
      const result = datecalc(pattern, fromDate);
      expect(result).toStrictEqual(expected[i]);
    });
  });
});
