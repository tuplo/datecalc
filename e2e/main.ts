import { strict as assert } from 'assert';
import datecalc from '@tuplo/datecalc';

const result = datecalc('+2d', new Date('2021-05-12'));

assert.equal(result.toISOString(), '2021-05-12T00:00:00.000Z');
