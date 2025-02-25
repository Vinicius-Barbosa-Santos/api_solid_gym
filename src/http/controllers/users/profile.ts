import { makeGetUserProfileUseCase } from "../../../use-cases/factories/make-get-user-profile-use.case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const getUserProfile = makeGetUserProfileUseCase();

  await request.jwtVerify();

  const userRequest = request.user as { sub: string };
  const userId = String(userRequest.sub);

  const { user } = await getUserProfile.execute({
    userId: userId,
  });

  return reply.status(200).send({
    user: {
      ...user,
      password_hash: undefined,
    },
  })
}
