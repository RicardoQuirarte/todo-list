// Factory for todos
import { format } from "date-fns";

export default function getTodoFromInput() {
    const title = document.querySelector("#title").value;
    const description = document.querySelector("#description").value;
    const date = document.querySelector("#due-date").value;
    const dueDate = format(new Date(`${date}T00:00`), "dd/MMM/yy");
    const priority = document.querySelector(
      'input[name="priority"]:checked'
    ).value;
    const project = document.querySelector("#proyecto").value;
    const id = Date.now();
  
    return { title, description, date, dueDate, priority, project, id };
  }