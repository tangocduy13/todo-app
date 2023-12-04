"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createOne = createOne;
exports.getOne = getOne;
exports.getTodos = getTodos;
exports.removeOne = removeOne;
exports.updateOne = updateOne;
var _todoRepository = require("../../database/todoRepository");
async function getTodos(ctx) {
  try {
    const todos = (0, _todoRepository.getAll)();
    ctx.body = todos;
  } catch (e) {
    ctx.status = 404;
    ctx.body = {
      success: false,
      data: [],
      error: e.message
    };
  }
}
async function getOne(ctx) {
  try {
    const {
      id
    } = ctx.request.params;
    const todo = (0, _todoRepository.getOne)(id);
    ctx.body = {
      data: todo
    };
  } catch (e) {
    ctx.status = 404;
    ctx.body = {
      success: false,
      data: [],
      error: e.message
    };
  }
}
async function createOne(ctx) {
  try {
    const postData = ctx.request.body;
    console.log(postData);
    (0, _todoRepository.create)(postData);
    ctx.status = 201;
    return ctx.body = {
      success: true
    };
  } catch (e) {
    ctx.status = 400;
    ctx.body = {
      success: false,
      error: e.message
    };
    console.log("hand");
  }
}
async function updateOne(ctx) {
  try {
    const data = ctx.request.body;
    let {
      id
    } = ctx.request.params;
    id = parseInt(id);
    const mergeData = {
      id,
      ...data
    };
    console.log(mergeData);
    (0, _todoRepository.update)(mergeData);
    ctx.status = 201;
    return ctx.body = {
      success: true
    };
  } catch (e) {
    ctx.status = 400;
    ctx.body = {
      success: false,
      error: e.message
    };
  }
}
async function removeOne(ctx) {
  try {
    const {
      id
    } = ctx.request.params;
    (0, _todoRepository.remove)(id);
    ctx.status = 201;
    return ctx.body = {
      success: true
    };
  } catch (e) {
    ctx.status = 400;
    ctx.body = {
      success: false,
      error: e.message
    };
  }
}
//# sourceMappingURL=todoHanddlers.js.map