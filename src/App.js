import 'bootstrap/dist/css/bootstrap.min.css'
import { lazy, Suspense } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import ContactUs from './screens/ContactUs';
import Home from './screens/Home';
import store from './store'

const Shop = lazy(() => import('./screens/Shop'))
const Cart = lazy(() => import('./screens/Cart'))

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path='/' exact element={<Home />} />
              <Route path='/shop' element={<Shop />} />
              <Route path='/contact-us' element={<ContactUs />} />
              <Route path='/cart' element={<Cart />} />
            </Routes>
          </Suspense>
        </Layout >
      </BrowserRouter>
    </Provider>
  );
}

export default App;
