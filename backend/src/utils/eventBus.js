import { EventEmitter } from "events";

const eventBus = new EventEmitter();

// Prevent memory leak warnings for many listeners
eventBus.setMaxListeners(20);

// ── STEP 5: Global event logging ───────────────────────────────────────────
// Wraps emit() so every event is traceable in logs — no infinite loop risk
// because we call the original EventEmitter.emit directly.
const _originalEmit = eventBus.emit.bind(eventBus);

eventBus.emit = (eventName, payload) => {
  console.log(`[EVENT] ${eventName}`, payload
    ? JSON.stringify(payload, null, 0).slice(0, 200)  // cap log length
    : ""
  );
  return _originalEmit(eventName, payload);
};

export default eventBus;
