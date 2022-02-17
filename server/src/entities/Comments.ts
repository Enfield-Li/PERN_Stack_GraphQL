import { Column, CreateDateColumn, PrimaryColumn } from "typeorm";
import { BaseEntity, Entity } from "typeorm";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Comments extends BaseEntity {
  @CreateDateColumn()
  createdAt: Date;

  @PrimaryColumn()
  userId: number;

  @PrimaryColumn()
  postId: number;

  @Column()
  text: string;

  @Column()
  parentId: number;
}
