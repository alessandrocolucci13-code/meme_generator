import { i } from '@instantdb/react';

export const schema = i.schema({
  entities: {
    memes: i.entity({
      imageData: i.string(),
      topText: i.string(),
      bottomText: i.string(),
      createdAt: i.number(),
      userId: i.string().indexed(),
    }),
    upvotes: i.entity({
      createdAt: i.number(),
      userId: i.string().indexed(),
    }),
  },
  links: {
    memeUpvotes: {
      forward: { on: 'upvotes', has: 'one', label: 'meme' },
      reverse: { on: 'memes', has: 'many', label: 'upvotes' },
    },
  },
});
