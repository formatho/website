-- Email Subscribers Database Schema
-- Use with SQLite (Agent Orchestrator database)

-- Email subscribers table
CREATE TABLE IF NOT EXISTS email_subscribers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  source TEXT NOT NULL CHECK(source IN ('homepage', 'pricing', 'blog', 'footer', 'banner', 'popup', 'contextual')),
  interested_in TEXT CHECK(interested_in IN ('tools', 'orchestrator', 'both')),
  metadata TEXT, -- JSON string for additional metadata
  ab_variant TEXT, -- A/B test variant (A or B)
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  confirmed BOOLEAN DEFAULT 0,
  unsubscribed BOOLEAN DEFAULT 0,
  unsubscribed_at DATETIME,
  welcome_email_sent BOOLEAN DEFAULT 0,
  welcome_email_sent_at DATETIME,
  day3_email_sent BOOLEAN DEFAULT 0,
  day7_email_sent BOOLEAN DEFAULT 0
);

-- Index for quick email lookups
CREATE INDEX IF NOT EXISTS idx_email_subscribers_email ON email_subscribers(email);

-- Index for source-based queries
CREATE INDEX IF NOT EXISTS idx_email_subscribers_source ON email_subscribers(source);

-- Index for email sequence tracking
CREATE INDEX IF NOT EXISTS idx_email_subscribers_welcome_pending ON email_subscribers(welcome_email_sent, created_at);

-- Email tracking table for analytics
CREATE TABLE IF NOT EXISTS email_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  subscriber_id INTEGER,
  event_type TEXT NOT NULL CHECK(event_type IN ('sent', 'delivered', 'opened', 'clicked', 'bounced', 'complained', 'unsubscribed')),
  email_type TEXT NOT NULL CHECK(email_type IN ('welcome', 'day3', 'day7', 'announcement', 'newsletter')),
  email_id TEXT, -- Resend email ID
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  metadata TEXT, -- JSON for additional event data
  FOREIGN KEY (subscriber_id) REFERENCES email_subscribers(id)
);

-- Index for event queries
CREATE INDEX IF NOT EXISTS idx_email_events_subscriber ON email_events(subscriber_id);
CREATE INDEX IF NOT EXISTS idx_email_events_type ON email_events(event_type, created_at);

-- Conversion tracking table
CREATE TABLE IF NOT EXISTS email_conversions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  subscriber_id INTEGER,
  conversion_type TEXT NOT NULL CHECK(conversion_type IN ('signup', 'purchase', 'trial_start', 'upgrade')),
  value REAL, -- Revenue value if applicable
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  metadata TEXT,
  FOREIGN KEY (subscriber_id) REFERENCES email_subscribers(id)
);

-- Useful queries:

-- Get subscribers who need welcome email
-- SELECT * FROM email_subscribers WHERE welcome_email_sent = 0 AND unsubscribed = 0;

-- Get subscribers who need day 3 email (created 3+ days ago, welcome sent, day3 not sent)
-- SELECT * FROM email_subscribers 
-- WHERE datetime(created_at) <= datetime('now', '-3 days')
-- AND welcome_email_sent = 1 
-- AND day3_email_sent = 0 
-- AND unsubscribed = 0;

-- Get conversion rate by source
-- SELECT source, COUNT(*) as total, 
--        SUM(CASE WHEN confirmed = 1 THEN 1 ELSE 0 END) as confirmed,
--        ROUND(100.0 * SUM(CASE WHEN confirmed = 1 THEN 1 ELSE 0 END) / COUNT(*), 2) as confirmation_rate
-- FROM email_subscribers 
-- GROUP BY source;

-- Get A/B test results
-- SELECT ab_variant, COUNT(*) as total,
--        ROUND(100.0 * COUNT(*) / (SELECT COUNT(*) FROM email_subscribers WHERE ab_variant IS NOT NULL), 2) as percentage
-- FROM email_subscribers 
-- WHERE source = 'banner' AND ab_variant IS NOT NULL
-- GROUP BY ab_variant;
