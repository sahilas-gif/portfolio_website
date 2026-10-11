import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function Ambience() {
  const audio = useRef<AudioContext | null>(null);
  const busy = useRef(false);
  const [active, setActive] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    const muteWhenHidden = () => {
      if (document.hidden) {
        void audio.current?.close().catch(() => undefined);
        audio.current = null;
        setActive(false);
      }
    };
    document.addEventListener("visibilitychange", muteWhenHidden);
    return () => {
      document.removeEventListener("visibilitychange", muteWhenHidden);
      void audio.current?.close().catch(() => undefined);
    };
  }, []);
  const toggle = async () => {
    if (busy.current) return;
    busy.current = true;
    try {
      setError("");
      if (audio.current) {
        await audio.current.close();
        audio.current = null;
        setActive(false);
        return;
      }
      const context = new AudioContext();
      audio.current = context;
      const gain = context.createGain();
      gain.gain.setValueAtTime(0, context.currentTime);
      gain.gain.linearRampToValueAtTime(0.035, context.currentTime + 2);
      gain.connect(context.destination);
      [55, 82.41, 110.2].forEach((frequency) => {
        const oscillator = context.createOscillator();
        oscillator.type = "sine";
        oscillator.frequency.value = frequency;
        oscillator.connect(gain);
        oscillator.start();
      });
      await context.resume();
      if (audio.current === context) setActive(true);
    } catch {
      void audio.current?.close().catch(() => undefined);
      audio.current = null;
      setActive(false);
      setError("Audio unavailable in this browser.");
    } finally {
      busy.current = false;
    }
  };
  return (
    <div className="ambience-control">
      <button
        type="button"
        className="quiet-control"
        onClick={() => void toggle()}
        aria-pressed={active}
      >
        {active ? <Volume2 size={14} /> : <VolumeX size={14} />}
        <span>Ambience {active ? "on" : "off"}</span>
      </button>
      <span className="sr-only" role="status">
        {error}
      </span>
    </div>
  );
}
