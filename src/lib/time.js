// format date like scratch does

export default function (inputTime) {
  let date = new Date(inputTime);
  let now = new Date();

  let day = `${new Intl.DateTimeFormat("en-US", { month: "short" }).format(
    date
  )}  ${date.getDate()},`;

  let year = ` ${date.getFullYear()}`;

  let sameMonth = now.getMonth() == date.getMonth() && now.getFullYear() == date.getFullYear()

  if (now.getDate() == date.getDate() && sameMonth) {
    day = "Today";
    year = "";
  }

  if (now.getDate() - 1 == date.getDate() && sameMonth) {
    day = "Yesterday";
    year = "";
  }

  let time = ` ${("0" + date.getHours()).slice(-2)}:${(
    "0" + date.getMinutes()
  ).slice(-2)}:${("0" + date.getSeconds()).slice(-2)}`;

  return `${day}${year}${time}`;
}