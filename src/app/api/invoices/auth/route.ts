import { ApiError } from '@/errors/apiReponseError'
import { NextResponse } from 'next/server'
import path from 'path'
import { promises as fs } from 'fs'
import https from 'https'
import { apiInter } from '@/lib/axios'
import qs from 'querystring'
import { env } from '@/env'
import dayjs from 'dayjs'
import { cookies } from 'next/headers'

const certificatesDirectory = path.join(process.cwd(), 'src', 'certificates')

export async function POST(request: Request) {
  const auth = request.headers.get('Authorization')

  if (!auth) {
    return ApiError({
      message: 'Unauthorized',
      status: 401,
    })
  }
  const token = auth.split(' ')[1]

  if (!token || token !== env.TOKEN_API) {
    return ApiError({
      message: 'Invalid token',
      status: 401,
    })
  }

  const cookieStore = await cookies()

  const cert = await fs.readFile(certificatesDirectory + '/api.crt', 'utf8')
  const key = await fs.readFile(certificatesDirectory + '/api.key', 'utf8')
  const httpsAgent = new https.Agent({
    cert,
    key,
  })

  const data = {
    client_id: env.INTER_CLIENT_ID,
    client_secret: env.INTER_CLIENT_SECRET,
    grant_type: 'client_credentials',
    scope:
      'boleto-cobranca.write boleto-cobranca.read pagamento-pix.write pagamento-pix.read',
  }

  try {
    console.time('Getting Inter token')
    const result = await apiInter.post('/oauth/v2/token', qs.stringify(data), {
      httpsAgent,
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
    })
    console.timeEnd('Getting Inter token')

    if (result.data) {
      const { access_token } = result.data

      const expires = dayjs().add(1, 'hours').toDate()
      cookieStore.set('@baitaclients:vs2:token', access_token, {
        expires,
        path: '/api',
      })

      return NextResponse.json({ token: access_token })
    }
  } catch (error) {
    console.timeEnd('All process')
    console.error(error)
    return ApiError({
      message: 'Error getting Inter token',
      status: 400,
    })
  }
}
