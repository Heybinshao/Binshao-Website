import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url")

  if (!url) {
    return new NextResponse("Missing url parameter", { status: 400 })
  }

  try {
    const response = await fetch(decodeURIComponent(url), {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.6099.230 Mobile Safari/537.36",
        Referer: "https://mp.weixin.qq.com/",
      },
    })

    if (!response.ok) {
      return new NextResponse(`Fetch failed: ${response.status}`, {
        status: response.status,
      })
    }

    const blob = await response.blob()

    return new NextResponse(blob, {
      headers: {
        "Content-Type": response.headers.get("content-type") || "image/jpeg",
        "Cache-Control": "public, max-age=604800, immutable",
      },
    })
  } catch (error) {
    return new NextResponse(
      `Proxy error: ${error instanceof Error ? error.message : String(error)}`,
      { status: 500 }
    )
  }

  // No-op for video streaming (returned from try block above)
  // Videos are handled the same way — just pass through with correct User-Agent
}

export const config = {
  runtime: "nodejs",
}
