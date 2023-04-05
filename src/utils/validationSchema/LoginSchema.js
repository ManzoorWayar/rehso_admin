import * as yup from "yup"
import Translate from "../../hooks/Translate";

const Login = yup.object().shape({
    email: yup
        .string()
        .trim()
        .required(<Translate validations='validations:required' name='email' />)
        .email(<Translate validations='validations:invalid' name='email' />)
        .matches(
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            "Please add a valid email"
        ),

    password: yup
        .string()
        .trim()
        .required(<Translate validations='validations:required' name='password' />),
});

export default Login;