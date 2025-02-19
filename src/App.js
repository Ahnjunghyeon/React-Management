import React, { Component } from "react";
import Customer from "./Components/Customer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

import "./App.css";

const customers = [
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
];

class App extends Component {
  render() {
    return (
      <>
        <div>
          {customers.map((c) => {
            return (
              <Customer
                key={c.id}
                id={c.id}
                image={c.image}
                name={c.name}
                birthday={c.birthday}
                gender={c.gender}
                job={c.job}
              />
            );
          })}
        </div>
      </>
    );
  }
}

export default App;
