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

export default function EditClass(props) {
  const [open, setOpen] = React.useState(false);

  const { classes, setClasses, editClass } = React.useContext(AuthContext);

  React.useEffect(() => {
    setClasses((prev) => ({ ...prev, ...props.classes }));
    console.log(props.classes, "the useeffect..");
    // console.log(classes, 'the usestate');
    // eslint-disable-next-line
  }, []);

  const handleChange = (e) => {
    setClasses({ ...classes, [e.target.name]: e.target.value });
    console.log(classes);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSuccess = () => {
    setOpen(false);
    editClass(classes.course_id, classes.id);
    props.setClss((pre) => {
      let updatePro = pre;
      updatePro[props.index] = classes;
      return [...updatePro];
    });
  };

  return (
    <div>
      <Button
        variant="contained"
        className="h-25 ms-2 w-100 mt-2 px-2 bg-dark"
        onClick={handleClickOpen}
      >
        Edit
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
                  defaultValue={classes?.title}
                  onChange={(e) => {
                    handleChange(e);
                    // setClasses({ ...classes, title: e.target.value });
                    // console.log(e.target.value);
                    // console.log(classes);
                  }}
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
                  defaultValue={classes?.description}
                  onChange={(e) => {
                    // setClasses({ ...classes, description: e.target.value });
                    // console.log(classes);
                    handleChange(e);
                  }}
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
                  name="date"
                  defaultValue={classes?.date}
                  className="w-100 p-2 rounded-2 timefield border-1"
                  onChange={(e) => {
                    // setClasses({ ...classes, date: e.target.value });
                    // console.log(classes.date);
                    // console.log(e);
                    handleChange(e);
                  }}
                />
              </>
            </Col>
            <Col md={4}>
              <input
                type="time"
                name="time"
                defaultValue={classes?.time}
                onChange={(e) => {
                  // setClasses({ ...classes, time: e.target.value });
                  // console.log(e.target.value);
                  // console.log(classes);
                  handleChange(e);
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
                value={Number(classes?.duration)}
                onChange={(e) => {
                  // setClasses({ ...classes, duration: e.target.value });
                  // console.log(e.target.value);
                  // console.log(classes);
                  handleChange(e);
                }}
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
