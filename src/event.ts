export type EventCallback = () => void;

export class EventEmitter {
  private events: Map<string, Set<EventCallback>>;

  constructor() {
    this.events = new Map();
  }

  subscribe(event: string, callback: EventCallback): void {
    let callbacks = this.events.get(event);

    if (!callbacks) {
      callbacks = new Set();
      this.events.set(event, callbacks);
    }

    callbacks.add(callback);
  }

  unsubscribe(event: string, callback: EventCallback): void {
    const callbacks = this.events.get(event);

    if (!callbacks) {
      return;
    }

    callbacks.delete(callback);
  }

  emit(event: string): void {
    const callbacks = this.events.get(event);

    if (!callbacks) {
      return;
    }

    callbacks.forEach(callback => {
      callback();
    });
  }
}
