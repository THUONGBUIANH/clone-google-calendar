import dayjs from "dayjs";
import logo from "../assets/logo.png";
import { createSignal } from "solid-js";
import { DATE_FORMAT } from "../constants";

export default function CalendarHeader() {
  const [monthIndex, setMonthIndex] = createSignal(0);
  function handlePrevMonth() {
    setMonthIndex(monthIndex() - 1);
  }
  function handleNextMonth() {
    setMonthIndex(monthIndex() + 1);
  }
  function handleReset() {
    console.log(monthIndex() + Math.random());
    setMonthIndex(dayjs().month());
  }
  return (
    <header class="px-4 py-2 flex items-center">
      <img src={logo} alt="calendar" class="mr-2 w-12 h-12" />
      <h1 class="mr-10 text-xl text-gray-500 fond-bold">Calendar</h1>
      <button onClick={handleReset} class="border rounded py-2 px-4 mr-5">
        Today
      </button>
      <button onClick={handlePrevMonth}>
        <span class="material-icons-outlined cursor-pointer text-gray-600 mx-2">
          chevron_left
        </span>
      </button>
      <button onClick={handleNextMonth}>
        <span class="material-icons-outlined cursor-pointer text-gray-600 mx-2">
          chevron_right
        </span>
      </button>
      <h2 class="ml-4 text-xl text-gray-500 font-bold">
        {dayjs(new Date(dayjs().year(), monthIndex())).format(
          DATE_FORMAT.MMMMYYYY
        )}
      </h2>
    </header>
  );
}
