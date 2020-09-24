import * as functions from 'firebase-functions';
import { connect } from './config';
import { ChannelVotes } from './entity/ChannelVotes';


export const getVotes = functions.https.onRequest(async (request,response) => {
  const connection = await connect();
  const channelRepo = connection.getRepository(ChannelVotes);
  const allChanels = await channelRepo.find();
  response.send(allChanels);
})

export const createChannel = functions.https.onRequest(async (request, response) => {
  const { channel_id, upvoted } = request.body;
  try {
    const connection = await connect();
    const repo = connection.getRepository(ChannelVotes);
    const newChannel = new ChannelVotes();
    newChannel.channel_id = channel_id;
    let upvoteCount = 0;
    let downvoteCount = 0;
    upvoted ? upvoteCount++ : downvoteCount++;
    newChannel.upvotes = upvoteCount;
    newChannel.downvotes = downvoteCount;
    const savedChannel = await repo.save(newChannel);
    response.send(savedChannel);
  } catch (error) {
    response.send(error);
  }
})

