'use server';

import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

async function getFingerprint() {
  const jar = await cookies(); // ✅ Next 15: é async
  let fp = jar.get('dc_fp')?.value;

  if (!fp) {
    fp = crypto.randomUUID();
    // Em Server Actions o runtime permite set(), mas a tipagem pode vir readonly.
    // Fazemos um cast local para não brigar com o TS.
    (
      jar as unknown as {
        set: (name: string, value: string, opts?: any) => void;
      }
    ).set('dc_fp', fp, {
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
      maxAge: 60 * 60 * 24 * 365, // 1 ano (em segundos)
      path: '/',
    });
  }
  return fp;
}

export async function likePost(postId: number) {
  const fp = await getFingerprint(); // ✅ aguarde o fingerprint
  try {
    await prisma.like.create({ data: { postId, fingerprint: fp } });
    await prisma.post.update({
      where: { id: postId },
      data: { likes: { increment: 1 } },
    });
  } catch {
    // unique constraint → já curtiu com esse fingerprint; ignore
  }
  revalidatePath('/');
}

export async function addComment(postId: number, formData: FormData) {
  const author = ((formData.get('author') as string) || '').trim();
  const body = ((formData.get('body') as string) || '').trim();
  if (body.length < 2) return;

  await prisma.comment.create({
    data: { postId, author: author || null, body },
  });

  revalidatePath('/');
}
