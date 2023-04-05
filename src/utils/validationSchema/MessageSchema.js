import * as yup from "yup"
import Translate from "../../hooks/Translate";

const MessageSchema = yup.object().shape({
    text: yup
        .string()
        .trim()
        .when('attachments', (attachments, schema) => {
            if (attachments && Object.values(attachments).length === 0)
                return schema
                    .required(<Translate validations='validations:required' name='message' />)
                    .max(100, <Translate validations='validations:max-character' name='message' value={100} />)
            return schema.nullable()
        }),

    attachments: yup
        .mixed()
        .test("required", <Translate validations='validations:required' name='file-attachment' />, (file) => {
            if (file) return true;
            return false;
        })
        .test("fileType", <Translate validations='validations:allowed-formats' />, (file) => {
            if (file && Object.values(file).length > 0) {
                return ["image/jpeg", "image/png", "image/jpg", "application/pdf"].includes(file[0].type)
            }

            return true
        })
        .test("fileSize", <Translate validations='validations:size-attachment' name='file-attachment' value="5MB" />, (file) => {
            if (file && Object.values(file).length > 0) {
                return file[0].size <= 5000000
            }

            return true
        })
});

export default MessageSchema;