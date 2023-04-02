import { Entity, PrimaryGeneratedColumn, Column,OneToOne,JoinColumn } from "typeorm"
import { Profile } from "./Profile"

@Entity()
export class User {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    isActive: boolean

    @OneToOne(()=>Profile)
    @JoinColumn()
    profile:Profile

}