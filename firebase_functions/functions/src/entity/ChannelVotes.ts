import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, Unique } from 'typeorm';


@Entity()
@Unique(["channel_id"])
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