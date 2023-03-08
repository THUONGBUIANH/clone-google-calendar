import dayjs from "dayjs";
import { createSignal, createEffect, For } from "solid-js";
import {
  setDaySelected,
  setShowEventModal,
  filteredEvents,
  setSelectedEvent,
} from "../store";

export default function Day({ day, rowIdx }) {
  const [dayEvents, setDayEvents] = createSignal([]);

  createEffect(() => {
    const events = filteredEvents().filter(
      (evt) => dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY")
    );

    setDayEvents(events);
  });

  function getCurrentDayClass() {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "bg-blue-600 text-white rounded-full w-7"
      : "";
  }

  return (
    <div class="border border-gray-200 flex flex-col">
      <header class="flex flex-col items-center">
        {rowIdx === 0 && (
          <p class="text-sm mt-1">{day.format("ddd").toUpperCase()}</p>
        )}
        <p class={`text-sm p-1 my-1 text-center  ${getCurrentDayClass()}`}>
          {day.format("DD")}
        </p>
      </header>
      <div
        class="flex-1 cursor-pointer"
        onClick={() => {
          setDaySelected(day);
          setShowEventModal(true);
        }}
      >
        <For each={dayEvents()}>
          {(evt) => (
            <div
              onClick={() => setSelectedEvent(evt)}
              class={`bg-${evt.label}-200 p-1 mr-3 text-gray-600 text-sm rounded mb-1 truncate`}
            >
              {evt.title}
            </div>
          )}
        </For>
      </div>
    </div>
  );
}
