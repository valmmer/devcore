'use client';
import { useTransition } from 'react';
import { Heart } from 'lucide-react';
import { likePost } from '@/app/actions';

export default function LikeButton({
  postId,
  count,
}: {
  postId: number;
  count: number;
}) {
  const [pending, start] = useTransition();
  return (
    <button
      className="btn-primary inline-flex items-center gap-2 disabled:opacity-60"
      onClick={() => start(() => likePost(postId))}
      disabled={pending}
      aria-label="Curtir post"
    >
      <Heart size={18} aria-hidden />
      <span>{count}</span>
    </button>
  );
}
