import { Config } from '../Config';
import * as Store from 'Services/Store';

export const getAddress = function (postcode: string) {
  const pc = postcode.replace(/ +/g, '');
  const apikey = Config.get('API_KEY');
  const url = `https://api.getAddress.io/find/${pc}?api-key=${apikey}`;

  const processingData = (data) => {
    return data.addresses.map(address => address.split(', '));
  }

  const existProcess = (storeData) => {
    return (onSuccess, onError?) => {
      const data = JSON.parse(storeData);
      onSuccess(processingData(data));
    }
  };

  const newProcess = () => {
    return (onSuccess, onError) => {
      return new Promise((res, rej) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);

        xhr.onreadystatechange = () => {
          if(xhr.readyState === 4) {

            const data = JSON.parse(xhr.response);

            if(data.Message) {
              rej(data.Message);
              return false;
            }

            Store.set(pc, xhr.response);
            res(data);
          }
        };

        xhr.send();

      }).then((data: any) => {
        onSuccess(processingData(data));
      }).catch((error) => {
        onError(error);
      })
    }
  };

  return Store.checkAndDo(pc, existProcess, newProcess);
};
