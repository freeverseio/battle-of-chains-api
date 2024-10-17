import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity('userlog')
export class UserLog {
  @PrimaryColumn({ type: 'integer' })
  timestamp!: number;

  @Column({ type: 'text' })
  comment!: string;
}
