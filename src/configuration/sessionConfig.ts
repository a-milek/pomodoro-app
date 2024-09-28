export const getSessionConfig = (
  focusTime: number,
  shortBreakTime: number,
  longBreakTime: number
) => ({
  focus: {
    wheelColor: "#A20021",
    text: "Focus Time",
    time: focusTime * 60, // Time in seconds
  },
  shortBreak: {
    wheelColor: "#85BAA1",
    text: "Short Break",
    time: shortBreakTime * 60,
  },
  longBreak: {
    wheelColor: "#6E8894",
    text: "Long Break",
    time: longBreakTime * 60,
  },
});
