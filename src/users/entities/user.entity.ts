import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum Role {
  INTERN = 'INTERN',
  ENGINEER = 'ENGINEER',
  ADMIN = 'ADMIN',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'enum', enum: Role })
  role: Role;
  @Column({nullable: true })
  password: string; // hashed password
}

