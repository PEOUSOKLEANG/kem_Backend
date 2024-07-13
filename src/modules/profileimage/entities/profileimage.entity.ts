// Import necessary decorators and modules from TypeORM
import { User } from 'src/modules/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

// Marks this class as an entity (table) in the database with the name 'image'
@Entity({name:'profile_image'})
export class ProImage {
  // Marks this property as the primary key, and its value will be auto-generated
  @PrimaryGeneratedColumn()
  id: number;

  // Marks this property as a column in the table
  @Column()
  filename: string;

  // Marks this property as a column in the table
  @Column()
  path: string;

  // Marks this property as a timestamp column, with a default value of the current timestamp when a new row is inserted
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  uploadedAt: Date;


  //relation with user
  @ManyToOne(()=>User, (user)=>user.profile_image)
  user:User;


  
}
