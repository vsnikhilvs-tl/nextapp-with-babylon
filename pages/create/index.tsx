import { ReactElement, useEffect, useState } from "react";
import Layout from "../../components/layout/layout";

import { useFormik } from "formik";
import * as yup from "yup";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ClearIcon from "@mui/icons-material/Clear";

import styles from "../../styles/Create.module.scss";
import Image from "next/image";

const placeholder = require("../../public/nftplaceholder.png");

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

var files = [];

export default function Create() {
  const [currentFile, setcurrentFile] = useState(null);

  const [currentImage, setcurrentImage] = useState(null);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    // validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const selectFileHandler = (event: any) => {
    console.log(event.target.files[0]);
    setcurrentFile(event.target.files[0]);
    files = event.target.files[0];
    var reader: any = new FileReader();
    reader.readAsDataURL(files);
    reader.onloadend = () => {
      setcurrentImage(reader.result);
    };
  };

  const removeFileHandler = () => {
      setcurrentFile(null);
      setcurrentImage(null);
      files = [];
  }

  useEffect(() => {
    return () => {
      setcurrentFile(null);
      setcurrentImage(null);
      files = [];
    };
  }, []);

  return (
    <div className={styles.createMain}>
      <Box
        sx={{
          width: "25vw",
          height: "auto",
          backgroundColor: "transparent",
          border: "1px solid #1976D2",
          borderRadius: "5px",
        }}
      >
        <form onSubmit={formik.handleSubmit} className={styles.createForm}>
          <h1 style={{ marginBottom: "0", marginTop: "0" }}>Create an Item</h1>
          <Box sx={{ width: 250, height: 250 }}>
            <div>
              {files.length !== 0 && (
                <div style={{ position: "relative" }}>
                  <Image
                    id="absImage"
                    src={currentImage ? currentImage : placeholder}
                    width={250}
                    height={250}
                    alt="CurrentImage"
                  />
                  <div
                    style={{
                      position: "absolute",
                      right: "-10px",
                      top: "-10px",
                    }}
                    onClick={removeFileHandler}
                  >
                    <ClearIcon
                      style={{
                        background: "#1976D2",
                        border: "2px solid white",
                        borderRadius: "15px",
                        cursor: "pointer",
                      }}
                    />
                  </div>
                </div>
              )}
              {files.length === 0 && (
                <div style={{ position: "relative" }}>
                  <Image
                    id="absImage"
                    src={placeholder}
                    width={250}
                    height={250}
                    alt="Placeholder for NFT"
                  />
                  <input
                    type="file"
                    onChange={selectFileHandler}
                    className={styles.fileInput}
                  />
                </div>
              )}
            </div>
          </Box>
          <TextField
            fullWidth
            variant="outlined"
            id="title"
            name="title"
            label="Title"
            value={formik.values.title}
            onChange={formik.handleChange}
            // error={formik.touched.email && Boolean(formik.errors.email)}
            // helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            fullWidth
            variant="outlined"
            id="description"
            name="description"
            label="Description"
            value={formik.values.description}
            onChange={formik.handleChange}
            // error={formik.touched.password && Boolean(formik.errors.password)}
            // helperText={formik.touched.password && formik.errors.password}
          />
          <Button color="primary" variant="contained" fullWidth type="submit">
            Submit
          </Button>
        </form>
      </Box>
    </div>
  );
}

Create.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
