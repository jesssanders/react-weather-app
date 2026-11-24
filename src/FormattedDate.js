import React from "react";
import "./App.css";

function getDateAndTime(props) {
  const givenFullDate = props.date;
  let givenDay = givenFullDate.getDay();
  let givenDate = givenFullDate.getDate();
  let givenMonth = givenFullDate.getMonth();
  let givenHour = givenFullDate.getHours();
  let givenMinutes = givenFullDate.getMinutes();

  let months = [
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

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[givenDay];
  let date = givenDate;
  let month = months[givenMonth];

  let formattedMinutes = givenMinutes < 10 ? `0${givenMinutes}` : givenMinutes;
  let minute = formattedMinutes;

  let hour = "";
  let ampm = "";
  if (givenHour > 12) {
    let hours12 = givenHour % 12;
    hour = hours12;
    ampm = "pm";
  } else if (givenHour === 12) {
    hour = givenHour;
    ampm = "pm";
  } else {
    givenHour = givenHour === 0 ? 12 : givenHour;
    hour = givenHour;
    ampm = "am";
  }

  return { day, date, month, hour, minute, ampm };
}

export function FormattedTime(props) {
  const date = getDateAndTime(props);
  return (
    <div className="time">
      <span>{date.hour}</span>:<span>{date.minute}</span>{" "}
      <span>{date.ampm}</span>
    </div>
  );
}

export function FormattedDate(props) {
  const date = getDateAndTime(props);
  return (
    <div className="date">
      <span>{date.day}</span> <span>{date.date}</span> <span>{date.month}</span>
    </div>
  );
}
