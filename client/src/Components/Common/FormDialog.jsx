import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// import axios from "axios";
// import { useState } from "react";
import AuthContext from "../../Context/AuthContext";
import Youtube from "./youtube.svg";
import { Link } from "react-router-dom";

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { letSee, setForm } = React.useContext(AuthContext);

  function handleChange(e) {
    const inputValue =
      e.target.name === "file" ? e.target.files[0] : e.target.value;
    setForm((pre) => ({ ...pre, [e.target.name]: inputValue }));
    console.log(inputValue);
  }

  return (
    <div>
      <div className="mx-3" onClick={handleClickOpen}>
        <p className="mx-auto bg-dark p-2 text-white rounded-3 cp px-4">
          Upload Video
        </p>
      </div>
      <Dialog open={open} onClose={handleClose} maxWidth="md">
        <DialogTitle>
          <h3
            className="pt-4"
            style={{
              lineHeight: "0",
            }}
          >
            <img src={Youtube} width={39} alt="youtube" /> Upload video
          </h3>
        </DialogTitle>
        <form onSubmit={letSee}>
          <DialogContent>
            <DialogContentText>
              <p>
                Please note : You must have a <b>Youtube Channel</b> for
                uploading the video
                <br />
                <Link href="https://studio.youtube.com/channel/">
                  Learn more
                </Link>
              </p>

              <p>
                You will be uploading the video in your youtube channel as
                <b> unlisted</b>. Meaning that the video wont be available for
                the public as per the <b>respecting the privacy concerns</b> of
                the teachers.
              </p>
              <p>
                You can delete the video after you think you are done with the
                classes or make it public so that you can{" "}
                <b> attract more students</b>. We will be uploading to youtube
                behalf of you, you just need to enter the details asked below.
              </p>
              <p>Thankyou for your cooperation.</p>
            </DialogContentText>

            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Title"
              name="title"
              placeholder="Enter the title of the video"
              type="text"
              fullWidth
              variant="standard"
              onChange={handleChange}
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              name="description"
              label="Description"
              type="text"
              className="my-4"
              multiline
              rows={3}
              fullWidth
              placeholder="Enter the description of the video"
              variant="standard"
              onChange={handleChange}
            />
            <input
              onChange={handleChange}
              type="file"
              accept="video/mp4"
              name="file"
              placeholder="select file"
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleClose}
              variant="contained"
              className="bg-dark"
            >
              Cancel
            </Button>
            <Button type="submit" variant="contained" onClick={handleClose}>
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
