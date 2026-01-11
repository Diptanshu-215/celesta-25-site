"use client";

import { useState } from "react";
import EventCard from "./event-card";
import EventModal from "./event-modal";
import styles from "./Events.module.css";
import data from "./events.json";

export default function Events() {
  const events = data.events;
  const [selectedEvent, setSelectedEvent] = useState(null);

  return (
    <div className={`bg-muted flex flex-col min-h-screen gap-8 items-start justify-center w-full overflow-x-hidden px-4 sm:px-6 md:px-10 pb-40 ${styles.background} text-white relative`}>
      <div className="absolute inset-0 z-0 opacity-50 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,white_100%)] pointer-events-none">
        <svg className="absolute inset-0 h-full w-full text-white" aria-hidden="true">
          <defs>
            <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M32 0H0V32" fill="none" stroke="currentColor" strokeWidth="0.5"></path>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)"></rect>
        </svg>
      </div>

      <h1 className="race font-bold text-5xl md:text-7xl text-center mb-12 mt-[15vh] bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 w-full uppercase">
        EVENTS
      </h1>

      <div className="flex flex-wrap justify-center items-center gap-8 w-full">
        {events.map((event, idx) => (
          <EventCard
            key={idx}
            event={event}
            onClick={() => setSelectedEvent(event)}
          />
        ))}
      </div>

      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
}
