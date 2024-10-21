import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity('user_logs')
export class UserLog {
  @PrimaryColumn({ type: 'integer' })
  id!: number;

  @Column({ type: 'text' })
  user_address!: string;

  @Column({ type: 'integer' })
  timestamp!: number;

  @Column({ type: 'text' })
  comment!: string;
}
