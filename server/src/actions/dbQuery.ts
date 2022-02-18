import { PostActivities } from "./../entities/PostActivities";
import { UserInput } from "../types/resolvertypes";
import { User } from "../entities/User";
import { getConnection, SimpleConsoleLogger } from "typeorm";

type FieldType = "likeStatus" | "voteStatus" | "laughStatus" | "confusedStatus";
type FieldPointType =
  | "likePoints"
  | "votePoints"
  | "laughPoints"
  | "confusedPoints";

export const fieldInteactionWithDB = async (
  interactions: PostActivities | undefined, // userVotes
  interactionsField: boolean | undefined, // userVotes.vote
  fieldName: FieldType, // vote
  fieldBooleanValue: boolean, // vote
  fieldPoints: FieldPointType, // votePoints
  userId: number,
  postId: number
) => {
  const fieldValue = fieldBooleanValue ? 1 : -1; // voteValue

  // user hasn't voted before
  if (!interactions) {
    await getConnection().transaction(async (tem) => {
      // const res = tem.create(Votes, { postId, userId, value });
      const res = await tem.query(
        `
          insert into post_activities ("userId", "postId", "${fieldName}")
          values ($1, $2, $3)
        `,
        [userId, postId, fieldBooleanValue]
      );

      await tem.query(
        `
          update post
          set "${fieldPoints}" = "${fieldPoints}" + $1
          where id = $2
        `,
        [fieldValue, postId]
      );
    });
  }
  // user voted, but reset the vote to null
  else if (interactions && interactionsField === null) {
    await getConnection().transaction(async (tem) => {
      await tem.query(
        `
          update post_activities
          set "${fieldName}" = $1
          where "postId" = $2 and "userId" = $3;
        `,
        [fieldBooleanValue, postId, userId]
      );

      await tem.query(
        `
          update post
          set "${fieldPoints}" = "${fieldPoints}" + $1
          where id = $2;
        `,
        [fieldValue, postId]
      );
    });
  }
  // user change up vote to down vote or vice versa
  else if (
    interactions &&
    interactionsField !== fieldBooleanValue &&
    interactionsField !== null
  ) {
    await getConnection().transaction(async (tem) => {
      await tem.query(
        `
          update post_activities
          set "${fieldName}" = $1
          where "postId" = $2 and "userId" = $3;
        `,
        [fieldBooleanValue, postId, userId]
      );

      await tem.query(
        `
          update post
          set "${fieldPoints}" = "${fieldPoints}" + $1
          where id = $2;
        `,
        [fieldValue * 2, postId]
      );
    });
  }
  // user unvote their vote ie. set vote.value = null
  else if (interactions && interactionsField === fieldBooleanValue) {
    await getConnection().transaction(async (tem) => {
      await tem.query(
        `
          update post_activities
          set "${fieldName}" = $1
          where "postId" = $2 and "userId" = $3;
        `,
        [null, postId, userId]
      );

      await tem.query(
        `
          update post
          set "${fieldPoints}" = "${fieldPoints}" + ${
          fieldBooleanValue ? -1 : 1
        }
          where id = $1;
        `,
        [postId]
      );
    });
  }
  // const userVotes = await PostActivities.findOne({
  //   where: { postId, userId },
  // });

  // const voteValue = vote ? 1 : -1;

  // // user hasn't voted before
  // if (!userVotes) {
  //   await getConnection().transaction(async (tem) => {
  //     // const res = tem.create(Votes, { postId, userId, value });
  //     const res = await tem.query(
  //       `
  //         insert into post_activities ("userId", "postId", vote)
  //         values ($1, $2, $3)
  //       `,
  //       [userId, postId, vote]
  //     );

  //     await tem.query(
  //       `
  //         update post
  //         set "votePoints" = "votePoints" + $1
  //         where id = $2
  //       `,
  //       [voteValue, postId]
  //     );
  //   });
  // }
  // // user voted, but reset the vote to null
  // else if (userVotes && userVotes.vote === null) {
  //   await getConnection().transaction(async (tem) => {
  //     await tem.query(
  //       `
  //         update post_activities
  //         set vote = $1
  //         where "postId" = $2 and "userId" = $3;
  //       `,
  //       [vote, postId, userId]
  //     );

  //     await tem.query(
  //       `
  //         update post
  //         set "votePoints" = "votePoints" + $1
  //         where id = $2;
  //       `,
  //       [voteValue, postId]
  //     );
  //   });
  // }
  // // user change up vote to down vote or vice versa
  // else if (userVotes && userVotes.vote !== vote && userVotes.vote !== null) {
  //   await getConnection().transaction(async (tem) => {
  //     await tem.query(
  //       `
  //         update post_activities
  //         set vote = $1
  //         where "postId" = $2 and "userId" = $3;
  //       `,
  //       [vote, postId, userId]
  //     );

  //     await tem.query(
  //       `
  //         update post
  //         set "votePoints" = "votePoints" + $1
  //         where id = $2;
  //       `,
  //       [voteValue * 2, postId]
  //     );
  //   });
  // }
  // // user unvote their vote ie. set vote.value = null
  // else if (userVotes && userVotes.vote === vote) {
  //   await getConnection().transaction(async (tem) => {
  //     await tem.query(
  //       `
  //         update post_activities
  //         set vote = $1
  //         where "postId" = $2 and "userId" = $3;
  //       `,
  //       [null, postId, userId]
  //     );

  //     await tem.query(
  //       `
  //         update post
  //         set "votePoints" = "votePoints" + ${vote ? -1 : 1}
  //         where id = $1;
  //       `,
  //       [postId]
  //     );
  //   });
  // }

  return;
};

export const registerUserToDB = (input: UserInput) =>
  getConnection()
    .createQueryBuilder()
    .insert()
    .into(User)
    .values({
      username: input.username,
      email: input.email,
      password: input.password,
    })
    .returning("*")
    .execute();

// ⬇⬇⬇ method one ⬇⬇⬇
// return entire User object

// User.create({
//   username,
//   email,
//   password: hashedPassword,
// }).save();

// ⬇⬇⬇ method two ⬇⬇⬇
// only return id and timestamp
// good for query but not update

// const result = await getConnection().query(
//   `
//  INSERT INTO "user"("username", "email", "password")
//  VALUES ($1, $2, $3) RETURNING "id", "createdAt", "updatedAt"
// `,
//   [username, email, hashedPassword]
// );
// console.log("result: ", result);
// result:  [
//    {
//      id: 45,
//      createdAt: 2022-02-08T07:48:29.370Z,
//      updatedAt: 2022-02-08T07:48:29.370Z
//    }
//  ]
