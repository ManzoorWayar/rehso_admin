import { store } from '../../app/store'
import { Outlet } from 'react-router-dom';
// import { faqApiSlice } from '../faq/faqApiSlice'; 

const Prefetch = () => {

    // store.dispatch(faqApiSlice.util.prefetch('getFaqs', 'faqsList', { force: true })) 

    return <Outlet />
}

export default Prefetch