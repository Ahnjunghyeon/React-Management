import React, { Component } from "react";
import Customer from "./Components/Customer";
import CustomerAdd from "./Components/CustomerAdd";
import "./App.css";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import CircularProgress from "@mui/material/CircularProgress";
import { styled } from "@mui/material/styles";

const Root = styled(Paper)({
  width: "100%",
  marginTop: "16px",
  overflowX: "auto",
});

const StyledTable = styled(Table)({
  minWidth: 1080,
});

const ProgressContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  padding: "20px",
});

class App extends Component {
  state = {
    customers: [],
    completed: 0,
  };

  componentDidMount() {
    this.timer = setInterval(this.progress, 20);
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
      const data = await response.json();
      console.log(data); // 응답을 콘솔에 출력하여 확인
      return data;
    } catch (error) {
      console.error("API 요청 중 오류 발생:", error);
    }
  };

  progress = () => {
    this.setState((prevState) => ({
      completed: prevState.completed >= 100 ? 0 : prevState.completed + 1,
    }));
  };

  render() {
    return (
      <div>
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
              {this.state.customers.length > 0 ? (
                this.state.customers.map((c) => (
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
              ) : (
                <TableRow>
                  <TableCell colSpan="6">
                    <ProgressContainer>
                      <CircularProgress
                        variant="indeterminate"
                        value={this.state.completed}
                      />
                    </ProgressContainer>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </StyledTable>
        </Root>

        <CustomerAdd />
      </div>
    );
  }
}

export default App;
