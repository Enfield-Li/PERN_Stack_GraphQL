import { Field } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { Post } from "./Post";
import { User } from "./User";

@Entity()
export class PostActivities extends BaseEntity {
  @Field()
  @Column({ nullable: true })
  voteStatus: boolean;

  @Field()
  @Column({ nullable: true })
  likeStatus: boolean;

  @Field()
  @Column({ nullable: true })
  laughStatus: boolean;

  @Field()
  @Column({ nullable: true })
  confusedStatus: boolean;

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
