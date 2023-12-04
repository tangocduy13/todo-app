import {
  getAll as getAllTodos,
  getOne as getOneTodo,
  create as createTodo,
  update as updateTodo,
  remove as removeTodo,
} from "../../database/todoRepository";

export async function getTodos(ctx) {
  try {
    const todos = getAllTodos();
    ctx.body = todos;
  } catch (e) {
    ctx.status = 404;
    ctx.body = {
      success: false,
      data: [],
      error: e.message,
    };
  }
}

export async function getOne(ctx) {
  try {
    const { id } = ctx.request.params;
    const todo = getOneTodo(id);

    ctx.body = {
      data: todo,
    };
  } catch (e) {
    ctx.status = 404;
    ctx.body = {
      success: false,
      data: [],
      error: e.message,
    };
  }
}

export async function createOne(ctx) {
  try {
    const postData = ctx.request.body;
    console.log(postData);
    createTodo(postData);
    ctx.status = 201;
    return (ctx.body = {
      success: true,
    });
  } catch (e) {
    ctx.status = 400;
    ctx.body = {
      success: false,
      error: e.message,
    };
    console.log("hand");
  }
}

export async function updateOne(ctx) {
  try {
    const data = ctx.request.body;
    let { id } = ctx.request.params;
    id = parseInt(id);
    const mergeData = {
      id,
      ...data,
    };
    console.log(mergeData);
    updateTodo(mergeData);
    ctx.status = 201;
    return (ctx.body = {
      success: true,
    });
  } catch (e) {
    ctx.status = 400;
    ctx.body = {
      success: false,
      error: e.message,
    };
  }
}

export async function removeOne(ctx) {
  try {
    const { id } = ctx.request.params;
    removeTodo(id);
    ctx.status = 201;
    return (ctx.body = {
      success: true,
    });
  } catch (e) {
    ctx.status = 400;
    ctx.body = {
      success: false,
      error: e.message,
    };
  }
}
