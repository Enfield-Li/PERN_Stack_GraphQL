import path from "path";
import { Post } from "../entities/Post";
import { User } from "../entities/User";
import { createConnection } from "typeorm";
import { PostActivities } from "../entities/PostActivities";

const connectDB = () =>
  createConnection({
    type: "postgres",
    username: "postgres",
    database: "full_stack",
    logging: true,
    synchronize: true,
    migrations: [path.join(__dirname, "./migrations/*")],
    entities: [Post, User, PostActivities],
    password: "0492355",
  });

export default connectDB;
