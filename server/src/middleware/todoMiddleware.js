import * as yup from "yup";

export async function todoInputMiddleware(ctx, next) {
  try {
    const postData = ctx.request.body;

    let schema = yup.object().shape({
      id: yup.number().positive().integer().required(),
      userId: yup.number().positive().integer().required(),
      title: yup.string().required(),
      completed: yup.boolean().required(),
    });

    await schema.validate(postData);
    next();
  } catch (e) {
    ctx.status = 400;
    ctx.body = {
      success: false,
      errors: e.errors,
      errorName: e.name,
    };
  }
}

export async function todoUpdateMiddleware(ctx, next) {
  try {
    const data = ctx.request.body;
    const { id } = ctx.request.params;
    const postData = {
      id,
      ...data,
    };

    console.log(postData);

    let schema = yup.object().shape({
      id: yup.number().positive().integer().required(),
      userId: yup.number().positive().integer().required(),
      title: yup.string().required(),
      completed: yup.boolean().required(),
    });

    await schema.validate(postData);
    next();
  } catch (e) {
    ctx.status = 400;
    ctx.body = {
      success: false,
      errors: e.errors,
      errorName: e.name,
    };
  }
}
