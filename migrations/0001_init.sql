-- grok-fun-community: 使い捨て DB。消えても記事は静的に配信される。
-- 復旧: pnpm d1:migrate（データは戻らない）

CREATE TABLE IF NOT EXISTS comments (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  slug       TEXT    NOT NULL,
  nickname   TEXT    NOT NULL DEFAULT '匿名',
  body       TEXT    NOT NULL,
  ip_hash    TEXT    NOT NULL,
  created_at TEXT    NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  hidden     INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS idx_comments_slug_created ON comments(slug, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_comments_slug_ip_created ON comments(slug, ip_hash, created_at DESC);

CREATE TABLE IF NOT EXISTS reactions (
  slug  TEXT    NOT NULL,
  emoji TEXT    NOT NULL,
  count INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (slug, emoji)
);

CREATE TABLE IF NOT EXISTS reports (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  comment_id INTEGER NOT NULL,
  ip_hash    TEXT    NOT NULL,
  created_at TEXT    NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  UNIQUE (comment_id, ip_hash)
);
CREATE INDEX IF NOT EXISTS idx_reports_created ON reports(created_at);
