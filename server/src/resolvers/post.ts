import { fieldInteactionWithDB } from "./../actions/dbQuery";
import { User } from "./../entities/User";
import {
  InteractWithPostInput,
  PaginatedPosts,
  PostActivitiesStatusType,
  PostPointsType,
} from "./../types/resolvertypes";
import { PostActivities } from "../entities/PostActivities";
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
  @FieldResolver(() => String)
  contentSnippets(@Root() post: Post) {
    return post.contents.slice(0, 50);
  }

  @FieldResolver(() => PostPointsType, { nullable: true })
  async postPoints(@Root() post: Post): Promise<PostPointsType> {
    const allPoints: PostPointsType = {
      votePoints: 0,
      laughPoints: 0,
      confusedPoints: 0,
      likePoints: 0,
    };

    // if (post.votePoints > 0) allPoints.votePoints = post.votePoints;
    // if (post.laughPoints > 0) allPoints.laughPoints = post.laughPoints;
    // if (post.confusedPoints > 0) allPoints.confusedPoints = post.confusedPoints;
    // if (post.likePoints > 0) allPoints.likePoints = post.likePoints;

    allPoints.votePoints = post.votePoints;
    allPoints.laughPoints = post.laughPoints;
    allPoints.confusedPoints = post.confusedPoints;
    allPoints.likePoints = post.likePoints;

    return allPoints;
  }

  @FieldResolver(() => User)
  async creator(@Root() post: Post, @Ctx() { userLoader }: MyContext) {
    const res = await userLoader.load(post.creatorId);
    return res;
  }

  @FieldResolver(() => PostActivitiesStatusType, { nullable: true })
  async postActivitiesStatus(
    @Root() post: Post,
    @Ctx() { voteLoader, req }: MyContext
  ): Promise<PostActivities | null> {
    if (!req.session.userId) return null;

    const res = await voteLoader.load({
      postId: post.id,
      userId: req.session.userId,
    });

    return res ? res : null;
  }

  @Query(() => PaginatedPosts)
  async posts(
    @Arg("limit", () => Int, { defaultValue: 10 })
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
  async interactWithPost(
    @Arg("interactInput") interactInput: InteractWithPostInput,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    const { like, postId, laugh, vote, confused } = interactInput;

    const userId = req.session.userId;
    if (!userId) throw new Error("Not Authenticated");

    const userInteactions = await PostActivities.findOne({
      where: { postId, userId },
    });

    if (like === true || like === false)
      await fieldInteactionWithDB(
        userInteactions,
        userInteactions?.likeStatus,
        "likeStatus",
        like,
        "likePoints",
        userId,
        postId
      );

    if (confused === true || confused === false)
      await fieldInteactionWithDB(
        userInteactions,
        userInteactions?.confusedStatus,
        "confusedStatus",
        confused,
        "confusedPoints",
        userId,
        postId
      );

    if (vote === true || vote === false)
      fieldInteactionWithDB(
        userInteactions,
        userInteactions?.voteStatus,
        "voteStatus",
        vote,
        "votePoints",
        userId,
        postId
      );

    if (laugh === true || laugh === false)
      fieldInteactionWithDB(
        userInteactions,
        userInteactions?.laughStatus,
        "laughStatus",
        laugh,
        "laughPoints",
        userId,
        postId
      );

    return true;
  }
}
