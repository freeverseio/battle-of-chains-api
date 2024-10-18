import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity('user_logs')
export class UserLog {
  @PrimaryColumn({ type: 'integer' })
  timestamp!: number;

  @Column({ type: 'text' })
  comment!: string;
}
