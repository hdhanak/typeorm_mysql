import { Entity, PrimaryGeneratedColumn, Column,OneToOne,JoinColumn,OneToMany } from "typeorm"
import { Photo } from "./Photo"
import { Profile } from "./Profile"

@Entity()
export class Employee {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    emp_name: string

    @Column()
    salary: Number
    
    @OneToMany(() => Photo, (photo) => photo.employee,{
        cascade:false
    })
    photos: Photo[]
    
    @Column()
    age: Number
}