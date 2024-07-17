import { FastifyReply, FastifyRequest } from 'fastify'

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify({ onlyCookie: true })

  const refreshRequest = request.user as { sub: string };
  const refreshId = String(refreshRequest.sub);

  const token = await reply.jwtSign(
    {},
    {
      sign: {
        sub: refreshId,
      },
    },
  )

  const refreshToken = await reply.jwtSign(
    {},
    {
      sign: {
        sub: refreshId,
        expiresIn: '7d',
      },
    },
  )

  return reply
    .setCookie('refreshToken', refreshToken, {
      path: '/',
      secure: true,
      sameSite: true,
      httpOnly: true,
    })
    .status(200)
    .send({
      token,
    })
}