import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Rooms {
  @PrimaryGeneratedColumn()
  id: Number;

  @Column()
  name: string;
}
