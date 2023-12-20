import Router from "koa-router";
import * as todoHandlers from "../handlers/todos/todoHanddlers";
import todoMiddleware from "../middleware/todoMiddleware";

const router = new Router({
  prefix: "/api",
});

router.get("/todos", todoHandlers.getTodos);
router.get("/todos/:id", todoHandlers.getOne);
router.post("/todos", todoMiddleware, todoHandlers.createOne); // ko trả về ID
router.patch("/todos/:id", todoHandlers.updateOne); // dùng patch thay vì dùng put
router.delete("/todos/:id", todoHandlers.removeOne);

export default router;
