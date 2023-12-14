import * as yup from "yup";

export default async function todoInputMiddleware(ctx, next) {
  try {
    const postData = ctx.request.body;

    let schema = yup.object().shape({
      id: yup.number().positive().required(),
      title: yup.string().required(),
      completed: yup.boolean().required(),
    });

    await schema.validate(postData);
    return next();
  } catch (e) {
    ctx.status = 400;
    ctx.body = {
      success: false,
      errors: e.errors,
      errorName: e.name,
    };
  }
}

