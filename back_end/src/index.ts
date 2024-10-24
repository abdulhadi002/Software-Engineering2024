import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { readFile, writeFile } from "node:fs/promises";
import { serveStatic } from "@hono/node-server/serve-static";
import { cors } from "hono/cors";

const app = new Hono()

app.use("/*", cors());

app.use("/statics/*", serveStatic({ root: "./" }));


app.get("/json", async (c) => {
  const get_device = await readFile("./backend/src/data.json", "utf-8");
  return c.json(JSON.parse(get_device));
});

app.post("/json", async (c) => {
  try {
    const newDevice = await c.req.json();
    const post_device = await readFile("./backend/src/data.json", "utf-8");
    const devices = JSON.parse(post_device).devices;

    newDevice.id = devices.length ? devices[devices.length - 1].id + 1 : 1;
    devices.push(newDevice);

    await writeFile("./backend/src/data.json", JSON.stringify({ devices: devices }, null, 2));

    return c.json(newDevice, 200);
  } catch (error) {
    return c.text("Failed to save device", 500);
  }
});

app.post('/login', async (c) => {
  try {
    const credentials = await c.req.json();
    const data = await readFile('./backend/src/PersonData.json', 'utf-8');
    const users = JSON.parse(data);
    const isValidUser = users.some((user: { userName: any; password: any; }) => user.userName === credentials.userName && user.password === credentials.password);
    if (isValidUser) {
      return c.json({ success: true });
    } else {
      return c.json({ success: false }, 401);
    }
  } catch (error) {
    return c.text('Error while checking user credentials', 500);
  }
});


app.post('/register', async (c) => {
  try {
    const newUser = await c.req.json();
    const data = await readFile('./backend/src/PersonData.json', 'utf-8');
    const users = JSON.parse(data);
    users.push(newUser);
    await writeFile('./backend/src/PersonData.json', JSON.stringify(users, null, 2));
    return c.json({ success: true });
  } catch (error) {
    return c.text('Error while registering user', 500);
  }
});

app.get('/profile', async (c) => {
  try {
    const data = await readFile('./backend/src/PersonData.json', 'utf-8');
    const users = JSON.parse(data);
    const profileData = users[0];
    return c.json(profileData);
  } catch (error) {
    return c.text('Error fetching profile data', 500);
  }
});

app.put('/profile', async (c) => {
  try {
    const updatedProfile = await c.req.json();
    const data = await readFile('./backend/src/PersonData.json', 'utf-8');
    const users = JSON.parse(data);
    users[0] = { ...users[0], ...updatedProfile };
    await writeFile('./backend/src/PersonData.json', JSON.stringify(users, null, 2));
    return c.json({ success: true });
  } catch (error) {
    return c.text('Error updating profile data', 500);
  }
});

const port = 6969
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
});
