import { TwitterApi, TwitterApiReadWrite} from 'twitter-api-v2';
import { env } from "../env.js";

class TwitterService {
  private client: TwitterApi;
  private rwClient: TwitterApiReadWrite;

  constructor() {
    this.client = new TwitterApi({
      appKey: env.TWITTER_API_KEY,
      appSecret: env.TWITTER_API_SECRET,
      accessToken: env.TWITTER_ACCESS_TOKEN,
      accessSecret: env.TWITTER_ACCESS_TOKEN_SECRET,
    });
    this.rwClient = this.client.readWrite;
  }

  async postTweet(tweetText: string) {
    try {
      const { data: createdTweet } = await this.rwClient.v2.tweet(tweetText);
      console.log('Tweet posted successfully:', createdTweet);
      return `Tweet posted successfully: https://x.com/i/web/status/${createdTweet.id}`;
    } catch (error: unknown) {
      console.error('Error posting tweet:', error);
      let errorMessage = 'An unknown error occurred.';
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }
      throw new Error(`Failed to post tweet: ${errorMessage}`);
    }
  }
}

export const twitterService = new TwitterService();