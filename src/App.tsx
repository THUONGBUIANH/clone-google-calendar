import type { Component } from "solid-js";
import { getDaysMatrix } from "./utils";
import CalendarHeader from "./components/CalendarHeader";

const App: Component = () => {
  console.log(getDaysMatrix());
  return (
    <>
      <div class="h-screen flex flex-col">
        <CalendarHeader />
        <div class="flex flex-1"></div>
      </div>
    </>
  );
};

export default App;
