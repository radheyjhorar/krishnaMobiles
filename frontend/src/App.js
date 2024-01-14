import './App.css';
import Nav from './components/Nav';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from './components/Footer';
import AddState from './components/state/AddState';
import StateList from './components/state/StateList';
import UpdateState from './components/state/UpdateState';
import AddCity from './components/city/AddCity';
import CityList from './components/city/CityList';
import UpdateCity from './components/city/UpdateCity';
import Home from './components/Home';
import VendorList from './components/vendor/VendorList';
import AddVendor from './components/vendor/AddVendor';
import UpdateVendor from './components/vendor/UpdateVendor';
import VendorStockItem from './components/vendor/VendorStockItem';
import VendorStockItemList from './components/vendor/VendorStockItemList';
import VendorStockList from './components/vendor/VendorStockList';
import VendorPayment from './components/vendor/VendorPayment';
import VendorPaymentList from './components/vendor/VendorPaymentList';
import UpdateVendorPayment from './components/vendor/UpdateVendorPayment';
import AddCustomer from './components/customer/AddCustomer';
import CustomerList from './components/customer/CustomerList';
import UpdateCustomer from './components/customer/UpdateCustomer';
import CustomerPaymentList from './components/customer/CustomerPaymentList';
import AddCustomerPayment from './components/customer/AddCustomerPayment';
import UpdateCustomerPayment from './components/customer/UpdateCustomerPayment';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/customer-list' element={<CustomerList />} />
          <Route path='/add-customer' element={<AddCustomer />} />
          <Route path='/update-customer/:id' element={<UpdateCustomer />} />
          <Route path='/customer-payment-list' element={<CustomerPaymentList />} />
          <Route path='/add-customer-payment' element={<AddCustomerPayment />} />
          <Route path='/update-customer-payment/:id' element={<UpdateCustomerPayment />} />
          <Route path='/state' element={<StateList />} />
          <Route path='/add-state' element={<AddState />} />
          <Route path='/update-state/:id' element={<UpdateState />} />
          <Route path='/cities' element={<CityList />} />
          <Route path='/add-city' element={<AddCity />} />
          <Route path='/update-city/:id' element={<UpdateCity />} />
          <Route path='/vendor' element={<VendorList />} />
          <Route path='/vendor-stock-item' element={<VendorStockItem />} />
          <Route path='/add-vendor' element={<AddVendor />} />
          <Route path='/update-vendor/:id' element={<UpdateVendor />} />
          <Route path='/vendor-stock-item-list' element={<VendorStockItemList />} />
          <Route path='/vendor-stock-list' element={<VendorStockList />} />
          <Route path='/vendor-payment-List' element={<VendorPaymentList />} />
          <Route path='/vendor-payment' element={<VendorPayment />} />
          <Route path='/update-vendor-payment/:id' element={<UpdateVendorPayment />} />
          <Route path='/logout' element={<h1>Logout Component</h1>} />
          <Route path='/profile' element={<h1>Profile Component</h1>} />
          <Route path='/signup' element={<h1>Sign Up Component</h1>} />
          <Route path='/login' element={<h1>LogIn Component</h1>} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
