import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import { registerSchema } from "../../../yupSchema/registerSchema";
import { Button, CardMedia, Typography } from "@mui/material";
import axios from "axios";
import MessageSnackbar from "../../../basic utility/snackbar/MessageSnackBar";

export default function Register() {
  const [file, setFile] = React.useState(null);
  const [imageUrl, setImageUrl] = React.useState(null);
  const addImage = (e) => {
    const file = e.target.files[0];
    setImageUrl(URL.createObjectURL(file));
    setFile(file);
  };
  const fileInputRef = React.useRef(null);
  const handleClearFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Clear the file input value
    }
    setFile(null);
    setImageUrl(null);
  };
  const initialValues = {
    school_name: "",
    email: "",
    owner_name: "",
    password: "",
    confirm_password: "",
  };
  const Formik = useFormik({
    initialValues,
    validationSchema: registerSchema,
    onSubmit: (values) => {
      console.log("Reguister submit values", values);

      if (file) {
        const fd = new FormData();
        fd.append("image", file, file.name);
        fd.append("school_name", values.school_name);
        fd.append("email", values.email);
        fd.append("owner_name", values.owner_name);
        fd.append("password", values.password);

        axios
          .post(`http://localhost:5000/api/school/register`, fd)
          .then((res) => {
            console.log("Register response", res);
            setMessage(res.data.message);
            setMessageType("success");
            Formik.resetForm();
            handleClearFile();
          })
          .catch((err) => {
            setMessage(err.response.data.message);
            setMessageType("error");
            console.log("Register error", err);
          });
      } else {
        setMessage("Please add School image");
        setMessageType("error");
      }
    },
  });
  const [message, setMessage] = React.useState("");
  const [messageType, setMessageType] = React.useState("success");
  const handleMessageClose = () => {
    setMessage("");
  };
  return (
    <Box
      component={"div"}
      sx={{
        background:
          "url(https://cdn.pixabay.com/photo/2017/08/12/21/42/back2school-2635456_1280.png)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "100%",
        paddingTop: "60px",
        paddingBottom: "60px",
      }}
    >
      {message && (
        <MessageSnackbar
          message={message}
          handleClose={handleMessageClose}
          type={messageType}
        />
      )}
      <Typography variant="h2" sx={{ textAlign: "center" }}>
        Register
      </Typography>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1 },
          display: "flex",
          flexDirection: "column",
          width: "50vw",
          minWidth: "230px",
          margin: "auto",
          padding: "20px",
          background: "#fff",
        }}
        noValidate
        autoComplete="off"
        onSubmit={Formik.handleSubmit}
      >
        <Typography>Add School Details</Typography>
        <TextField
          type="file"
          inputRef={fileInputRef}
          onChange={(e) => {
            addImage(e);
          }}
        />
        {imageUrl && (
          <Box>
            <CardMedia component={"img"} height={"240px"} image={imageUrl} />
          </Box>
        )}
        <TextField
          name="school_name"
          label="School Name"
          value={Formik.values.school_name}
          onChange={Formik.handleChange}
          onBlur={Formik.handleBlur}
        />
        {Formik.touched.school_name && Formik.errors.school_name && (
          <p style={{ color: "red ", textTransform: "capitalize" }}>
            {Formik.errors.school_name}
          </p>
        )}
        <TextField
          name="email"
          label="Email"
          value={Formik.values.email}
          onChange={Formik.handleChange}
          onBlur={Formik.handleBlur}
        />
        {Formik.touched.email && Formik.errors.email && (
          <p style={{ color: "red ", textTransform: "capitalize" }}>
            {Formik.errors.email}
          </p>
        )}
        <TextField
          name="owner_name"
          label="Owner Name"
          value={Formik.values.owner_name}
          onChange={Formik.handleChange}
          onBlur={Formik.handleBlur}
        />
        {Formik.touched.owner_name && Formik.errors.owner_name && (
          <p style={{ color: "red ", textTransform: "capitalize" }}>
            {Formik.errors.owner_name}
          </p>
        )}
        <TextField
          name="password"
          label="Password"
          type="password"
          value={Formik.values.password}
          onChange={Formik.handleChange}
          onBlur={Formik.handleBlur}
        />
        {Formik.touched.password && Formik.errors.password && (
          <p style={{ color: "red ", textTransform: "capitalize" }}>
            {Formik.errors.password}
          </p>
        )}
        <TextField
          name="confirm_password"
          label="Confirm Password"
          type="password"
          value={Formik.values.confirm_password}
          onChange={Formik.handleChange}
          onBlur={Formik.handleBlur}
        />
        {Formik.touched.confirm_password && Formik.errors.confirm_password && (
          <p style={{ color: "red ", textTransform: "capitalize" }}>
            {Formik.errors.confirm_password}
          </p>
        )}
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </Box>
    </Box>
  );
}
