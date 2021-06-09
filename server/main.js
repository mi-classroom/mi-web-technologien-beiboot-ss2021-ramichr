require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const exifr = require("exifr");
const fs = require("fs");


const FILE_DIRECTORY = process.env.FILE_DIRECTORY || "../data";
const PORT = process.env.PORT || 5000;
const FILE_PATTERN = new RegExp(`${process.env.PATTERN}`) || new RegExp("(.*).jpg$");


app.use(express.json());
app.use(cors());


app.post("/data", async (req, res) => {
  const filepath = req.body.filepath;
  exifr.parse(req.body.filepath, true).then((data) => res.send({ filepath, data }));
});

app.post("/image", async (req, res) => {
  const filepath = req.body.filepath;
  const image64 = fs.readFileSync(filepath, "base64");
  res.send(image64);
});

app.get("/datas", async (req, res) => {
  res.send(getStructure(FILE_DIRECTORY));
});

function getStructure(initpath) {
  const structure = [];
  const finalpath = fs.readdirSync(initpath, { withFileTypes: true });
  finalpath.forEach((item) => {
    const path = initpath + "/" + item.name;
    const name = item.name;
    if (item.isDirectory()) {
      const type = "directory";
      const includes = getStructure(path);
      structure.push({ name, path, type, includes });
    } else {
      const type = "file";
      if (FILE_PATTERN.test(name)) structure.push({ name, path, type });
    }
  });
  return structure;
}

app.get("/", (req, res) => {
  res.send(
            `
            <title>Beiboot Metadata Server</title>
            <h1 style="text-align: center; font-family: Arial; font-style: italic; margin: 20px;">
              _Server is running on port: ${PORT}_
            </h1>
            `
          );
});

app.listen(PORT, () => {
  console.log(`Server is running on port:${PORT}`);
});