import { Field } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Post } from "./Post";
import { User } from "./User";

@Entity()
export class Votes extends BaseEntity {
  @Column({ nullable: true })
  value: boolean;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @PrimaryColumn()
  userId: number;

  @PrimaryColumn()
  postId: number;

  @ManyToOne(() => User, (user) => user.votes, { onDelete: "CASCADE" })
  user: User;

  @ManyToOne(() => Post, (post) => post.votes, { onDelete: "CASCADE" })
  post: Post;
}
