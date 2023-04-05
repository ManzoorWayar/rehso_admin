import * as yup from "yup"
import Translate from "../../hooks/Translate";

const Critics = yup.object().shape({
    fullName: yup
        .string()
        .trim()
        .required(<Translate validations='validations:required' name='fullName' />),

    subject: yup
        .string()
        .trim()
        .required(<Translate validations='validations:required' name='subject' />)
        .max('21', <Translate validations='validations:max-character' name='subject' value={20} />),

    contractId: yup
        .string()
        .trim()
        .required(<Translate validations='validations:required' name='contract-id' />),

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
        .matches(/^07[0-9]{6}([0-9]{2})?$/, () => <Translate validations='validations:invalid' name='phone-number' />),

    province: yup.object().shape({
        label: yup.string().trim().required(<Translate validations='validations:required' name='province' />),
        value: yup.string().trim().required(<Translate validations='validations:required' name='province' />)
    }),

    service: yup.object().shape({
        label: yup.string().trim().required(<Translate validations='validations:required' name='service' />),
        value: yup.string().trim().required(<Translate validations='validations:required' name='service' />)
    }),

    attachments: yup
        .mixed()
        .test("required", <Translate validations='validations:required' name='file-attachment' />, value => value.length > 0)
        .test("fileType", <Translate validations='validations:allowed-formats' />, (value) =>
            value.length && ["image/jpeg", "image/png", "image/jpg", "application/pdf"].includes(value[0].type)
        )
        .test("fileSize", <Translate validations='validations:size-attachment' name='file-attachment' value="5MB" />, (value) =>
            value.length && value[0].size <= 5000000
        ),

    description: yup
        .string()
        .trim()
        .required(<Translate validations='validations:required' name='message' />)
        .max(251, <Translate validations='validations:max-character' name='message' value={251} />),

});

export default Critics;