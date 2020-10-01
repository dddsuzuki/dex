import { EventEmitter, EventCallback } from './event';

export type Context<T> = {
  state: T,
  emit: (event: string) => void,
};

export type Command<T> = (context: Context<T>) => void;

export class Store<T> {
  private state: T;
  private eventEmitter: EventEmitter;

  constructor(state: T) {
    this.state = state;
    this.eventEmitter = new EventEmitter();
  }

  getState(): T {
    return this.state;
  }

  subscribe(event: string, callback: EventCallback) {
    this.eventEmitter.subscribe(event, callback);
  }

  unsubscribe(event: string, callback: EventCallback) {
    this.eventEmitter.unsubscribe(event, callback);
  }

  update(command: Command<T>) {
    const events: string[] = [];

    command({
      state: this.state,
      emit: (event: string) => events.push(event),
    });

    events.forEach(event => {
      this.eventEmitter.emit(event);
    });
  }
}
