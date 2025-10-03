// Filename: server.js
import express from "express";
import fs from "fs";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3000;

//------------------------------------------------------
// GET /tester?file=cat.zip
//------------------------------------------------------
app.get("/tester", (req, res) => {
  const { file } = req.query;
  if (!file) {
    return res.status(400).send("Missing file param");
  }

  const filePath = path.join(process.cwd(), "assets", file.toString());

  if (!fs.existsSync(filePath)) {
    return res.status(404).send("File not found");
  }

  res.setHeader("Content-Type", "image/png"); // Always fake as PNG
  const stream = fs.createReadStream(filePath);
  stream.pipe(res);
});

//------------------------------------------------------
// Start server
//------------------------------------------------------
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
