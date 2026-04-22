import Database from "better-sqlite3";

export const db = new Database("globaledu.db");

export function initDb() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS schools (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT UNIQUE NOT NULL,
      name_zh TEXT NOT NULL,
      name_en TEXT NOT NULL,
      country TEXT NOT NULL,
      city TEXT NOT NULL,
      type TEXT,
      qs_ranking INTEGER,
      tuition_range TEXT,
      language_requirements TEXT,
      popular_majors TEXT,
      application_deadline TEXT,
      website_url TEXT,
      introduction TEXT,
      image_url TEXT,
      scholarship_info TEXT,
      degree_tags TEXT,
      difficulty_tag TEXT,
      employment_tag TEXT,
      is_art_school INTEGER DEFAULT 0,
      major_ranking TEXT,
      gpa_requirements TEXT,
      campus_features TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Migrations for new fields
  try { db.exec("ALTER TABLE schools ADD COLUMN application_difficulties TEXT;"); } catch (e) {}
  try { db.exec("ALTER TABLE schools ADD COLUMN budget_estimation TEXT;"); } catch (e) {}
  try { db.exec("ALTER TABLE schools ADD COLUMN application_advice TEXT;"); } catch (e) {}
  try { db.exec("ALTER TABLE schools ADD COLUMN major_details TEXT;"); } catch (e) {}

  // Populate sample data for MIT if empty
  try {
    db.exec(`
      UPDATE schools 
      SET application_difficulties = '录取率极低（约4%），对数学和科学竞赛成绩要求极高，非常看重申请者的创新能力和领导力。',
          budget_estimation = '$80,000 - $90,000（含学费及生活费）',
          application_advice = '建议提前2-3年开始准备高含金量的科研项目或国际竞赛。11年级下学期需取得理想的标化成绩。'
      WHERE slug = 'mit' AND application_difficulties IS NULL;
    `);
  } catch (e) {
    console.error("Migration error:", e);
  }
}
