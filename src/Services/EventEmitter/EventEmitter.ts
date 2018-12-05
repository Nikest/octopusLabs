const events = {};

export const eventEmitter = () => {
  return {
    htmlEvent: (eventName: string, detail: IData, bubbles: boolean = true) => {
      const event = new CustomEvent(eventName, {bubbles, detail});

      return {
        emitFrom: (elem: HTMLElement | HTMLDocument | Window): void => {
          elem.dispatchEvent(event);
        }
      }
    },
    htmlSubscribe: (elem: HTMLElement, eventName, fn) => {
      elem.addEventListener(eventName, fn)
    },
    on: (eventName: eventNames, fn: Function) => {
      !events[eventName] && (events[eventName] = []);
      events[eventName].push(fn);
    },
    dispatch: (eventName: eventNames, data: any) => {
      events[eventName] && events[eventName].forEach(fn => fn(data))
    }
  }
};

export enum eventNames {
  INPUT_CHANGE = 'input change',
  NEW_ADDRESS = 'new address',
  INPUT_ERROR = 'input has error',
}

interface IData {
  name: string;
  value: any;
}