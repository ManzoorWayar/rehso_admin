import * as yup from "yup"
import Translate from "../../hooks/Translate";

const Register = yup.object().shape({
    fullName: yup
        .string()
        .trim()
        .required(<Translate validations='validations:required' name='fullName' />),

    username: yup
        .string()
        .trim()
        .required(<Translate validations='validations:required' name='username' />),

    email: yup
        .string()
        .trim()
        .required(<Translate validations='validations:required' name='email' />)
        .email(<Translate validations='validations:invalid' name='email' />)
        .matches(
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            "Please add a valid email"
        ),

    gender: yup.object().shape({
        label: yup.string().trim().required(<Translate validations='validations:required' name='gender' />),
        value: yup.string().trim().required(<Translate validations='validations:required' name='gender' />)
    }),

    subject: yup.object().shape({
        label: yup.string().trim().required(<Translate validations='validations:required' name='role' />),
        value: yup.string().trim().required(<Translate validations='validations:required' name='role' />)
    }),

    // ability: yup.object().shape({
    //     label: yup.string().trim().required(<Translate validations='validations:required' name='job-ability' />),
    //     value: yup.string().trim().required(<Translate validations='validations:required' name='job-ability' />)
    // }),

    password: yup
        .string()
        .trim()
        .required(<Translate validations='validations:required' name='password' />)
        .min(8, <Translate validations='validations:min-character' name='password' value={8} />),

    confirmPassword: yup
        .string()
        .trim()
        .required(<Translate validations='validations:required' name='confirm-password' />)
        .oneOf([yup.ref("password")], <Translate validations='validations:confirm-password' />),
});

export default Register;