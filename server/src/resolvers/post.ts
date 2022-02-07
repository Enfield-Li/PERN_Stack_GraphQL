import { getConnection } from "typeorm";
import { Post } from "../entities/Post";
import { Arg, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  posts(): Promise<Post[]> {
    return Post.find();
  }

  @Query(() => Post, { nullable: true })
  findPost(@Arg("id") id: string): Promise<Post | undefined> {
    return Post.findOne(id);
  }

  @Mutation(() => Post)
  async createPost(
    @Arg("title") title: string,
    @Arg("contents") contents: string
  ): Promise<Post> {
    return Post.create({ title, contents }).save();
  }

  @Mutation(() => Post, { nullable: true })
  async updatePost(
    @Arg("id") id: number,
    @Arg("title") title: string,
    @Arg("contents") contents: string
  ): Promise<Post | undefined> {
    const post = await Post.findOne(id);
    if (!post) return undefined;

    if (title) post.title = title;
    if (contents) post.contents = contents;

    await Post.update(id, post);

    return post;
  }

  @Mutation(() => Boolean)
  async deletePost(@Arg("id") id: number): Promise<boolean> {
    await Post.delete(id);

    return true;
  }
}
