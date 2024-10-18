import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity('user')
export class User {
  @PrimaryColumn({ type: 'text' })
  address!: string;

  @Column({ type: 'text' })
  name!: string;

  @Column({ type: 'integer' })
  homechain!: number;

  @Column({ type: 'integer' })
  joined_timestamp!: number;

  @Column({ type: 'integer' })
  score!: number;
}
