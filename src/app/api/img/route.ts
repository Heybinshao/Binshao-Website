import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url")

  if (!url) {
    return new NextResponse("Missing url parameter", { status: 400 })
  }

  try {
    const decodedUrl = decodeURIComponent(url)
    const response = await fetch(decodedUrl, {
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

    const contentType = response.headers.get("content-type") || ""
    const isVideo = contentType.startsWith("video/")

    if (isVideo) {
      // Stream video response — required for large files
      return new NextResponse(response.body, {
        headers: {
          "Content-Type": contentType,
          "Cache-Control": "public, max-age=86400",
          "Accept-Ranges": "bytes",
        },
      })
    }

    // Image — buffer and cache
    const blob = await response.blob()
    return new NextResponse(blob, {
      headers: {
        "Content-Type": contentType || "image/jpeg",
        "Cache-Control": "public, max-age=604800, immutable",
      },
    })
  } catch (error) {
    return new NextResponse(
      `Proxy error: ${error instanceof Error ? error.message : String(error)}`,
      { status: 500 }
    )
  }
}
