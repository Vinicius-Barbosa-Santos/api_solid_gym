import { FastifyReply, FastifyRequest } from 'fastify'
import { makeGetUserMetricsUseCase } from '../../../use-cases/factories/make-get-user-metrics-use-case'

export async function metrics(request: FastifyRequest, reply: FastifyReply) {
  const getUserMetricsUseCase = makeGetUserMetricsUseCase()

  const checkInRequest = request.user as { sub: string };
  const checkInId = String(checkInRequest.sub); 

  const { checkInsCount } = await getUserMetricsUseCase.execute({
    userId: checkInId,
  })

  return reply.status(200).send({
    checkInsCount,
  })
}