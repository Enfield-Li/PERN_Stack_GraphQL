import { User } from "./../entities/User";
import { PaginatedPosts } from "./../types/resolvertypes";
import { Votes } from "./../entities/Votes";
import { MyContext } from "./../types/contextType";
import { isAuth } from "./../middleware/isAuth";
import { getConnection, TransactionManager } from "typeorm";
import { Post } from "../entities/Post";
import {
  Arg,
  Ctx,
  FieldResolver,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";

@Resolver(() => Post)
export class PostResolver {
  @Query(() => PaginatedPosts)
  async posts(
    @Arg("limit", () => Int, { defaultValue: 10, nullable: true })
    limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null
  ): Promise<PaginatedPosts> {
    const inputLimit = Math.min(50, limit);
    const inputLimitPlus = inputLimit + 1;

    const replacement: any[] = [inputLimitPlus];

    if (cursor) replacement.push(new Date(parseInt(cursor)));

    const posts = await getConnection().query(
      `
        select * from post
        ${cursor ? 'where "createdAt" < $2' : ""}
        order by "createdAt" desc
        limit $1
      `,
      replacement
    );

    return {
      posts: posts.slice(0, limit),
      hasMore: posts.length === inputLimitPlus,
    };
  }

  @FieldResolver(() => String)
  contentSnippets(@Root() post: Post) {
    return post.contents.slice(0, 50);
  }

  @FieldResolver(() => User)
  async creator(@Root() post: Post): Promise<User | undefined> {
    return await User.findOne(post.creatorId);
  }

  @FieldResolver(() => Boolean, { nullable: true })
  async voteStatus(
    @Root() post: Post,
    @Ctx() { req }: MyContext
  ): Promise<boolean | undefined> {
    const vote = await Votes.findOne({
      where: { postId: post.id, userId: req.session.userId },
    });

    return vote?.value;
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

    return res.raw[0] ? res.raw[0] : null;
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

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async vote(
    @Arg("postId", () => Int) postId: number,
    @Arg("value") value: boolean,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    const voteValue = value ? 1 : -1;
    const userId = req.session.userId;

    const userVotes = await Votes.findOne({ where: { postId, userId } });

    // user hasn't voted before
    if (!userVotes) {
      await getConnection().transaction(async (tem) => {
        // const res = tem.create(Votes, { postId, userId, value });
        const res = await tem.query(
          `
            insert into votes ("userId", "postId", value)
            values ($1, $2, $3)
          `,
          [userId, postId, value]
        );

        await tem.query(
          `
            update post 
            set points = points + $1
            where id = $2 
          `,
          [voteValue, postId]
        );
      });
    }
    // user voted, but reset the vote to null
    else if (userVotes && userVotes.value === null) {
      await getConnection().transaction(async (tem) => {
        await tem.query(
          `
            update votes
            set value = $1
            where "postId" = $2 and "userId" = $3;
          `,
          [value, postId, userId]
        );

        await tem.query(
          `
            update post
            set points = points + $1
            where id = $2;
          `,
          [voteValue, postId]
        );
      });
    }
    // user change up vote to down vote or vice versa
    else if (
      userVotes &&
      userVotes.value !== value &&
      userVotes.value !== null
    ) {
      await getConnection().transaction(async (tem) => {
        await tem.query(
          `
            update votes
            set value = $1
            where "postId" = $2 and "userId" = $3;
          `,
          [value, postId, userId]
        );

        await tem.query(
          `
            update post
            set points = points + $1
            where id = $2;
          `,
          [voteValue * 2, postId]
        );
      });
    }
    // user unvote their vote ie. set vote.value = null
    else if (userVotes && userVotes.value === value) {
      await getConnection().transaction(async (tem) => {
        await tem.query(
          `
            update votes
            set value = $1
            where "postId" = $2 and "userId" = $3;
          `,
          [null, postId, userId]
        );

        await tem.query(
          `
            update post
            set points = points + ${value ? -1 : 1}
            where id = $1;
          `,
          [postId]
        );
      });
    }

    return true;
  }
}
