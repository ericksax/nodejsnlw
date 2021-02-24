import { Column, Entity, PrimaryColumn } from "typeorm";



@Entity("users")
class User {

    @PrimaryColumn()
    readonly id: string;

    @Column()
    name: string; 

    
    email: string;

    created_at: Date

}

export {User}