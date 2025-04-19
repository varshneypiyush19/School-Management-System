import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import { Button, Typography } from "@mui/material";
import axios from "axios";
import MessageSnackbar from "../../../basic utility/snackbar/MessageSnackBar";
import { loginSchema } from "../../../yupSchema/loginSchema";

export default function Login() {
  const initialValues = {
    email: "",
    password: "",
  };
  const Formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: (values) => {
      axios
        .post(`http://localhost:5000/api/school/login`, { ...values })
        .then((res) => {
          const token = res.headers.get("Authorization");
          if (token) {
            localStorage.setItem("token", token);
          }
          const user = res.data.user;
          if (user) {
            localStorage.setItem("user", JSON.stringify(user));
          }
          setMessage(res.data.message);
          setMessageType("success");
          Formik.resetForm();
        })
        .catch((err) => {
          setMessage(err.response.data.message);
          setMessageType("error");
          console.log("Register error", err);
        });
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
        minHeight: "80vh",
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
        <Typography variant="h2" sx={{ textAlign: "center" }}>
          Login
        </Typography>
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
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </Box>
    </Box>
  );
}
