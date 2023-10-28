import { ImageResponse, NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams
    const title = searchParams.get('title') || 'Hello there!'

    const poppinsBoldP = fetch(
      new URL('../../../public/fonts/Poppins-Bold.ttf', import.meta.url),
    ).then(res => res.arrayBuffer())

    const poppinsMediumP = fetch(
      new URL('../../../public/fonts/Poppins-Medium.ttf', import.meta.url),
    ).then(res => res.arrayBuffer())

    const poppinsBold = await poppinsBoldP
    const poppinsMedium = await poppinsMediumP

    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            backgroundColor: '#152d4a',
            fontFamily: 'Poppins, sans-serif',
            padding: '40px',
            color: '#F2FAF7',
            border: '20px solid #0B6098',
          }}
        >
          <span
            style={{
              position: 'absolute',
              right: 10,
              top: '55%',
              transform: 'translateY(-50%)',
            }}
          >
            <svg
              width={389}
              viewBox="0 0 276 276"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="138"
                cy="138"
                r="130"
                stroke="url(#paint0_linear_622_105)"
                stroke-width="18"
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
          </span>

          <div
            style={{
              backgroundImage:
                'linear-gradient(90deg, rgba(21,45,74,0.72) 0%, rgba(21,45,74,1) 100%)',
              position: 'absolute',
              left: 0,
              bottom: 0,
              top: 0,
              right: 0,
            }}
          ></div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              width: '100%',
            }}
          >
            <h1
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: 72,
                display: 'flex',
                alignItems: 'center',
                flex: 1,
                fontWeight: 700,
                lineHeight: 1.25,
                marginBottom: 0,
                marginTop: 0,
              }}
            >
              {title}
            </h1>
            <p
              style={{
                fontFamily: 'Poppins, sans-serif',
                marginTop: 'auto',
                fontSize: 28,
                fontWeight: 500,
                marginBottom: 0,
              }}
            >
              ekrresa.com
            </p>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Poppins',
            data: poppinsMedium,
            weight: 500,
            style: 'normal',
          },
          {
            name: 'Poppins',
            data: poppinsBold,
            weight: 700,
            style: 'normal',
          },
        ],
      },
    )
  } catch (error: any) {
    console.log(error.message)

    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}
