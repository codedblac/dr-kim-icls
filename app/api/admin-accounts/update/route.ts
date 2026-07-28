import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function PUT(request: NextRequest) {
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

    if (!adminUser || !Array.isArray(adminUser) || adminUser[0]?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { userId, fullName, role, isActive } = await request.json()

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    if (!['admin', 'editor'].includes(role)) {
      return NextResponse.json({ error: 'Invalid role' }, { status: 400 })
    }

    // Update admin user record
    const { error: updateError } = await supabase
      .from('admin_users')
      .update({
        full_name: fullName,
        role,
        is_active: isActive,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId)

    if (updateError) {
      console.error('[v0] Update admin account error:', updateError)
      return NextResponse.json({ error: updateError.message || 'Failed to update account' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[v0] Update admin account error:', error)
    const errorMsg = error instanceof Error ? error.message : 'An error occurred'
    return NextResponse.json({ error: errorMsg }, { status: 500 })
  }
}
