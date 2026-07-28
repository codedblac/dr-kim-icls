import { put } from '@vercel/blob'
import { type NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      console.error('[v0] No file in request')
      return NextResponse.json({ error: 'No file provided', details: 'File is required' }, { status: 400 })
    }

    // Validate file is an image
    if (!file.type.startsWith('image/')) {
      console.error('[v0] Invalid file type:', file.type)
      return NextResponse.json({ error: 'File must be an image', details: `Got ${file.type}` }, { status: 400 })
    }

    // Limit file size to 5MB
    if (file.size > 5 * 1024 * 1024) {
      console.error('[v0] File too large:', file.size)
      return NextResponse.json({ error: 'File size must be less than 5MB', details: `Got ${file.size} bytes` }, { status: 400 })
    }

    const timestamp = Date.now()
    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '-').toLowerCase()
    const filename = `blog-images/${timestamp}-${safeName}`

    console.log('[v0] Uploading to Blob:', { filename, fileSize: file.size, fileType: file.type })
    
    const blob = await put(filename, file, {
      access: 'private',
    })

    console.log('[v0] Blob upload successful:', { url: blob.url, size: blob.size })

    return NextResponse.json({
      url: blob.url,
      pathname: blob.pathname,
      filename: blob.filename,
      size: blob.size,
    })
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error)
    const errorName = error instanceof Error ? error.name : 'Unknown'
    
    console.error('[v0] Image upload failed:', {
      error: errorMsg,
      name: errorName,
      token: process.env.BLOB_READ_WRITE_TOKEN ? 'SET' : 'MISSING',
      env: process.env.NODE_ENV,
    })
    
    // Check for token issues
    if (errorMsg.includes('BLOB_READ_WRITE_TOKEN') || !process.env.BLOB_READ_WRITE_TOKEN) {
      return NextResponse.json({ 
        error: 'Storage not configured',
        details: 'Blob storage token missing'
      }, { status: 500 })
    }

    return NextResponse.json({ 
      error: 'Upload failed',
      details: errorMsg
    }, { status: 500 })
  }
}
