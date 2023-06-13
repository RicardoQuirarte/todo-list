export default function changePriority(priority, div) {
  if (priority === "top") {
    div.classList.add("red");
  } else if (priority === "mid") {
    div.classList.add("orange");
  } else {
    div.classList.add("green");
  }
}