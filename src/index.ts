import Gregorian from "./utils/gregorian";
// # TODO: implement
// import Calendar from "./react/Calendar";

const now = new Date();
const gregorian = new Gregorian(now);

export default { gregorian, Gregorian };
