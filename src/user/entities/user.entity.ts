import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id?: number;

  @Column({ default: null })
  username: string;

  @Column({ default: null })
  password: string;

  // 个性签名
  @Column({ default: null })
  signature?: string;

  @Column({ default: null })
  avatar?: string;

  @CreateDateColumn()
  created_time: Date;

  @UpdateDateColumn()
  updated_time: Date;
}
