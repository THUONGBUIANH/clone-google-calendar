import type { Component } from "solid-js";
import { createSignal, createEffect } from "solid-js";
import { getDaysMatrix } from "./utils";
import CalendarHeader from "./components/CalendarHeader";
import Month from "./components/Month";
import { monthIndex } from "./store";

const App: Component = () => {
  const [currenMonth, setCurrentMonth] = createSignal(getDaysMatrix());

  createEffect(() => {
    setCurrentMonth(getDaysMatrix(monthIndex()));
  });

  return (
    <>
      <div class="h-screen flex flex-col">
        <CalendarHeader />
        <div class="flex flex-1">
          <Month month={currenMonth} />
        </div>
      </div>
    </>
  );
};

export default App;
