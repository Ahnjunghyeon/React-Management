import React from "react";
import axios from "axios";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
  TextField,
  styled,
} from "@mui/material";

const styles = (theme) => ({
  hidden: {
    display: "none",
  },
});

class CustomerAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      userName: "",
      birthday: "",
      gender: "",
      job: "",
      fileName: "",
      open: false,
    };
    // `fileInput` ref 초기화
    this.fileInput = React.createRef();
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    this.addCustomer()
      .then((response) => {
        console.log(response.data);
        this.props.stateRefresh();

        this.setState({
          file: null,
          userName: "",
          birthday: "",
          gender: "",
          job: "",
          fileName: "",
          open: false,
        });
      })
      .catch((error) => {
        console.error("추가 실패:", error);
      });
  };

  handleFileChange = (e) => {
    this.setState({
      file: e.target.files[0],
      fileName: e.target.files[0]?.name || "",
    });
  };

  handleValueChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  };

  addCustomer = () => {
    const url = "/api/customers";
    const formData = new FormData();
    formData.append("image", this.state.file);
    formData.append("name", this.state.userName);
    formData.append("birthday", this.state.birthday);
    formData.append("gender", this.state.gender);
    formData.append("job", this.state.job);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    return axios.post(url, formData, config);
  };

  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = () => {
    this.setState({
      file: null,
      userName: "",
      birthday: "",
      gender: "",
      job: "",
      fileName: "",
      open: false,
    });
  };

  render() {
    return (
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={this.handleClickOpen}
        >
          고객 추가하기
        </Button>
        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle>고객추가</DialogTitle>
          <DialogContent>
            <input
              style={{ display: "none" }}
              accept="image/*"
              type="file"
              ref={this.fileInput}
              onChange={this.handleFileChange}
            />
            <Button
              variant="contained"
              onClick={() => this.fileInput.current.click()}
            >
              {this.state.fileName === ""
                ? "프로필 이미지 선택"
                : this.state.fileName}
            </Button>
            <br />
            <TextField
              label="이름"
              type="text"
              name="userName"
              value={this.state.userName}
              onChange={this.handleValueChange}
            />
            <br />
            <TextField
              label="생년월일"
              type="text"
              name="birthday"
              value={this.state.birthday}
              onChange={this.handleValueChange}
            />
            <br />
            <TextField
              label="성별"
              type="text"
              name="gender"
              value={this.state.gender}
              onChange={this.handleValueChange}
            />
            <br />
            <TextField
              label="직업"
              type="text"
              name="job"
              value={this.state.job}
              onChange={this.handleValueChange}
            />
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              onClick={this.handleFormSubmit}
              color="primary"
            >
              추가하기
            </Button>
            <Button
              variant="outlined"
              onClick={this.handleClose}
              color="secondary"
            >
              닫기
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default CustomerAdd;
