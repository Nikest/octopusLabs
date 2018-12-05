import { addressType } from './type';

export const dataProcess = (data): addressType => {

  const address = data.address.filter(a => a !== '').join(', ');
  let period = '';

  const year = data.period[0];
  const month = data.period[1];

  if(year === Infinity) {
    period = 'more than 3 years';
    return {address, period}
  }

  if(year === 0 && month === 0) {
    period = 'less than month';
    return {address, period}
  }

  period = `${year} year${year > 1 ? 's' : ''}`;
  period += month > 0 ? `, ${month} month${month > 1 ? 's' : ''}` : '';

  return {address, period}
};