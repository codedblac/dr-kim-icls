-- ============================================================================
-- ICLS BLOG & CMS - COMPLETE DATABASE SCHEMA
-- ============================================================================
-- Copy and paste this entire script into your Supabase SQL Editor
-- This schema includes all tables for the blog, articles, testimonials, 
-- subscribers, contact submissions, and admin user management with 
-- approval system and row-level security.
-- ============================================================================

-- ============================================================================
-- 1. BLOG POSTS TABLE - For managing blog articles
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  body TEXT NOT NULL,
  cover_image_url TEXT,
  category TEXT,
  seo_title TEXT,
  seo_description TEXT,
  published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON public.blog_posts (slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON public.blog_posts (published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON public.blog_posts (category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_created_at ON public.blog_posts (created_at DESC);

-- ============================================================================
-- 2. ARTICLES TABLE - For managing educational resources and books
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  cover_image_url TEXT,
  category TEXT,
  amazon_url TEXT,
  file_url TEXT,
  price NUMERIC(10, 2),
  is_free BOOLEAN DEFAULT FALSE,
  published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_articles_published ON public.articles (published);
CREATE INDEX IF NOT EXISTS idx_articles_category ON public.articles (category);
CREATE INDEX IF NOT EXISTS idx_articles_is_free ON public.articles (is_free);
CREATE INDEX IF NOT EXISTS idx_articles_created_at ON public.articles (created_at DESC);

-- ============================================================================
-- 3. TESTIMONIALS TABLE - For managing customer testimonials
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_name TEXT NOT NULL,
  author_role TEXT,
  author_district TEXT,
  quote TEXT NOT NULL,
  display BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_testimonials_display ON public.testimonials (display);
CREATE INDEX IF NOT EXISTS idx_testimonials_author_name ON public.testimonials (author_name);
CREATE INDEX IF NOT EXISTS idx_testimonials_created_at ON public.testimonials (created_at DESC);

-- ============================================================================
-- 4. SUBSCRIBERS TABLE - For email newsletter subscription list
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_subscribers_email ON public.subscribers (email);
CREATE INDEX IF NOT EXISTS idx_subscribers_created_at ON public.subscribers (created_at DESC);

-- ============================================================================
-- 5. CONTACT SUBMISSIONS TABLE - For form submissions
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  district TEXT,
  reason TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON public.contact_submissions (email);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON public.contact_submissions (created_at DESC);

-- ============================================================================
-- 6. ADMIN USERS TABLE - For admin account management with approval system
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  role TEXT NOT NULL DEFAULT 'editor' CHECK (role IN ('admin', 'editor')),
  is_active BOOLEAN DEFAULT TRUE,
  is_approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  approved_by UUID REFERENCES auth.users(id),
  approved_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON public.admin_users (email);
CREATE INDEX IF NOT EXISTS idx_admin_users_role ON public.admin_users (role);
CREATE INDEX IF NOT EXISTS idx_admin_users_is_approved ON public.admin_users (is_approved);
CREATE INDEX IF NOT EXISTS idx_admin_users_is_active ON public.admin_users (is_active);
CREATE INDEX IF NOT EXISTS idx_admin_users_created_at ON public.admin_users (created_at DESC);

-- ============================================================================
-- ENABLE ROW LEVEL SECURITY (RLS) ON ALL TABLES
-- ============================================================================

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- RLS POLICIES - PUBLIC READ ACCESS
-- ============================================================================

-- Blog posts: Public can read published posts
CREATE POLICY "blog_posts_public_read" 
  ON public.blog_posts 
  FOR SELECT 
  USING (published = TRUE);

-- Articles: Public can read published articles
CREATE POLICY "articles_public_read" 
  ON public.articles 
  FOR SELECT 
  USING (published = TRUE);

-- Testimonials: Public can read displayed testimonials
CREATE POLICY "testimonials_public_read" 
  ON public.testimonials 
  FOR SELECT 
  USING (display = TRUE);

-- Subscribers: Public can insert (for email signup form)
CREATE POLICY "subscribers_public_insert" 
  ON public.subscribers 
  FOR INSERT 
  WITH CHECK (true);

-- Contact submissions: Public can insert (for contact form)
CREATE POLICY "contact_submissions_public_insert" 
  ON public.contact_submissions 
  FOR INSERT 
  WITH CHECK (true);

-- ============================================================================
-- RLS POLICIES - AUTHENTICATED ADMIN ACCESS
-- ============================================================================

-- Blog posts: Authenticated users (admins) can read all and manage all
CREATE POLICY "blog_posts_admin_all" 
  ON public.blog_posts 
  FOR ALL 
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Articles: Authenticated users (admins) can read all and manage all
CREATE POLICY "articles_admin_all" 
  ON public.articles 
  FOR ALL 
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Testimonials: Authenticated users (admins) can read all and manage all
CREATE POLICY "testimonials_admin_all" 
  ON public.testimonials 
  FOR ALL 
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Subscribers: Authenticated users (admins) can read all
CREATE POLICY "subscribers_admin_read" 
  ON public.subscribers 
  FOR SELECT 
  USING (auth.role() = 'authenticated');

-- Contact submissions: Authenticated users (admins) can read all
CREATE POLICY "contact_submissions_admin_read" 
  ON public.contact_submissions 
  FOR SELECT 
  USING (auth.role() = 'authenticated');

-- ============================================================================
-- RLS POLICIES - ADMIN USER MANAGEMENT (with approval requirement)
-- ============================================================================

-- Admin users: Authenticated users can read all admin accounts
CREATE POLICY "admin_users_authenticated_read" 
  ON public.admin_users 
  FOR SELECT 
  USING (auth.role() = 'authenticated');

-- Admin users: Only admins can create new admin accounts
CREATE POLICY "admin_users_create" 
  ON public.admin_users 
  FOR INSERT 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.admin_users 
      WHERE id = auth.uid() AND role = 'admin' AND is_approved = TRUE
    )
  );

-- Admin users: Only admins can update admin accounts
CREATE POLICY "admin_users_update" 
  ON public.admin_users 
  FOR UPDATE 
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_users 
      WHERE id = auth.uid() AND role = 'admin' AND is_approved = TRUE
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.admin_users 
      WHERE id = auth.uid() AND role = 'admin' AND is_approved = TRUE
    )
  );

