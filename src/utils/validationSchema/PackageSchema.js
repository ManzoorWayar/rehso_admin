import * as yup from "yup"
import Translate from "../../hooks/Translate";

const PackageSchema = yup.object().shape({
    name: yup
        .string()
        .trim()
        .required(<Translate validations='validations:required' name='name' />),

    slug: yup
        .string()
        .trim()
        .required(<Translate validations='validations:required' name='slug' />),

    price: yup
        .string()
        .trim()
        .required(<Translate validations='validations:required' name='price' />),

    province: yup.object().shape({
        label: yup.string().trim().required(<Translate validations='validations:required' name='province' />),
        value: yup.string().trim().required(<Translate validations='validations:required' name='province' />)
    }),

    duration: yup.object().shape({
        label: yup.string().trim().required(<Translate validations='validations:required' name='duration' />),
        value: yup.string().trim().required(<Translate validations='validations:required' name='duration' />)
    }),

    category: yup.object().shape({
        label: yup.string().trim().required(<Translate validations='validations:required' name='category' />),
        value: yup.string().trim().required(<Translate validations='validations:required' name='category' />)
    }),

    priority: yup.object().shape({
        label: yup.string().trim().required(<Translate validations='validations:required' name='priority' />),
        value: yup.string().trim().required(<Translate validations='validations:required' name='priority' />)
    })

});

export default PackageSchema;