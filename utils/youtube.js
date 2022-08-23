const multer = require("multer");
const youtube = require("youtube-api");
const { v4: uuid } = require("uuid");
const credentials = require("../credentials.json");
const fs = require("fs");

//1st things...
const oAuth = youtube.authenticate({
  type: "oauth",
  client_id: credentials.web.client_id,
  client_secret: credentials.web.client_secret,
  redirect_url: credentials.web.redirect_uris[0],
});

// 2nd process..
const storage = multer.diskStorage({
  destination: "./videos",
  filename(req, file, cb) {
    const newFileName = `${uuid()}-${file.originalname}`;
    cb(null, newFileName);
  },
});

// 3rd process...
const uploadVideoFile = multer({
  storage,
}).single("videoFile");

const uploadVideoToYouTube = (filename, title, description) => {
  console.log("here is right...");
  youtube.videos.insert(
    {
      resource: {
        snippet: { title, description },
        status: { privacyStatus: "unlisted" },
      },
      part: "snippet,status",
      media: {
        body: fs.createReadStream("./videos/" + filename),
      },
    },
    (err, data) => {
      if (err) throw err;
      console.log(data.data, "done...");
      fs.writeFileSync("./youtube.json", JSON.stringify(data.data, null, 4));
      process.exit();
    }
  );
};

module.exports = {
  oAuth,
  storage,
  uploadVideoFile,
  uploadVideoToYouTube,
};
