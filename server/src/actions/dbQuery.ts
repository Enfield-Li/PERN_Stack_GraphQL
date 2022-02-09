import { UserInput } from "../types/resolvertypes";
import { User } from "../entities/User";
import { getConnection } from "typeorm";

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
