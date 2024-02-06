import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
  } from 'react-router-dom';
import PageNotFound from '../components/PageNotFound/PageNotFound';

const Browser = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/products" />} />
                <Route path="/products" element={<h1>Products</h1>}/>
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    );
};  

export default Browser;