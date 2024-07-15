import { FastifyReply, FastifyRequest } from "fastify";

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify();

  const user = request.user as { sub: string };
  console.log(user.sub);

  return reply.status(200).send();
}