-- Admin users: Only admins can delete admin accounts
CREATE POLICY "admin_users_delete" 
  ON public.admin_users 
  FOR DELETE 
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_users 
      WHERE id = auth.uid() AND role = 'admin' AND is_approved = TRUE
    )
  );

-- ============================================================================
-- OPTIONAL SEED DATA - Remove these sections if you don't want sample data
-- ============================================================================

-- Sample blog post
INSERT INTO public.blog_posts (title, slug, excerpt, body, category, seo_title, seo_description, published)
VALUES (
  'Welcome to ICLS',
  'welcome-to-icls',
  'Get started with ICLS educational resources and expertise.',
  '<h2>Welcome to ICLS</h2><p>Welcome to the ICLS Blog. This is a sample blog post to help you get started. Edit or delete this post and create your own content using the admin dashboard.</p>',
  'Leadership',
  'Welcome to ICLS',
  'Get started with ICLS educational resources and expertise.',
  TRUE
)
ON CONFLICT (slug) DO NOTHING;

-- Sample article/resource
INSERT INTO public.articles (title, description, category, is_free, published)
VALUES (
  'Sample Educational Resource',
  'This is a sample educational resource to get you started with managing articles in the ICLS platform. You can edit, delete, or create new articles from the admin dashboard.',
  'Literacy',
  TRUE,
  TRUE
)
ON CONFLICT DO NOTHING;

-- Sample testimonial
INSERT INTO public.testimonials (author_name, author_role, author_district, quote, display)
VALUES (
  'Jane Smith',
  'District Superintendent',
  'Example School District',
  'ICLS has transformed how our district approaches professional development and leadership training.',
  TRUE
)
ON CONFLICT DO NOTHING;

-- ============================================================================
-- SUMMARY OF TABLES AND FEATURES
-- ============================================================================
-- 
-- TABLE: blog_posts
--   - Manage blog articles with rich text editing
--   - SEO fields for title and description
--   - Publishing controls (draft/published)
--   - Cover image support
--   
-- TABLE: articles
--   - Manage educational resources, books, and downloadable files
--   - Free/paid content support
--   - Amazon links for book recommendations
--   - File upload support
--   
-- TABLE: testimonials
--   - Collect and display customer testimonials
--   - Display toggle to control which testimonials show on website
--   - Author role and district tracking
--   
-- TABLE: subscribers
--   - Email newsletter subscription list
--   - Used for email marketing and announcements
--   
-- TABLE: contact_submissions
--   - Collect form submissions from contact form
--   - Track name, email, phone, reason, and message
--   
-- TABLE: admin_users
--   - Manage admin account access
--   - Role-based access control (admin or editor)
--   - APPROVAL SYSTEM: New accounts must be approved before login
--   - Track who created and approved each account
--   - Active/inactive toggle for account status
--
-- SECURITY FEATURES:
--   - Row-Level Security (RLS) on all tables
--   - Public read access to published content only
--   - Authenticated-only admin access
--   - Admin-only account management
--   - Approval requirement for new admin accounts
--   - Login validation ensures approved status
--
-- ============================================================================
