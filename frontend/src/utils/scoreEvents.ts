// Event emitter changes score in sidebar in real time

type ScoreUpdateListener = () => void;

class ScoreEventEmitter {
  private listeners: ScoreUpdateListener[] = [];

  subscribe(listener: ScoreUpdateListener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  emit() {
    this.listeners.forEach((listener) => listener());
  }
}

export const scoreEvents = new ScoreEventEmitter();
