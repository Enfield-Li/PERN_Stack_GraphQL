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
import { Votes } from "./Votes";

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

  @Field()
  @Column({ type: "int", default: 0 })
  points: number;

  @OneToMany(() => Votes, (votes) => votes.post)
  votes: Votes[];
}
