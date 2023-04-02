import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Profile {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    photo: string

    @Column()
    gender: string

    @Column()
    isActive: boolean
}