import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity('chain_action_proposal')
export class ChainActionProposal {
  @PrimaryColumn({ type: 'text' })
  proposal_hash!: string;

  @Column({ type: 'integer' })
  source_chain_id!: number

  @Column({ type: 'integer'})
  target_chain_id!: number;

  @Column({ type: 'integer' })
  type!: number;

  @Column({ type: 'integer'})
  attack_area!: number;

  @Column({ type: 'text'})
  attack_address!: string;

  @Column({ type: 'integer' })
  votes!: number;
}
