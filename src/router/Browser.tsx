import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
  } from 'react-router-dom';
import PageNotFound from '../components/PageNotFound/PageNotFound';
import Products from '../pages/Products/Products';

const Browser = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Navigate to='/products' />} />
                <Route path='/products' element={<Products/>}/>
                <Route path='*' element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    );
};  

export default Browser;