const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/customers", (req, res) => {
  res.send([
    {
      id: 1,
      image: "https://placeimg.com/64/64/any",
      name: "안중현",
      birthday: "990704",
      gender: "남자",
      gob: "취준생",
    },
    {
      id: 2,
      image: "https://placeimg.com/64/64/2",
      name: "홍길이",
      birthday: "898989",
      gender: "여자",
      gob: "프로그랭",
    },
    {
      id: 3,
      image: "https://placeimg.com/64/64/3",
      name: "박박이",
      birthday: "721212",
      gender: "남자",
      gob: "백숙",
    },
  ]);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
