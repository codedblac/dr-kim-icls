import { get } from '@vercel/blob'
import { type NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const pathname = request.nextUrl.searchParams.get('pathname')

    if (!pathname) {
      return NextResponse.json({ error: 'Missing pathname' }, { status: 400 })
    }

    console.log('[v0] Fetching blob:', pathname)

    const result = await get(pathname, {
      access: 'private',
      ifNoneMatch: request.headers.get('if-none-match') ?? undefined,
    })

    if (!result) {
      return new NextResponse('Not found', { status: 404 })
    }

    // Blob hasn't changed — tell browser to use cached copy
    if (result.statusCode === 304) {
      return new NextResponse(null, {
        status: 304,
        headers: {
          ETag: result.blob.etag,
          'Cache-Control': 'private, max-age=31536000',
        },
      })
    }

    return new NextResponse(result.stream, {
      headers: {
        'Content-Type': result.blob.contentType,
        'Content-Disposition': `inline; filename="${result.blob.pathname.split('/').pop() || 'file'}"`,
        ETag: result.blob.etag,
        'Cache-Control': 'private, max-age=31536000',
      },
    })
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error)
    console.error('[v0] Blob serve error:', errorMsg)
    return NextResponse.json({ error: 'Failed to serve file' }, { status: 500 })
  }
}
