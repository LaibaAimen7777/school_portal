import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Rooms {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
