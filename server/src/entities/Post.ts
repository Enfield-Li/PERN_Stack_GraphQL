import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  UpdateDateColumn,
} from "typeorm";
import { PrimaryGeneratedColumn } from "typeorm";
import { ObjectType, Field, Int, ID } from "type-graphql";
import { User } from "./User";
import { PostActivities } from "./PostActivities";

@ObjectType()
@Entity()
export class Post extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  contents: string;

  @Field(() => Int)
  @Column()
  creatorId: number;

  @Field()
  @ManyToOne(() => User, (user) => user.posts)
  creator: User;

  @Column({ type: "int", default: 0 })
  votePoints: number;

  @Column({ type: "int", default: 0 })
  likePoints: number;

  @Column({ type: "int", default: 0 })
  confusedPoints: number;

  @Column({ type: "int", default: 0 })
  laughPoints: number;

  @OneToMany(() => PostActivities, (votes) => votes.post)
  votes: PostActivities[];
}
