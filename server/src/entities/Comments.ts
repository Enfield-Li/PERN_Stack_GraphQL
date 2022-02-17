import { Column, CreateDateColumn, PrimaryColumn } from "typeorm";
import { BaseEntity, Entity } from "typeorm";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Comments extends BaseEntity {
  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @PrimaryColumn()
  userId: number;

  @PrimaryColumn()
  postId: number;

  @Field()
  @Column()
  text: string;
}
