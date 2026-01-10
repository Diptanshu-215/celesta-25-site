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
    <div className={`bg-muted flex flex-col min-h-screen gap-8 items-start justify-center w-full overflow-x-hidden px-4 sm:px-6 md:px-10 ${styles.background} text-white`}>

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
