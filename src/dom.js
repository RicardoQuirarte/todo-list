import cleanHtml from "./clean";

const detailsDiv = document.querySelector(".show-details");
const container = document.querySelector(".container");

export default function showDetails({ description }) {
  detailsDiv.style.display = "flex";
  cleanHtml(container);
  const div = document.createElement("div");
  div.textContent = description;
  container.appendChild(div);
}

const closeButton = document.querySelector('img[alt="close-window"]');
closeButton.addEventListener("click", () => {
  detailsDiv.style.display = "none";
});