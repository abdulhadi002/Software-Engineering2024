import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { readFile, writeFile } from "node:fs/promises";
import { serveStatic } from "@hono/node-server/serve-static";
import { cors } from "hono/cors";

const app = new Hono()

app.use("/*", cors());

app.use("/statics/*", serveStatic({ root: "./"}));

app.get("/json", async (c) => {
  const get_device = await readFile("./backend/src/data.json", "utf-8");
  return c.json(JSON.parse(get_device));
});

app.post("/json", async (c) => {
  try {
    const newProject = await c.req.json();
    const post_device = await readFile("./backend/src/data.json", "utf-8");
    const devices = JSON.parse(post_device).devices;

    newProject.id = devices.length ? devices[devices.length - 1].id + 1 : 1;
    devices.push(newProject);

    await writeFile("./backend/src/data.json", JSON.stringify({ device: devices }, null, 2));

    return c.json(newProject, 200);
  } catch (error) {
    return c.text("Failed to save device", 500);
  }
});

const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
