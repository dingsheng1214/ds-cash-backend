import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Bill {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // 类型 1: 支出 2: 收入
  @Column('smallint')
  type: 1 | 2;

  // 金额
  @Column('bigint')
  amount: bigint;

  @Column('text')
  tag_id: string;

  @Column('text')
  tag_name: string;

  @Column('text')
  user_id: string;

  @Column('text', { default: null })
  remark: string;

  @Column('timestamp')
  date: Date;

  @CreateDateColumn()
  created_time: Date;

  @UpdateDateColumn()
  updated_time: Date;
}
