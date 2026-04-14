import { EventEmitter } from './EventEmitter';

export default class Context {
  constructor(options) {
    this.eventCenter = new EventEmitter();

    this.logicList = options.logicList;
  }
}
