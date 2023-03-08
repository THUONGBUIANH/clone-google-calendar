import { createSignal, createEffect, createMemo } from "solid-js";
import { createMutable } from "solid-js/store";
import dayjs from "dayjs";
import { CalendarEvent } from "./types";

export const [monthIndex, setMonthIndex] = createSignal(dayjs().month());
export const [smallCalendarMonth, setSmallCalendarMonth] = createSignal(null);
export const [daySelected, setDaySelected] = createSignal(dayjs());
export const [showEventModal, setShowEventModal] = createSignal(false);
export const [selectedEvent, setSelectedEvent] = createSignal(null);
export const [labels, setLabels] = createSignal([]);

export const savedEvents = createMutable({
  events: JSON.parse(localStorage.getItem("events") || "[]"),
  addEvent(event: CalendarEvent) {
    this.events.push(event);
    localStorage.setItem("events", JSON.stringify(this.events));
  },
  updateEvent(event: CalendarEvent) {
    this.events.map((e: CalendarEvent) => {
      if (e.id === event.id) {
        return event;
      }
      return e;
    });
    localStorage.setItem("events", JSON.stringify(this.events));
  },
  deleteEvent(event: CalendarEvent) {
    this.events = this.events.filter((e: CalendarEvent) => e.id !== event.id);
    localStorage.setItem("events", JSON.stringify(this.events));
  },
});

createEffect(() => {
  if (smallCalendarMonth() !== null) {
    setMonthIndex(smallCalendarMonth());
  }
});

createEffect(() => {
  if (!showEventModal()) {
    setSelectedEvent(null);
  }
});

export const filteredEvents = createMemo(() => {
  return savedEvents.events.filter((evt: CalendarEvent) =>
    labels()
      .filter((lbl) => lbl.checked)
      .map((lbl) => lbl.label)
      .includes(evt.label)
  );
});
