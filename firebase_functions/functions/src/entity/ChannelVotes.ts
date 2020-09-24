import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';


@Entity()
export class ChannelVotes extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    channel_id: string;

    @Column()
    upvotes: number;

    @Column()
    downvotes: number;

}