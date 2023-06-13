const form = document.querySelector("#form");

export default function removeRadioButtons() {
  form
    .querySelector('input[name="priority"][value="top"]')
    .removeAttribute("checked");
  form
    .querySelector('input[name="priority"][value="mid"]')
    .removeAttribute("checked");
  form
    .querySelector('input[name="priority"][value="low"]')
    .removeAttribute("checked");
}