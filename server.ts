import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { initDb } from "./server/db.js";
import { seedSchools } from "./server/models/school.js";
import { seedData } from "./server/data/schools/index.js";
import schoolsRouter from "./server/routes/schools.js";
import countriesRouter from "./server/routes/countries.js";

// Initialize Database and Seed Data
initDb();
seedSchools(seedData);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.use("/api/schools", schoolsRouter);
  app.use("/api/countries", countriesRouter);

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
