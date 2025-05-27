import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

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
            <svg width="376" viewBox="0 0 376 378" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse
                cx="188"
                cy="189"
                rx="180"
                ry="181"
                stroke="url(#paint0_linear_1032_62)"
                stroke-width="16"
                stroke-miterlimit="3.99933"
              />
              <path
                d="M87.0447 141.607C87.0447 109.707 112.904 83.8477 144.804 83.8477H270.675C273.543 83.8477 275.867 86.1721 275.867 89.0395V89.0395C275.867 120.939 250.007 146.799 218.108 146.799H92.2365C89.3691 146.799 87.0447 144.474 87.0447 141.607V141.607Z"
                fill="#F2FAF7"
              />
              <path
                d="M86.5955 234.824C86.5955 231.956 88.9199 229.632 91.7873 229.632H217.659C249.558 229.632 275.418 255.492 275.418 287.391V287.391C275.418 290.258 273.093 292.583 270.226 292.583H144.355C112.455 292.583 86.5955 266.723 86.5955 234.824V234.824Z"
                fill="#F2FAF7"
              />
              <rect
                x="65.1154"
                y="161.419"
                width="190.385"
                height="55.1619"
                rx="27.5809"
                fill="#F2FAF7"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_1032_62"
                  x1="188"
                  y1="8"
                  x2="188"
                  y2="370"
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
              backgroundColor: '#0d1d30f5',
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
