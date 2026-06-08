import getSysPrompt from "./sysprompt";
import getUserPrompt from "./userprompt";

const port = Number(process.env.PORT ?? 3000);

Bun.serve({
  port,
  routes: {
    "/": new Response("Hello world"),
  },
});

console.log(`API listening on http://localhost:${port}`);
