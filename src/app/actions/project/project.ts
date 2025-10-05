import { prisma } from "@/lib/prismaClient";

export async function GET() {
  const posts = await prisma.post.findMany();
  return Response.json(posts);
}

export async function POST(req: Request) {
  const { title, content } = await req.json();
  const newPost = await prisma.post.create({
    data: { title, content },
  });
  return Response.json(newPost);
}
