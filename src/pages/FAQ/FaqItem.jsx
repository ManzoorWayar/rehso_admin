import React from 'react'
import { useGetFaqsQuery } from '../../features/faq/faqApiSlice';

const FaqItem = ({ faqId }) => {
    // const { t, i18n } = useTranslation()

    const { faq } = useGetFaqsQuery("faqsList", {
        selectFromResult: ({ data }) => ({
            faq: data?.entities[faqId],
        }),
    })

    console.log([faq]);

    if (!faq) return <h3>2</h3>

    return <>{faq}</>
}

export default FaqItem