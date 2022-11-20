import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // 类型 1: 支出 2: 收入
  @Column('smallint')
  type: 1 | 2;

  @Column('text')
  name: string;

  @Column('text')
  user_id: string;

  @Column('text', { default: null })
  icon: string;

  @CreateDateColumn()
  created_time: Date;

  @UpdateDateColumn()
  updated_time: Date;
}
