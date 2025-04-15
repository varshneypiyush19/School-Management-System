import * as yup from "yup";
export const registerSchema = yup.object()({
  school_name: yup
    .string()
    .min(8, "School name must contain 8 characters")
    .required("School name is required"),
  email: yup
    .string()
    .email("It must be an email")
    .required("Email is required"),
  owner_name: yup
    .string()
    .min(3, " Owner name must have 8 characters.")
    .required("Owner name is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password")], "Confirm Password Must Match with Password")
    .required("Confirm password is required"),
});
