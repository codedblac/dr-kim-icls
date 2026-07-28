import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { Resend } from 'resend'

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { first_name, last_name, email, organization, role, message } = body

    // 1. Validate required fields
    if (!first_name || !last_name || !email || !message) {
      return NextResponse.json(
        { error: 'First name, last name, email, and message are required.' },
        { status: 400 },
      )
    }

    // 2. Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
    }

    // ==========================================
    // SYSTEM 1: SAVE TO SUPABASE (INDEPENDENT)
    // ==========================================
    // We attempt to save to the database first. 
    // If it fails, we just log it and move on so it doesn't block the email.
    try {
      const supabase = await createClient()
      const { error: dbError } = await supabase.from('contact_submissions').insert({
        first_name: first_name.trim(),
        last_name: last_name.trim(),
        email: email.toLowerCase().trim(),
        organization: organization?.trim() || null,
        role: role?.trim() || null,
        message: message.trim(),
      })

      if (dbError) {
        console.error('[ICLS] Database insert error:', dbError)
      }
    } catch (dbCatchError) {
      console.error('[ICLS] Database unexpected error:', dbCatchError)
    }

    // ==========================================
    // SYSTEM 2: SEND RESEND EMAIL (STRICT)
    // ==========================================
    // We attempt to send the email.
    // If this fails, we MUST return an error to the user as requested.
    try {
      const { error: emailError } = await resend.emails.send({
        // "onboarding@resend.dev" is a testing email. Update this to your verified domain email later.
        from: 'ICLS Website <onboarding@resend.dev>',
        to: ['codedb693@gmail.com'],
        replyTo: email.toLowerCase().trim(),
        subject: `New Website Inquiry from ${first_name.trim()} ${last_name.trim()}`,
        text: `You have a new inquiry from the ICLS website.

Name: ${first_name.trim()} ${last_name.trim()}
Email: ${email.toLowerCase().trim()}
Organization: ${organization?.trim() || 'Not provided'}
Role: ${role?.trim() || 'Not provided'}

Message:
${message.trim()}`,
      })

      // If the email fails to send, trigger the error response
      if (emailError) {
        console.error('[ICLS] Email sending error:', emailError)
        return NextResponse.json(
          { error: 'Failed to send message to Dr. Miles. Please try again.' }, 
          { status: 500 }
        )
      }
    } catch (emailCatchError) {
      console.error('[ICLS] Email unexpected error:', emailCatchError)
      return NextResponse.json(
        { error: 'Unexpected error while sending email.' }, 
        { status: 500 }
      )
    }

    // If we make it here, the email successfully sent.
    return NextResponse.json({ success: true }, { status: 200 })

  } catch (err) {
    console.error('[ICLS] Contact unexpected error:', err)
    return NextResponse.json({ error: 'Unexpected error.' }, { status: 500 })
  }
}