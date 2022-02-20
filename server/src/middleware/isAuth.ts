import { MyContext } from "src/types/contextType";
import { MiddlewareFn } from "type-graphql";

export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
  if (!context.req.session.userId) {
    context.res.statusMessage = "Not authenticated";
  }

  return next();
};
