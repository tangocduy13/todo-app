import fs from "fs";
import todos from "./todos.json";

export function getAll() {
  return todos;
}

export function getOne(id) {
  return todos.find((todo) => todo.id == id);
}

export function create(data) {
  const updatedTodos = [data, ...todos];
  return fs.writeFileSync(
    "./src/database/todos.json",
    JSON.stringify(updatedTodos)
  );
}

export function update(id) {
  const index = todos.findIndex((todo) => todo.id == id);
  if (index !== -1) {
    const completed = todos[index].completed
    todos[index].completed = !completed;
    return fs.writeFileSync("./src/database/todos.json", JSON.stringify(todos));
  }
}

export function remove(id) {
  const index = todos.findIndex((todo) => todo.id == id);
  if (index !== -1) {
    todos.splice(index, 1);
    return fs.writeFileSync("./src/database/todos.json", JSON.stringify(todos));
  }
}
