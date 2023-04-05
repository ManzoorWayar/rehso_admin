import { store } from '../../app/store'
import { Outlet } from 'react-router-dom';
import { faqApiSlice } from '../faq/faqApiSlice';
import { ContactsApiSlice } from '../contact/contactApiSlice';

const Prefetch = () => {

    store.dispatch(faqApiSlice.util.prefetch('getFaqs', 'faqsList', { force: true }))
    store.dispatch(ContactsApiSlice.util.prefetch('getContacts', 'contactsList', { force: true }))

    return <Outlet />
}

export default Prefetch