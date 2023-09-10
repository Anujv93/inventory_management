import { Button,Modal } from "flowbite-react";
import {useState} from "react";
import InventoryForm from "../../components/forms/InventoryForm";
import { useSelector } from "react-redux";

import { selectUser } from "../../features/user/userSlice";
import {  useEffect } from 'react';
import TableComponent from '../../components/table'; // You should import your TableComponent here
import { db } from '../../firebase/config';
import {
  collection,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';

function InventoryPage() {
  const [openModal, setOpenModal] = useState();
  const [selectedItem, setSelectedItem] = useState(null);
  // Handle Edit action
const handleEditItem = (item) => {
  // Implement the logic to open a modal for editing the item

  setSelectedItem(item); // Set the selected item to the state
  setOpenModal('editProduct'); 
};

// Handle Update action


// Handle Delete action
const handleDeleteItem = (item) => {
  // Implement the logic to delete the item from Firebase Firestore
  alert("clieked delete item" + item.id)
};



  const openAddProductModal = () => {
    setOpenModal('addProduct');
  };

  const closeAddProductModal = () => {
    setOpenModal(undefined);
  };
const [inventoryData, setInventoryData] = useState([]);
  const currentUser = useSelector(selectUser);
  const plant = JSON.parse(localStorage.getItem("selectedPlant"));
  const inventoryColumns = [
    'itemName',
    'partNo',
    'rackNo',
    'qty',
    'issueQty',
    'netQty',
    'remark',
  ];

   useEffect(() => {
    // Fetch inventory data from Firebase
    const q = query(collection(db, 'inventory'),where("plant","==",plant));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = [];
      snapshot.forEach((item) => {
        data.push({ id: item.id, ...item.data() });
      });
      setInventoryData(data);
    });

    return () => unsubscribe();
  }, []);

    return (
    <div>
    <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
      <div className="w-full mb-1">
        <div className="mb-4">
          <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">All products <br/>{currentUser.email} <br/>{plant} </h1>
        </div>
        <div className="items-center justify-between block sm:flex md:divide-x md:divide-gray-100 dark:divide-gray-700">
          <div className="flex items-center mb-4 sm:mb-0">
            <form className="sm:pr-3" action="#" method="GET">
              <label htmlFor="products-search" className="sr-only">Search</label>
              <div className="relative w-48 mt-1 sm:w-64 xl:w-96">
                <input
                  type="text"
                  name="email"
                  id="products-search"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Search for products"
                />
              </div>
            </form>
            <div className="flex items-center w-full sm:justify-end">
              <div className="flex pl-2 space-x-1">
                <a href="#" className="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"></path></svg>
                </a>
                <a href="#" className="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                </a>
                <a href="#" className="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                </a>
                <a href="#" className="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path></svg>
                </a>
              </div>
            </div>
          </div>
          <Button onClick={openAddProductModal}> ADD PRODUCT </Button>
        </div>
      </div>
    </div>
    <div className="flex flex-col">
    <div className="overflow-auto">
        <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow">
                <TableComponent
        data={inventoryData}
        columns={inventoryColumns}
        actions={[
    {
      label: 'Update',
      onClick: (item) => handleEditItem(item), // Define the handleEditItem function
    },
    {
      label: 'Delete',
      onClick: (item) => handleDeleteItem(item), // Define the handleDeleteItem function
    },
  ]}
      />
            </div>
        </div>
    </div>
</div>
<Modal
        dismissible
        show={openModal === 'addProduct'}
        onClose={closeAddProductModal}
        className="modal_class rounded-lg shadow-md "
        style={{ overlay: { background: 'rgba(0, 0, 0, 0.5)' } }}
      >
        <Modal.Header>Add Inventory</Modal.Header>
        <Modal.Body>
        <InventoryForm closeModal={closeAddProductModal} />
        </Modal.Body>
      </Modal>
      <Modal
        dismissible
        show={openModal === 'editProduct'} // Check if the modal should be shown for editing
        onClose={() => {
          setOpenModal(undefined); // Close the modal when needed
          setSelectedItem(null); // Clear the selected item
        }}
        className="modal_class rounded-lg shadow-md "
        style={{ overlay: { background: 'rgba(0, 0, 0, 0.5)' } }}
      >
        <Modal.Header>Edit Inventory</Modal.Header>
        <Modal.Body>
          {selectedItem && <InventoryForm closeModal={() => setOpenModal(undefined)} itemToEdit={selectedItem} />}
        </Modal.Body>
      </Modal>
</div>
  );
}

export default InventoryPage

