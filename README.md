# datecalc

<p>
  <img src="https://packagephobia.now.sh/badge?p=@tuplo/datecalc" alt="install size">
  <img src="https://david-dm.org/tuplo/datecalc.svg">
</p>

Perform date calculations given a simple string pattern.

## Install

```bash
$ npm install @tuplo/datecalc

# or with yarn
$ yarn add @tuplo/datecalc
```

## Usage

```ts
import datecalc from '@tuplo/datecalc';
```

**Performs calculations assuming now by default**

```ts
// assuming New Year's Day 2020, 14:00
// in two days, same time
datecalc('2D'); // → new Date('2020-01-03T14:00:00')

// two weeks ago
datecalc('-2W'); // → new Date('2019-12-18T14:00:00')

// in 15 minutes
datecalc('15m'); // → new Date('2020-01-01T14:15:00')

// tomorrow, two hours less than now
datecalc('1D -2h'); // → new Date('2020-01-02T12:00:00')
```

**Performs sucessive calculations**

```ts
// 58 years and 2 months from now, less 4 hours
datecalc('58Y 2M -4h'); // → new Date('2078-03-01T10:00:00')
```

**Calculates from a given date**

```ts
const birthday = new Date('1961-07-04T11:00:00');
// 58 years from birthday
datecaclc('58Y', birthday); // → new Date('2019-07-04T11:00:00')
```

### Accepted patterns

| Pattern | Period |
| ------- | ------ |
| D       | Day    |
| W       | Week   |
| M       | Month  |
| Y       | Year   |
| h       | Hour   |
| m       | Minute |
| s       | Second |

## API

### datecalc(format: string, fromDate?: Date): Date

#### pattern: _string_

The pattern declaring what calculations to perform.

_Format: /([0-9-]+[DWMYhms])/g_

#### fromDate: _Date_

The starting moment from when to start calculating.

_Default: new Date(Date.now())_

#### Return value: Date

Returns a new Date

## Contribute

Contributions are always welcome!

## License

MIT
