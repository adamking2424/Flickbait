import * as functions from 'firebase-functions';
import { connect } from './config';
import { ChannelVotes } from './entity/ChannelVotes';


export const getOneVote = functions.https.onRequest(async (request,response) => {
  try {
    const connection = await connect();
    const channelRepo = connection.getRepository(ChannelVotes);
    const allChanels = await channelRepo.find({where:{channel_id:request.body.channel_id}});
    response.send(allChanels);
  } catch (error){
    response.send(error);
  }
});

//Example request body
//{"channel_ids":[{"channel_id":"jfjfjf"}, {"channel_id":"jfjf"}]}
export const getAllVotes = functions.https.onRequest(async (request, response) => {
  try { 
    const connection = await connect();
    const channelRepo = connection.getRepository(ChannelVotes);
    let returnVal = await channelRepo.find({where: request.body.channel_ids});
    response.set('Access-Control-Allow-Origin', '*');
 

  if (request.method === 'OPTIONS') {
    // Send response to OPTIONS requests
    response.set('Access-Control-Allow-Methods', 'POST');
    response.set('Access-Control-Allow-Headers', 'Content-Type');
    response.set('Access-Control-Max-Age', '3600');
    response.status(204).send('');
  } else {
    response.send(returnVal);
  }
    //response.send(returnVal);
  } catch (error) {
    response.send(error);
  }
})

export const sendVote = functions.https.onRequest(async (request, response) => {
  const { channel_id, upvoted } = request.body;
  const channelVotes = new ChannelVotes();
  channelVotes.channel_id = channel_id;
  let upvoteCount = 0;
  let downvoteCount = 0;
  upvoted ? upvoteCount++ : downvoteCount++;
  channelVotes.upvotes = upvoteCount;
  channelVotes.downvotes = downvoteCount;
  let voteToBeUpdated = upvoted ? "upvotes" : "downvotes";
  let sendQuery = `
    INSERT INTO channel_votes (channel_id, upvotes, downvotes)
    VALUES ('${channel_id}',${channelVotes.upvotes},${channelVotes.downvotes}) 
    ON DUPLICATE KEY UPDATE ${voteToBeUpdated} = ${voteToBeUpdated} + 1`;

  try {
    const connection = await connect();
    await connection.query(sendQuery);
    response.sendStatus(200);
  } catch (error) {
    response.send(error);
  }
})