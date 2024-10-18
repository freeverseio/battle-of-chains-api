import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity('asset')
export class Asset {
  @PrimaryColumn({ type: 'integer' })
  chain_id!: number;

  @PrimaryColumn({ type: 'text' })
  token_id!: string

  @Column({ type: 'text' })
  type!: string;

  @Column({ type: 'integer' })
  creation_timestamp!: number;

  @Column({ type: 'text' })
  owner!: string;

  @Column({ type: 'integer' })
  score!: number;
}
