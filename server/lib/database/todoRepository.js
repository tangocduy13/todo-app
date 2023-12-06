"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = create;
exports.getAll = getAll;
exports.getOne = getOne;
exports.remove = remove;
exports.update = update;
var _fs = _interopRequireDefault(require("fs"));
var _todos = _interopRequireDefault(require("./todos.json"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function getAll() {
  return _todos.default;
}
function getOne(id) {
  return _todos.default.find(todo => todo.id == id);
}
function create(data) {
  const updatedTodos = [data, ..._todos.default];
  return _fs.default.writeFileSync("./src/database/todos.json", JSON.stringify(updatedTodos));
}
function update(id) {
  const index = _todos.default.findIndex(todo => todo.id == id);
  if (index !== -1) {
    const completed = _todos.default[index].completed;
    _todos.default[index].completed = !completed;
    return _fs.default.writeFileSync("./src/database/todos.json", JSON.stringify(_todos.default));
  }
}
function remove(id) {
  const index = _todos.default.findIndex(todo => todo.id == id);
  if (index !== -1) {
    _todos.default.splice(index, 1);
    return _fs.default.writeFileSync("./src/database/todos.json", JSON.stringify(_todos.default));
  }
}
//# sourceMappingURL=todoRepository.js.map