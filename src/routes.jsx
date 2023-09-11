import {Routes,Route} from 'react-router-dom';
import BillingPage from './pages/billings/billing';
import InventoryPage from './pages/inventory/Inventory';
import TollPage from './pages/tollkanta/TollKanta';


function MyRoutes() {
  return (
    <Routes>
        <Route path="/billing" element={<BillingPage/>}/>
        <Route path="/inventory" element={<InventoryPage/>}/>
        <Route path="/tollkanta" element={<TollPage/>}/>
    </Routes>
  )
}

export default MyRoutes