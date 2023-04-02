import { Entity, PrimaryGeneratedColumn, Column,ManyToOne ,JoinColumn} from "typeorm"
import { Employee } from "./Employee"

@Entity()
export class Photo {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    photo: string

   @ManyToOne(()=>Employee,employee=>employee.photos,{
    onDelete:'CASCADE'
   })
   @JoinColumn()
   employee:Employee
}