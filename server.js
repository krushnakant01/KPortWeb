
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.disable("x-powered-by");
app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
  console.log(`Portfolio running at http://localhost:${PORT}`);
});
