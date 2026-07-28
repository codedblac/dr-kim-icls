# ICLS CMS - Database Setup Guide

## Overview
This guide walks you through setting up the complete ICLS CMS database schema in Supabase.

## Tables Included

### 1. **blog_posts** - Blog Article Management
- Rich text blog editor with WYSIWYG interface
- Publishing controls (draft/published)
- SEO fields (title, description)
- Cover image support
- Category organization
- **Indexes:** slug, published, category, created_at

### 2. **articles** - Educational Resources & Books
- Educational resources, books, and downloadable files
- Free/paid content with pricing support
- Amazon affiliate links
- File upload support
- **Indexes:** published, category, is_free, created_at

### 3. **testimonials** - Customer Testimonials
- Collect customer feedback and testimonials
- Display toggle to control visibility
- Author role and district tracking
- **Indexes:** display, author_name, created_at

### 4. **subscribers** - Email Newsletter List
- Email subscription management
- Used for newsletters and announcements
- **Indexes:** email, created_at

### 5. **contact_submissions** - Contact Form Submissions
- Captures form submissions with full details
- Tracks name, email, phone, district, reason, message
- **Indexes:** email, created_at

### 6. **admin_users** - Admin Account Management
- Admin account creation and management
- **Approval System**: New admins must be approved before login
- Role-based access: admin (full) or editor (content only)
- Tracks creation and approval with timestamps
- Active/inactive status toggle
- **Indexes:** email, role, is_approved, is_active, created_at

## How to Set Up

### Step 1: Open Supabase SQL Editor
1. Go to https://supabase.com
2. Log into your project
3. Click **SQL Editor** in the left sidebar

### Step 2: Create Tables
1. Copy the entire content from `database-schema.sql`
2. Paste it into the SQL Editor
3. Click **Run** or press Cmd+Enter (Mac) / Ctrl+Enter (Windows)

### Step 3: Verify Tables Were Created
1. Go to the **Table Editor** in Supabase
2. You should see 6 tables:
   - blog_posts
   - articles
   - testimonials
   - subscribers
   - contact_submissions
   - admin_users

### Step 4: Set Up First Admin Account (Manual)
In the SQL Editor, run:
```sql
-- Insert your first admin user after they sign up
INSERT INTO public.admin_users (id, email, full_name, role, is_approved)
SELECT id, email, 'Admin Name', 'admin', TRUE
FROM auth.users
WHERE email = 'your-email@example.com'
ON CONFLICT (email) DO NOTHING;
```

Replace `your-email@example.com` with the email of your first admin account.

## Admin Features

### Blog Post Editor
- **WYSIWYG Editor** with formatting tools:
  - Headings (H1, H2, H3, H4)
  - Text formatting (Bold, Italic, Underline)
  - Lists (Bullet and Numbered)
  - Highlight/Color
  - Image upload with drag-and-drop
- **Real-time HTML preview**
- **Publish/Draft controls**
- **SEO fields** for search optimization

### Admin Account Management
- **Create Admin Accounts** - Add new administrators
- **Approval Workflow** - New accounts require approval before login
- **Edit Accounts** - Manage user roles (admin/editor) and status
- **Delete Accounts** - Remove accounts with confirmation
- **Forgot Password** - Email-based password reset
- **Login Approval Check** - Unapproved accounts cannot login

### Content Management
- **Manage Blog Posts** - Create, edit, publish blog articles
- **Manage Articles** - Handle resources, books, and files
- **Manage Testimonials** - Collect and display testimonials
- **View Subscribers** - See email newsletter subscribers
- **View Contact Submissions** - Review contact form submissions

## Security Features

### Row-Level Security (RLS)
- All tables have RLS enabled
- Public read access to published content only
- Authenticated access for admin operations
- Admin-only write access to content

### Admin Account Approval
- New admin accounts created with `is_approved = FALSE`
- Cannot login until approved by an existing admin
- Approval tracked with `approved_by` and `approved_at`
- Only approved admins can create/approve new accounts

### Access Control
- **Public Users** - Can read published posts/articles/testimonials
- **Public Forms** - Can submit contact forms and subscribe
- **Authenticated Admins** - Can manage all content
- **Admin Role** - Can create/approve new admin accounts
- **Editor Role** - Can only manage content, not accounts

## Tables at a Glance

| Table | Purpose | Public Access | Admin Access |
|-------|---------|---|---|
| blog_posts | Blog articles | Read published | Full |
| articles | Resources/books | Read published | Full |
| testimonials | Customer quotes | Read displayed | Full |
| subscribers | Email list | Insert (signup) | Read |
| contact_submissions | Form data | Insert (form) | Read |
| admin_users | Admin accounts | None | Create/Edit/Delete* |

*Only admins with is_approved=TRUE

## Important Notes

1. **First Admin Setup**: After creating the first user account via Supabase Auth, manually approve them using the SQL update above
2. **Approval Requirement**: All subsequent admins will need approval before they can login
3. **Sample Data**: The schema includes sample blog post, article, and testimonial for reference
4. **Indexes**: All tables have indexes on commonly queried fields for performance
5. **Constraints**: admin_users enforces role values and cascades on user deletion

## Troubleshooting

### "Permission denied" errors
- Check that RLS policies are set correctly
- Ensure user is authenticated and approved

### Can't login after creating account
- Verify `is_approved = TRUE` in admin_users table
- Check that email matches auth.users email

### Images not uploading
- Verify Blob storage is configured
- Check that `/api/upload-image` endpoint is accessible
- Ensure file is under 5MB and is an image type

## Next Steps

1. Set up environment variables in Vercel
2. Connect GitHub repository
3. Deploy to Vercel
4. Create first admin account
5. Approve your account
6. Start managing content!

---

For support, check the Vercel dashboard logs and Supabase logs.
