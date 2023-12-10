'use client';

import { useWallet } from '@solana/wallet-adapter-react';

import type { Post } from '@/lib/models';
import { condensePublicKey } from '@/lib/utils/public-keys';
import MaybeLink from './maybe-link';
import ProfilePicture from './profile-picture';

// Import necessary modules and components

export interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  // Extract post details
  const { author, content, createdAt, timestamp, id } = post;

  // Check if the current user is the author of the post
  const { publicKey } = useWallet();
  const isCurrentUserAuthor =
    publicKey && publicKey.toBase58() === author.owner.toBase58();
  const authorLink = isCurrentUserAuthor ? '/profile' : `/authors/${author.id}`;

  const postLink = `/posts/${id}`;

  return (
    <article className="flex py-4 bg-white shadow-md rounded-md">
      <ProfilePicture publicKey={author.owner} />
      <div className="ml-4 flex flex-col">
        <header className="flex items-center font-mono">
          <h1 className="m-0 font-medium lowercase leading-none text-blue-600">
            <MaybeLink href={authorLink}>{author.name}</MaybeLink>
          </h1>
          <p className="relative top-px my-0 ml-2 text-sm lowercase leading-none text-neutral-500">
            {condensePublicKey(author.owner.toBase58())} •{' '}
            <MaybeLink href={postLink}>
              <time dateTime={new Date(timestamp).toISOString()}>
                {createdAt}
              </time>
            </MaybeLink>
          </p>
        </header>
        <p className="mx-0 mb-0 mt-2 text-gray-800">{content}</p>
      </div>
    </article>
  );
}
