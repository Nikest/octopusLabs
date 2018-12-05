export function checkErrors({ period, postcode, addresses, address }) {
  const errors = [];
  const types = {};

  if(addresses.length > 0 && address.length === 0) {
    return {msg: 'Please select your address', addresses: true};
  }

  if(period[0] === null && period[1] === null) {
    errors.push('time period');
    types['period'] = true;
  }

  if(postcode.replace(/ +/g, '') === '') {
    errors.push('postcode');
    types['postcode'] = true;
  }

  if(errors.length > 0) {
    return {msg: `Please type a ${errors.join(' and ')}`, ...types};
  }

  return false;
}