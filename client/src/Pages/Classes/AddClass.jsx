import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import AuthContext from "../../Context/AuthContext";
import { Col, Row } from "react-bootstrap";
import { TextField } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddClass(props) {
  const [open, setOpen] = React.useState(false);

  const {
    classes,
    setClasses,
    // classlist,
    // setClasslist,
    // setHostClasses,
    HostClasses2,
  } = React.useContext(AuthContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setClasses({
      title: "",
      description: "",
      fee: "",
      date: "",
      time: "",
      duration: "",
    });
  };

  const handleSuccess = () => {
    setOpen(false);
    console.log(props.id, 'the props');
    HostClasses2(props.id);
  };

  return (
    <div>
      <Button
        variant="contained"
        className="w-100 bgy"
        onClick={handleClickOpen}
      >
        Add class
      </Button>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Edit Class</DialogTitle>
        <DialogContent>
          <Row className="signupform  pt-2">
            <Col md={12} className="">
              <div className="d-flex">
                <TextField
                  label="Title"
                  name="title"
                  onChange={(e) =>
                    setClasses(() => ({ ...classes, title: e.target.value }))
                  }
                  multiline
                  variant="outlined"
                  placeholder="e.g :  Day 1: Intro to React"
                  className=" mb-3 w-100"
                />
              </div>
            </Col>

            <Col md={12} className="my-2">
              <div className="d-flex">
                <TextField
                  label="Description"
                  name="description"
                  multiline
                  rows={3}
                  onChange={(e) =>
                    setClasses({ ...classes, description: e.target.value })
                  }
                  variant="outlined"
                  placeholder="e.g :  This class will teach you about React and its advantages"
                  className=" mb-3 w-100"
                />
              </div>
            </Col>
            <Col md={4} xs={12} className="">
              <>
                <input
                  type="date"
                  className="w-100 p-2 rounded-2 timefield border-1"
                  onChange={(e) => {
                    setClasses(() => ({ ...classes, date: e.target.value }));
                    console.log(classes.date, "date of classes");
                    console.log(e);
                  }}
                />
              </>
            </Col>
            <Col md={4}>
              <input
                type="time"
                onChange={(e) => {
                  setClasses(() => ({ ...classes, time: e.target.value }));
                  console.log(e.target.value, "time of the classes");
                }}
                className="w-100 p-2 rounded-2 timefield border-1"
              />
            </Col>
            <Col md={4}>
              <TextField
                label="Duration"
                name="duration"
                type="number"
                placeholder="e.g : 45 minutes"
                variant="outlined"
                onChange={(e) =>
                  setClasses(() => ({ ...classes, duration: e.target.value }))
                }
                className=" mb-3 w-100"
              />
            </Col>
          </Row>
        </DialogContent>
        <DialogActions className="mb-3">
          <Button onClick={handleClose} variant="contained">
            Disagree
          </Button>
          <Button onClick={handleSuccess} variant="contained">
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
