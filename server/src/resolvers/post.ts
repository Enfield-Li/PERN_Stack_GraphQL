import { MyContext } from "./../types/contextType";
import { isAuth } from "./../middleware/isAuth";
import { getConnection } from "typeorm";
import { Post } from "../entities/Post";
import {
  Arg,
  Ctx,
  Int,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  posts(): Promise<Post[]> {
    return Post.find();
  }

  @Query(() => Post, { nullable: true })
  Post(@Arg("id", () => Int) id: number): Promise<Post | undefined> {
    return Post.findOne(id);
  }

  @Mutation(() => Post)
  @UseMiddleware(isAuth)
  async createPost(
    @Arg("title") title: string,
    @Arg("contents") contents: string,
    @Ctx() { req }: MyContext
  ): Promise<Post> {
    const userId = req.session.userId;

    return Post.create({ title, contents, creatorId: userId }).save();
  }

  @Mutation(() => Post, { nullable: true })
  @UseMiddleware(isAuth)
  async updatePost(
    @Arg("id") id: number,
    @Arg("title") title: string,
    @Arg("contents") contents: string,
    @Ctx() { req }: MyContext
  ): Promise<Post | null> {
    // const post = await Post.findOne(id);
    // if (!post) return undefined;

    // if (title) post.title = title;
    // if (contents) post.contents = contents;

    // await Post.update(id, post);

    // return post;
    const res = await getConnection()
      .createQueryBuilder()
      .update(Post)
      .set({ title, contents })
      .where('id = :id and "creatorId" = :creatorId', {
        id,
        creatorId: req.session.userId,
      })
      .returning("*")
      .execute();

    return res.raw[0];
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deletePost(
    @Arg("id") id: number,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    const userId = req.session.userId;

    await Post.delete({ id, creatorId: userId });

    return true;
  }
}
