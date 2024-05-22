import express, { Request, Response } from "express";
import cors from "cors";
import * as sqlite from "sqlite";
import sqlite3 from "sqlite3";
import { Database } from "sqlite";

const app = express();
app.use(cors());
app.use(express.json());

const DATABASE_FILE = "database.sqlite";
let database: Database;

(async () => {
  try {
    database = await sqlite.open({
      filename: DATABASE_FILE,
      driver: sqlite3.Database,
    });

    await database.run("PRAGMA foreign_keys = ON");
    console.log("Connected to the SQLite database");

    app.get("/recipes", async (_req: Request, res: Response) => {
      try {
        const recipes = await database.all("SELECT * FROM recipes");
        res.json(recipes);
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch recipes" });
      }
    });

    app.get("/recipes/:id", async (req: Request, res: Response) => {
      try {
        const recipe = await database.get(
          "SELECT * FROM recipes WHERE id = ?",
          [req.params.id]
        );
        if (recipe) {
          res.json(recipe);
        } else {
          res.status(404).json({ error: "Recipe not found" });
        }
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch recipe" });
      }
    });

    app.post("/recipes", async (req: Request, res: Response) => {
      const { title, description } = req.body;
      try {
        const result = await database.run(
          "INSERT INTO recipes (title, description) VALUES (?, ?)",
          [title, description]
        );
        const newRecipe = await database.get(
          "SELECT * FROM recipes WHERE id = ?",
          [result.lastID]
        );
        res.status(201).json(newRecipe);
      } catch (error) {
        res.status(500).json({ error: "Failed to create recipe" });
      }
    });

    app.get("/instructions", async (_req: Request, res: Response) => {
      try {
        const instructions = await database.all("SELECT * FROM instructions");
        res.json(instructions);
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch instructions" });
      }
    });

    app.get(
      "/recipes/:id/instructions",
      async (req: Request, res: Response) => {
        try {
          const instructions = await database.all(
            "SELECT * FROM instructions WHERE recipe_id = ?",
            [req.params.id]
          );
          res.json(instructions);
        } catch (error) {
          res.status(500).json({ error: "Failed to fetch instructions" });
        }
      }
    );

    app.listen(3000, () => {
      console.log("Server is running on http://localhost:3000");
    });
  } catch (error) {
    console.error("Error connecting to SQLite database:", error);
  }
})();
