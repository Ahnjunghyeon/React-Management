import React, { Component } from "react";
import Customer from "./Components/Customer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { withStyles } from "@mui/material/withStyles";
import "./App.css";

const styles = (theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto",
  },
  table: {
    minWidth: 1080,
  },
});

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
    const { classes } = this.props;
    return (
      <>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>번호</TableCell>
                <TableCell>이미지</TableCell>
                <TableCell>이름</TableCell>
                <TableCell>생년월일</TableCell>
                <TableCell>성별</TableCell>
                <TableCell>직업</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
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
            </TableBody>
          </Table>
        </Paper>
      </>
    );
  }
}

export default withStyles(styles)(App);
