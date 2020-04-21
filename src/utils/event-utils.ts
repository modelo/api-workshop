type Listener = (...args: any[]) => void;

class EventEmitter {
  private _events: { [ev: string]: Listener[] } = {};

  public on(event: string, listener: Listener) {
    if (!this._events[event]) {
      this._events[event] = [];
    }

    this._events[event].push(listener);

    return () => this.off(event, listener);
  }

  public off(event: string, listener: Listener) {
    if (!this._events[event]) return;

    const index = this._events[event].findIndex(l => l === listener);

    if (index > -1) {
      this._events[event].splice(index, 1);
    }
  }

  public emit(event: string, ...args: any[]) {
    if (!this._events[event]) return;

    this._events[event].forEach(listener => {
      listener(...args);
    });
  }

  public once(event: string, listener: Listener) {
    this.on(event, (...args: any[]) => {
      listener(...args);
      this.off(event, listener);
    });
  }

  public clearAll() {
    this._events = {};
  }
}

export default EventEmitter;
