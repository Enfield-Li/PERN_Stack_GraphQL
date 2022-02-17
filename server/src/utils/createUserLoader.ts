import { User } from "../entities/User";
import DataLoader from "dataloader";

type usersIdMapToUserType = {
  [key: number]: User;
};

export const createUserLoader = () =>
  new DataLoader<number, User>(async (userIds): Promise<User[]> => {
    const users = await User.findByIds(userIds as number[]);

    const userdIdMapToUser: usersIdMapToUserType = {};

    users.forEach((user) => {
      userdIdMapToUser[user.id] = user;
    });

    return userIds.map((userId) => userdIdMapToUser[userId]);
  });
// userIds: [85, 80, 83];

// [1] users:  [
// [1]   User {
// [1]     id: 83,
// [1]     createdAt: 2022-02-12T14:25:04.247Z,
// [1]     updatedAt: 2022-02-12T14:25:04.247Z,
// [1]     username: 'user5',
// [1]     email: 'user5@gmail.com',
// [1]     password: '$argon2i$v=19$m=4096,t=3,p=1$0wgCBaP8UFE1nOA5QZceyw$htLOfUgG0vbJUZcxppxtsD3/ZPXIxkL9C4kZGptzOjY'
// [1]   },
// [1]   User {
// [1]     id: 85,
// [1]     createdAt: 2022-02-12T14:25:25.456Z,
// [1]     updatedAt: 2022-02-12T14:25:25.456Z,
// [1]     username: 'user7',
// [1]     email: 'user7@gmail.com',
// [1]     password: '$argon2i$v=19$m=4096,t=3,p=1$WW5sIhpaCNEKFcKDKkRCvw$Z0KGRA9y07OKeFfdYMjVAxMslyYfWtCKw0u2VFkK4RQ'
// [1]   },
// [1]   User {
// [1]     id: 80,
// [1]     createdAt: 2022-02-12T14:24:19.518Z,
// [1]     updatedAt: 2022-02-12T14:24:19.518Z,
// [1]     username: 'user2',
// [1]     email: 'user2@gmail.com',
// [1]     password: '$argon2i$v=19$m=4096,t=3,p=1$7c6SFZmddID/I1Pc91z1dA$qHqlJm+NIE5w7rI/mxxDjkQXTODo8oLDynTELfq5VDE'
// [1]   }
// [1] ]

// [1] sortedUsers:  [
// [1]   User {
// [1]     id: 85,
// [1]     createdAt: 2022-02-12T14:25:25.456Z,
// [1]     updatedAt: 2022-02-12T14:25:25.456Z,
// [1]     username: 'user7',
// [1]     email: 'user7@gmail.com',
// [1]     password: '$argon2i$v=19$m=4096,t=3,p=1$WW5sIhpaCNEKFcKDKkRCvw$Z0KGRA9y07OKeFfdYMjVAxMslyYfWtCKw0u2VFkK4RQ'
// [1]   },
// [1]   User {
// [1]     id: 80,
// [1]     createdAt: 2022-02-12T14:24:19.518Z,
// [1]     updatedAt: 2022-02-12T14:24:19.518Z,
// [1]     username: 'user2',
// [1]     email: 'user2@gmail.com',
// [1]     password: '$argon2i$v=19$m=4096,t=3,p=1$7c6SFZmddID/I1Pc91z1dA$qHqlJm+NIE5w7rI/mxxDjkQXTODo8oLDynTELfq5VDE'
// [1]   },
// [1]   User {
// [1]     id: 83,
// [1]     createdAt: 2022-02-12T14:25:04.247Z,
// [1]     updatedAt: 2022-02-12T14:25:04.247Z,
// [1]     username: 'user5',
// [1]     email: 'user5@gmail.com',
// [1]     password: '$argon2i$v=19$m=4096,t=3,p=1$0wgCBaP8UFE1nOA5QZceyw$htLOfUgG0vbJUZcxppxtsD3/ZPXIxkL9C4kZGptzOjY'
// [1]   }
// [1] ]
