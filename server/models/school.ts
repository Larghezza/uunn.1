import { db } from "../db.js";

// 5. 给新增/修改接口加字段白名单
const ALLOWED_FIELDS = [
  "slug", "name_zh", "name_en", "country", "city", "type", "qs_ranking", "tuition_range",
  "language_requirements", "popular_majors", "application_deadline", "website_url",
  "introduction", "image_url", "scholarship_info", "degree_tags", "difficulty_tag", 
  "employment_tag", "is_art_school", "major_ranking", "gpa_requirements", "campus_features",
  "application_difficulties", "budget_estimation", "application_advice", "major_details"
];

function filterAllowedFields(data: any) {
  const filtered: any = {};
  for (const key of ALLOWED_FIELDS) {
    if (data[key] !== undefined) {
      filtered[key] = data[key];
    }
  }
  return filtered;
}

// 6. 把查询条件拼接抽成公共函数
export function buildSchoolQueryConditions(query: any) {
  const { country, type, search, is_art_school } = query;
  let sql = " WHERE 1=1";
  const params: any[] = [];

  if (country) {
    sql += " AND country = ?";
    params.push(country);
  }
  if (type) {
    sql += " AND type = ?";
    params.push(type);
  }
  if (is_art_school !== undefined) {
    sql += " AND is_art_school = ?";
    params.push(Number(is_art_school));
  }
  if (search) {
    sql += " AND (name_zh LIKE ? OR name_en LIKE ?)";
    params.push(`%${search}%`, `%${search}%`);
  }

  return { sql, params };
}

// 4. 把 SQL 查询封装成函数
export function getSchools(query: any, limit: number = 20, offset: number = 0) {
  const { sql, params } = buildSchoolQueryConditions(query);
  const fullSql = `SELECT * FROM schools ${sql} ORDER BY qs_ranking ASC LIMIT ? OFFSET ?`;
  return db.prepare(fullSql).all(...params, limit, offset);
}

export function getSchoolsCount(query: any) {
  const { sql, params } = buildSchoolQueryConditions(query);
  const countSql = `SELECT COUNT(*) as total FROM schools ${sql}`;
  return (db.prepare(countSql).get(...params) as any).total;
}

export function getSchoolsBySlugs(slugs: string[]) {
  if (slugs.length === 0) return [];
  const placeholders = slugs.map(() => "?").join(",");
  return db.prepare(`SELECT * FROM schools WHERE slug IN (${placeholders})`).all(...slugs);
}

export function getSchoolBySlug(slug: string) {
  return db.prepare("SELECT * FROM schools WHERE slug = ?").get(slug);
}

export function getCountries() {
  return db.prepare("SELECT country, COUNT(*) as count FROM schools GROUP BY country ORDER BY count DESC").all();
}

export function createSchool(data: any) {
  const filteredData = filterAllowedFields(data);
  const keys = Object.keys(filteredData);
  const values = keys.map(k => `@${k}`).join(", ");
  
  const insert = db.prepare(`
    INSERT INTO schools (${keys.join(", ")})
    VALUES (${values})
  `);
  
  const result = insert.run(filteredData);
  return { id: result.lastInsertRowid, ...filteredData };
}

export function updateSchool(id: string | number, data: any) {
  const filteredData = filterAllowedFields(data);
  if (Object.keys(filteredData).length === 0) return;

  const setClauses = Object.keys(filteredData).map(key => `${key} = @${key}`).join(', ');
  
  const update = db.prepare(`
    UPDATE schools SET ${setClauses}, updated_at = CURRENT_TIMESTAMP WHERE id = @id
  `);
  
  update.run({ ...filteredData, id });
}

export function deleteSchool(id: string | number) {
  db.prepare("DELETE FROM schools WHERE id = ?").run(id);
}

export function seedSchools(seedData: any[]) {
  const insertOrUpdate = db.transaction((schools) => {
    for (const school of schools) {
      const filteredData = filterAllowedFields(school);
      const keys = Object.keys(filteredData);
      
      // We use INSERT ... ON CONFLICT(slug) DO UPDATE
      const insertCols = keys.join(", ");
      const insertVals = keys.map(k => `@${k}`).join(", ");
      const updateSet = keys.map(k => `${k}=@${k}`).join(", ");
      
      const stmt = db.prepare(`
        INSERT INTO schools (${insertCols})
        VALUES (${insertVals})
        ON CONFLICT(slug) DO UPDATE SET
        ${updateSet},
        updated_at = CURRENT_TIMESTAMP
      `);
      
      stmt.run(filteredData);
    }
  });
  
  insertOrUpdate(seedData);
}
