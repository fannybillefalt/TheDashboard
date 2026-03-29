function showTimeAndDate() {
  const timestamp = new Date();
  const time = timestamp.toLocaleString("sv-SE", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const date = timestamp.toLocaleDateString("sv-SE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  document.getElementById("timestamp").innerHTML = time + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + date;
}
setInterval(showTimeAndDate, 1000);