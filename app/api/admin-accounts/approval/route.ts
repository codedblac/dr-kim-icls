import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if user is admin
    const { data: adminUser } = await supabase
      .from('admin_users')
      .select('role')
      .eq('id', user.id)
      .single()

    if (adminUser?.role !== 'admin') {
      return NextResponse.json({ error: 'Only admins can approve accounts' }, { status: 403 })
    }

    const { userId, action } = await request.json()

    if (!userId || !action) {
      return NextResponse.json({ error: 'User ID and action are required' }, { status: 400 })
    }

    if (!['approve', 'reject'].includes(action)) {
      return NextResponse.json({ error: 'Invalid action. Must be approve or reject' }, { status: 400 })
    }

    // Prevent approving/rejecting own account
    if (userId === user.id) {
      return NextResponse.json({ error: 'Cannot approve or reject your own account' }, { status: 400 })
    }

    if (action === 'approve') {
      // Approve the account
      const { error: updateError } = await supabase
        .from('admin_users')
        .update({
          is_approved: true,
          approved_by: user.id,
          approved_at: new Date().toISOString(),
        })
        .eq('id', userId)

      if (updateError) {
        return NextResponse.json({ error: updateError.message }, { status: 400 })
      }

      return NextResponse.json({ success: true, message: 'Account approved' })
    } else if (action === 'reject') {
      // Reject the account - delete it
      const { error: deleteError } = await supabase
        .from('admin_users')
        .delete()
        .eq('id', userId)

      if (deleteError) {
        return NextResponse.json({ error: deleteError.message }, { status: 400 })
      }

      // Also delete the auth user
      await supabase.auth.admin.deleteUser(userId)

      return NextResponse.json({ success: true, message: 'Account rejected and deleted' })
    }
  } catch (error) {
    console.error('[v0] Error processing account approval:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
