import React, { Component } from "react";
import Customer from "./Components/Customer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import "./App.css";

const Root = styled(Paper)(({ theme }) => ({
  width: "100%",
  marginTop: theme.spacing(3),
  overflowX: "auto",
}));

const StyledTable = styled(Table)({
  minWidth: 1080,
});

class App extends Component {
  state = {
    customers: [],
  };

  componentDidMount() {
    this.callApi()
      .then((res) => {
        if (res) {
          this.setState({ customers: res });
        }
      })
      .catch((err) => console.error("API 호출 실패:", err));
  }

  callApi = async () => {
    try {
      const response = await fetch("/api/customers");
      if (!response.ok) {
        throw new Error(`서버 오류: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("API 요청 중 오류 발생:", error);
    }
  };

  render() {
    return (
      <>
        <Root>
          <StyledTable>
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
              {this.state.customers.length > 0
                ? this.state.customers.map((c) => (
                    <Customer
                      key={c.id}
                      id={c.id}
                      image={c.image}
                      name={c.name}
                      birthday={c.birthday}
                      gender={c.gender}
                      job={c.job}
                    />
                  ))
                : "로딩 중..."}
            </TableBody>
          </StyledTable>
        </Root>
      </>
    );
  }
}

export default App;
