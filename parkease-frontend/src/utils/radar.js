import Radar from "radar-sdk-js";

let initialized = false;

export function initRadar() {
  if (initialized) return;
  const key = import.meta.env.VITE_RADAR_PUBLISHABLE_KEY;
  if (!key) {
    console.error("Radar key missing");
    return;
  }
  Radar.initialize(key);
  initialized = true;
}
