import { jest } from '@jest/globals';
import { testDatecalc } from './main-ts';

describe('datecalc', () => {
  // 2020-02-28T12:51:39.000Z
  const dateNowSpy = jest.spyOn(Date, 'now').mockReturnValue(1582894299000);

  afterAll(() => {
    dateNowSpy.mockRestore();
  });

  it('is testable with Jest and JavaScript', () => {
    expect.assertions(1);
    const result = testDatecalc('1X');
    const expected = new Date('2020-02-28T12:51:39');
    expect(result).toStrictEqual(expected);
  });
});
