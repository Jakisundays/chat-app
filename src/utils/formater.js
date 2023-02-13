export const getDate = (timestamp) => {
  let d;
  let formattedTimestamp;
  if (timestamp) {
    d = new Date(timestamp);
  } else {
    d = new Date();
  }
  const hours = d.getHours();
  const minutes = d.getMinutes();
  const day = d.getDate();
  const month = d.getMonth();
  const year = d.getFullYear();
  const months = [
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
  if (minutes < 10) {
    formattedTimestamp =
      hours +
      ":0" +
      minutes +
      ", " +
      months[month] +
      ", " +
      day +
      ", " +
      year.toString().slice(2);
  } else {
    formattedTimestamp =
      hours +
      ":" +
      minutes +
      ", " +
      months[month] +
      ", " +
      day +
      ", " +
      year.toString().slice(2);
  }
  return formattedTimestamp;
};
