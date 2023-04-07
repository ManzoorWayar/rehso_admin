import * as yup from "yup";
import Translate from "../../hooks/Translate";

const Register = yup.object().shape({
  fullName: yup
    .string()
    .trim()
    .required(<Translate validations="validations:required" name="fullName" />),

  email: yup
    .string()
    .trim()
    .required(<Translate validations="validations:required" name="email" />)
    .email(<Translate validations="validations:invalid" name="email" />)
    .matches(
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email"
    ),

  password: yup
    .string()
    .trim()
    .required(<Translate validations="validations:required" name="password" />)
    .min(
      8,
      <Translate
        validations="validations:min-character"
        name="password"
        value={8}
      />
    ),

  confirmPassword: yup
    .string()
    .trim()
    .required(
      <Translate validations="validations:required" name="confirm-password" />
    )
    .oneOf(
      [yup.ref("password")],
      <Translate validations="validations:confirm-password" />
    ),
});

export default Register;
