CREATE TABLE IF NOT EXISTS blog_posts (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  excerpt TEXT NOT NULL,
  content LONGTEXT NOT NULL,
  district VARCHAR(80) NOT NULL,
  focus_keyword VARCHAR(160) NOT NULL,
  meta_title VARCHAR(255) NOT NULL,
  meta_description VARCHAR(320) NOT NULL,
  status ENUM('draft','published') NOT NULL DEFAULT 'published',
  published_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL,
  INDEX idx_district (district),
  INDEX idx_status_published (status, published_at),
  INDEX idx_keyword (focus_keyword)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS contact_messages (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  phone VARCHAR(40) NOT NULL,
  district VARCHAR(80) DEFAULT NULL,
  message TEXT NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
