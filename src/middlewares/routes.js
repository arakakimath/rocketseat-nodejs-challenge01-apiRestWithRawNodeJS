import { randomUUID } from "node:crypto";
import { Database } from "../database/database.js";
import { buildRoutePath } from "../utils/buildRoutePath.js";
import { bodyExtractor } from "./bodyExtractor.js";

const database = new Database();

export const routes = [
  {
    method: "GET",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const { search } = req.query

      return res.end(JSON.stringify(database.select("tasks", {
        title: search,
        description: search
      })));
    },
  },
  {
    method: "POST",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const { title, description } = bodyExtractor(req)

      if (!title.trim() || !description.trim()) return res.writeHead(400).end()

      const task = {
        id: randomUUID(),
        title,
        description,
      };

      database.insert("tasks", task);

      return res.writeHead(201).end();
    },
  },
  {
    method: "DELETE",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;

      if (database.delete("tasks", id)) return res.writeHead(204).end();
      else return res.writeHead(404).end("Id not found");
    },
  },
  {
    method: "PUT",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;
      
      const { title, description } = bodyExtractor(req)
      
      if (!title.trim() && !description.trim()) return res.writeHead(400).end()

      if (
        database.update("tasks", id, {
          title,
          description,
        })
      )
        return res.writeHead(204).end();
      else
        return res.writeHead(404).end("Id not found");
    },
  },
  {
    method: "PATCH",
    path: buildRoutePath("/tasks/:id/complete"),
    handler: (req, res) => {
      const { id } = req.params;

      if (
        database.updateStatus("tasks", id)
      )
        return res.writeHead(204).end();
      else
        return res.writeHead(404).end("Id not found");
    },
  },
];