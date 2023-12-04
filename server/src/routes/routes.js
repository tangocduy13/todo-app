import Router from "koa-router";
import * as todoHandlers from "../handlers/todos/todoHanddlers";
import * as todoMiddleware from "../middleware/todoMiddleware";

const router = new Router({
  prefix: "/api",
});

router.get("/todos", todoHandlers.getTodos);
router.get("/todos/:id", todoHandlers.getOne);
router.post(
  "/todos",
  todoMiddleware.todoInputMiddleware,
  todoHandlers.createOne
);
router.put(
  "/todos/:id",
  todoMiddleware.todoUpdateMiddleware,
  todoHandlers.updateOne
);
router.delete("/todos/:id", todoHandlers.removeOne);

export default router;
