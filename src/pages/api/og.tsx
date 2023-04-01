import { NextRequest } from 'next/server'
import { ImageResponse } from '@vercel/og'

export const config = {
  runtime: 'edge',
}

const interBoldP = fetch(
  new URL('../../../public/fonts/Inter-Bold.ttf', import.meta.url).href
).then(res => res.arrayBuffer())

const interMediumP = fetch(
  new URL('../../../public/fonts/Inter-Medium.ttf', import.meta.url).href
).then(res => res.arrayBuffer())

export default async function OpenGraph(req: NextRequest) {
  try {
    const interBold = await interBoldP
    const interMedium = await interMediumP

    const { searchParams } = new URL(req.url)
    const title = searchParams.get('title') || 'Hello There'

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundColor: '#152d4a',
            fontFamily: 'Inter',
            padding: '40px',
            color: '#F2FAF7',
          }}
        >
          <svg
            width={84}
            viewBox="0 0 276 276"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="138"
              cy="138"
              r="130"
              stroke="url(#paint0_linear_622_105)"
              stroke-width="16"
              stroke-miterlimit="3.99933"
            />
            <path
              d="M65.0879 103.961C65.0879 81.0494 83.6611 62.4762 106.572 62.4762H197.731C199.79 62.4762 201.46 64.1457 201.46 66.2051V66.2051C201.46 89.1164 182.886 107.69 159.975 107.69H68.8168C66.7574 107.69 65.0879 106.02 65.0879 103.961V103.961Z"
              fill="#F2FAF7"
            />
            <path
              d="M64.7634 170.912C64.7634 168.853 66.4329 167.183 68.4924 167.183H159.651C182.562 167.183 201.135 185.756 201.135 208.668V208.668C201.135 210.727 199.466 212.397 197.406 212.397H106.248C83.3367 212.397 64.7634 193.823 64.7634 170.912V170.912Z"
              fill="#F2FAF7"
            />
            <rect
              x="49.25"
              y="118.19"
              width="137.5"
              height="39.619"
              rx="19.8095"
              fill="#F2FAF7"
            />
            <defs>
              <linearGradient
                id="paint0_linear_622_105"
                x1="138"
                y1="8"
                x2="138"
                y2="268"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#E6E8E6" />
                <stop offset="0.234375" stop-color="#0B6098" />
                <stop offset="0.734375" stop-color="#0B6098" />
                <stop offset="1" stop-color="#DF7373" />
              </linearGradient>
            </defs>
          </svg>

          <h1
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 72,
              fontWeight: 700,
              marginBottom: 0,
              marginTop: 0,
              lineHeight: 1.25,
            }}
          >
            {title}
          </h1>

          <p
            style={{
              textAlign: 'right',
              color: '#F2FAF7',
              fontWeight: 500,
              marginLeft: 'auto',
              marginBottom: 0,
              marginTop: 0,
              fontFamily: 'Inter, sans-serif',
              fontSize: 32,
            }}
          >
            ekrresa.com
          </p>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Inter',
            data: interMedium,
            weight: 500,
            style: 'normal',
          },
          {
            name: 'Inter',
            data: interBold,
            weight: 700,
            style: 'normal',
          },
        ],
      }
    )
  } catch (error: any) {
    console.log(`${error.message}`)

    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}
