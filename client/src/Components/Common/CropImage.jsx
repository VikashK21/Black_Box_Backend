import React, { useRef } from "react";
import { Button, Col, Container } from "react-bootstrap";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { getCroppedImg } from "./getCroppedImg";

const CropImage = ({ cropRatio, src, imageCallback, closeHander }) => {
  console.log(cropRatio);
  const cropperRef = useRef(null);
  const cropDetailsRef = useRef(null);

  const onCrop = (e) => (cropDetailsRef.current = e.detail);

  const clickHndler = async () => {
    const croppedImage = await getCroppedImg(
      cropperRef.current,
      cropDetailsRef.current,
      src.name,
    );
    imageCallback(croppedImage);
  };

  return (
    <div
      className="position-fixed d-flex justify-content-center container-fluid "
      style={{
        top: 80,
        left: 10,
        zIndex: 99,
      }}
    >
      <Container className=" text-center bg-dark shadow rounded-2 mx-auto p-5 m-0">
        <Col xs={12} className="text-center d-flex justify-content-center  ">
          <div>
            <Cropper
              src={src ? URL.createObjectURL(src) : ""}
              className="image-fulid"
              style={{ height: "25rem", width: "fit-content" }}
              // Cropper.js options
              aspectRatio={cropRatio.width / cropRatio.height}
              guides={false}
              crop={onCrop}
              ref={cropperRef}
              zoomable={true}
              // autoCrop={false}
              movable={false}
              minCropBoxWidth={200}
              minCropBoxHeight={250}
            />

            <div className="px-auto py-2 text-center">
              <Button
                type="button"
                className="btn-danger us-btn-danger mx-1"
                style={{ width: "fit-content" }}
                onClick={closeHander}
              >
                Cancel
              </Button>
              <Button
                type="button"
                className="us-btn mx-1"
                style={{ width: "fit-content" }}
                onClick={clickHndler}
              >
                Crop
              </Button>
            </div>
          </div>
        </Col>
      </Container>
    </div>
  );
};

export default CropImage;
