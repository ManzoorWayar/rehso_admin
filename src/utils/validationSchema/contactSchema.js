import * as yup from "yup"
import Translate from "../../hooks/Translate";

const Contact = yup.object().shape({
  fullName: yup
    .string()
    .trim()
    .required(<Translate validations='validations:required' name='fullName' />),
  email: yup
    .string()
    .trim()
    .required(<Translate validations='validations:required' name='email' />)
    .email(<Translate validations='validations:invalid' name='email' />)
    .matches(
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email"
    ),
  phoneNumber: yup
    .string()
    .trim()
    .required(<Translate validations='validations:required' name='phone-number' />)
    .matches(/^07[0-9]{8}([0-9]{2})?$/, () => <Translate validations='validations:invalid' name='phone-number' />),
  subject: yup
    .string()
    .trim()
    .required(<Translate validations='validations:required' name='subject' />)
    .test('len', <Translate validations='validations:max-character' name='subject' value={20} />, val => val.length <= 20),
  message: yup
    .string()
    .trim()
    .required(<Translate validations='validations:required' name='message' />)
    .test('len', <Translate validations='validations:max-character' name='message' value={250} />, val => val.length <= 250),
});

const Schema = {
  Contact
};

export default Schema;