export const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const MONTHS_ABBR = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const VIEWS = ["month", "week"];

interface Day {
  date: Date;
  name: string;
}

interface IGregorian {
  start?: Date | null;
  end?: Date | null;
  $active: Date;
  $matrix?: Day[][] | null;
  $view?: string | null;
}

class Gregorian implements IGregorian {
  // private variables
  $start?: Date | null;
  $end?: Date | null;
  $active: Date;
  $matrix?: Day[][] | null;
  $view?: string | null;

  constructor(date: Date) {
    this.$start = null;
    this.$end = null;
    this.$active = date || new Date();
    this.$matrix = null;
    [this.$view] = VIEWS;
  }

  getWeekHeaders() {
    return DAYS;
  }

  getMonthHeaders() {
    return MONTHS;
  }

  getStart() {
    return this.$start;
  }

  setStart(date: Date) {
    this.$start = date;
  }

  getEnd() {
    return this.$end;
  }

  setEnd(date: Date) {
    this.$end = date;
  }

  getActive() {
    return this.$active;
  }

  setActive(date: Date) {
    this.$active = date;
  }

  getActiveWeek() {
    return DAYS[this.$active.getDay()];
  }

  getActiveMonth() {
    return MONTHS[this.$active.getMonth()];
  }

  getActiveYear() {
    return this.$active.getFullYear();
  }

  getMatrix() {
    return this.$matrix;
  }

  setMatrix(matrix: Day[][]) {
    this.$matrix = matrix;
  }

  getView() {
    return this.$view;
  }

  setView(view: string) {
    if (VIEWS.includes(view)) {
      this.$view = view;
      this.renderCalendar();
    }
  }

  monthView(): Boolean {
    return this.getView() === "month";
  }

  weekView(): Boolean {
    return this.getView() === "week";
  }

  /** Reset matrix based on provided date */
  setMonth(date: Date) {
    this.setActive(
      new Date(date.getFullYear(), date.getMonth(), date.getDate())
    );
    this.renderCalendar();
  }

  /** Increment active date by one month */
  setNextMonth() {
    const date = this.getActive();
    const nextMonth = new Date(date.setMonth(date.getMonth() + 1));
    this.setActive(new Date(nextMonth.getFullYear(), nextMonth.getMonth()));
    this.renderCalendar();
  }

  /** Decrement active date by one month */
  setPrevMonth() {
    const date = this.getActive();
    const prevMonth = new Date(date.setMonth(date.getMonth() - 1));
    this.setActive(new Date(prevMonth.getFullYear(), prevMonth.getMonth()));
    this.renderCalendar();
  }

  /** Increment active date by one week */
  setNextWeek() {
    const date = this.getActive();
    this.setActive(
      new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7)
    );
    this.renderCalendar();
  }

  /** Decrement active date by one week */
  setPrevWeek() {
    const date = this.getActive();
    this.setActive(
      new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7)
    );
    this.renderCalendar();
  }

  /** Get number of days in a given month */
  numMonthDays(month: number, year: number): number {
    // Month is Apr, Jun, Sept, Nov return 30 days
    if ([3, 5, 8, 10].includes(month)) return 30;
    // Month is not Feb return 31 days
    if (month !== 1) return 31;
    // Month is Feb - leap year then Feb has 29 days
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) return 29;
    // Not a leap year. Feb has 28 days.
    return 28;
  }

  /** Get object to build calendar from */
  renderCalendar() {
    const active = this.getActive() || new Date();
    const size = this.numMonthDays(active.getMonth(), active.getFullYear());
    const rowLength = 7;
    const lastDay = new Date(active.getFullYear(), active.getMonth() + 1, 0);
    const rowMod = lastDay.getDay() < 2 ? 2 : 1;
    const numRows = this.monthView() ? Math.floor(size / 7) + rowMod : 1;

    // // get month start ~ first day of calendar month
    const first = new Date(active.getFullYear(), active.getMonth(), 1);
    // get start date based on the interval (1 month or 7 days)
    const target = this.monthView() ? first : active;
    const offset = this.monthView() ? 1 : active.getDate();
    let start = new Date(
      target.getFullYear(),
      target.getMonth(),
      offset - target.getDay()
    );

    this.setStart(start);

    const calendar = new Array(numRows) as Day[][];
    for (let x = 0; x < calendar.length; x++) {
      const row = new Array(rowLength);
      for (let y = 0; y < row.length; y++) {
        const current = new Date(
          start.getFullYear(),
          start.getMonth(),
          start.getDate() + y
        );
        row[y] = {
          date: current,
          name: DAYS[current.getDay()],
        };
      }

      start = new Date(
        start.getFullYear(),
        start.getMonth(),
        start.getDate() + 7
      );

      calendar[x] = row;
    }

    this.setEnd(calendar[numRows - 1][rowLength - 1].date);
    this.setMatrix(calendar);
  }
}

export default Gregorian;
