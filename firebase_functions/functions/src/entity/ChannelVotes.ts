import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, Unique } from 'typeorm';


@Entity()
@Unique(["video_id"])
export class ChannelVotes extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    video_id: string;

    @Column()
    upvotes: number;

    @Column()
    downvotes: number;

}