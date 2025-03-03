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
import { styled, alpha } from "@mui/material/styles";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import CustomerDelete from "./Components/CustomerDelete"; // 추가

const Root = styled(Paper)({
  width: "100%",
  minWidth: 1080,
  marginTop: "16px",
  overflowX: "auto",
  marginRight: 18,
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: "bold",
  backgroundColor: "#f5f5f5",
  color: "#000",
}));

const MenuWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "20px",
  padding: "20px",
  backgroundColor: "#f9f9f9",
  borderRadius: "12px",
  border: "1px solid #ddd",
  width: "90%",
  marginLeft: "auto",
  marginRight: "auto",
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const StyledTable = styled(Table)({
  minWidth: 1080,
});

const ProgressContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  padding: "20px",
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: "",
      completed: 0,
      searchKeyword: "",
    };
  }

  stateRefresh = () => {
    this.setState({
      customers: "",
      completed: 0,
      searchKeyword: "",
    });
    this.callApi()
      .then((res) => {
        if (res) {
          this.setState({ customers: res });
        }
      })
      .catch((err) => console.error("API 호출 실패:", err));
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

  handleValueChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  };

  render() {
    const filteredComponents = (data) => {
      data = data.filter((c) => {
        return c.name.indexOf(this.state.searchKeyword) > -1;
      });
      return data.map((c) => {
        return (
          <TableRow key={c.id}>
            <TableCell>{c.id}</TableCell>
            <TableCell>
              <img
                src={c.image}
                alt={c.name}
                style={{ width: 50, height: 50 }}
              />
            </TableCell>
            <TableCell>{c.name}</TableCell>
            <TableCell>{c.birthday}</TableCell>
            <TableCell>{c.gender}</TableCell>
            <TableCell>{c.job}</TableCell>
            <TableCell>
              <CustomerDelete stateRefresh={this.stateRefresh} id={c.id} />{" "}
            </TableCell>
          </TableRow>
        );
      });
    };

    const cellList = [
      "번호",
      "프로필 이미지",
      "이름",
      "생년월일",
      "성별",
      "직업",
      "설정",
    ];
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              고객관리 시스템
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="검색하기"
                inputProps={{ "aria-label": "search" }}
                name="searchKeyword"
                value={this.state.searchKeyword}
                onChange={this.handleValueChange}
              />
            </Search>
          </Toolbar>
        </AppBar>
        <MenuWrapper>
          <CustomerAdd stateRefresh={this.stateRefresh} />
        </MenuWrapper>

        <Root>
          <StyledTable>
            <TableHead>
              <TableRow>
                {cellList.map((c) => (
                  <StyledTableCell key={c}>{c}</StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.customers.length > 0 ? (
                filteredComponents(this.state.customers)
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
      </div>
    );
  }
}

export default App;
