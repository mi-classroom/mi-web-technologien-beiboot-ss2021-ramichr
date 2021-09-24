require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const fs = require("fs");
const exiftool = require('node-exiftool')
const exiftoolBin = require('dist-exiftool')
const ep = new exiftool.ExiftoolProcess(exiftoolBin)


const FILE_DIRECTORY = "../data";
const PORT = 5000;
const FILE_PATTERN = new RegExp(".(jpg|jpeg|.tif.jpg|.json)");


app.use(express.json());
app.use(cors());


app.post("/data", async (req, res) => {
  const filepath = req.body.filepath;
  let result;
  await ep.open()
          .then(() => ep.readMetadata(filepath, ['-File:all']))
          .then((res) => result = res.data)
          .then(() => ep.close())

  let imageData = [];
  const inputs = [
          {inputField: "Title", inputName : "Titel"}, 
          {inputField: "Description", inputName : "Dateiart / Beschreibung"}, 
          {inputField: "Author", inputName : "Autor / Rechte"},
          {inputField: "Source", inputName : "Quelle"}]

  inputs.forEach(el => {
    imageData.push({
      inputField: el.inputField,
      inputName: el.inputName,
      datas: result && result[0][el.inputField] ? result[0][el.inputField] : ""
    })
  })
  res.send({ filepath, imageData });
});

app.put("/data", async (req, res) => {
  ep.open()
    .then(() => ep.writeMetadata(req.body.filepath, {all: '', ...req.body.data}, ["overwrite_original" , "codedcharacterset=utf8"]))
    .then(() => ep.close())
    .then(res.status(200).send())
})

app.post("/image", async (req, res) => {
  const filepath = req.body.filepath;
  const image64 = fs.readFileSync(filepath, "base64");
  res.send(image64);
});

app.get("/datas", async (req, res) => {
  res.send(getStructure(FILE_DIRECTORY));
});

app.post("/json", (req, res) => {
  let folder = req.body.filepath.substring(0, req.body.filepath.lastIndexOf("/") + 1);
  let data = JSON.parse(fs.readFileSync(req.body.filepath));
  res.send({ data, folder });
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
      const json = searchJson(path);
      structure.push({ name, path, type, includes, json });
    } else {
      const type = "file";
      const extension = name.slice(name.lastIndexOf("."));
      if (FILE_PATTERN.test(name)) structure.push({ name, path, type, extension });
    }
  });
  return structure;
}

function searchJson(thepath) {
    const found = fs.readdirSync(thepath);
    const jsonFiles = found.filter((item) => FILE_PATTERN.test(item));
    if (jsonFiles.length > 0) return thepath + "/" + jsonFiles[jsonFiles.length - 1];
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