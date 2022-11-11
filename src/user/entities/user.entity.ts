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
  id: string;

  @Column('text')
  username: string;

  // 加密后
  @Column('text', { select: false })
  password: string;

  // 盐
  @Column('text', { select: false })
  salt: string;

  // 个性签名
  @Column('text', { default: null })
  signature: string;

  @Column('text', { default: null })
  avatar: string;

  @CreateDateColumn()
  created_time: Date;

  @UpdateDateColumn()
  updated_time: Date;
}
