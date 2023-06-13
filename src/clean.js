export default function cleanHtml(div) {
  while (div.firstChild) {
    div.removeChild(div.firstChild);
  }
}