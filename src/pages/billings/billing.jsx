import { Button, Modal } from "flowbite-react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/user/userSlice";
import { db } from "../../firebase/config";
import {
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import TableComponent from "../../components/table";
import BillingForm from "../../components/forms/BillingForm";

function BillingPage() {
  const [openModal, setOpenModal] = useState();
  const [selectedItem, setSelectedItem] = useState(null);

  // Handle Edit action
  const handleEditItem = (item) => {
    setSelectedItem(item);
    setOpenModal("editBilling");
  };

  // Handle Delete action
  const handleDeleteItem = (item) => {
    // Implement the logic to delete the item from Firebase Firestore
    alert("Clicked delete item " + item.id);
  };

  const openAddBillingModal = () => {
    setOpenModal("addBilling");
  };

  const closeAddBillingModal = () => {
    setOpenModal(undefined);
  };

  const [billingData, setBillingData] = useState([]);
  const currentUser = useSelector(selectUser);

  const billingColumns = [
    "billNo",
    "date",
    "partyName",
    "goods",
    "qty",
    "unit",
    "price",
    "sgst",
    "cgst",
    "igst",
    "roundOff",
    "grandTotal",
  ];

  const plant = JSON.parse(localStorage.getItem("selectedPlant"));

  useEffect(() => {
    // Fetch billing data from Firebase
    const q = query(collection(db, "billing"),where("plant","==",plant));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = [];
      snapshot.forEach((item) => {
        data.push({ id: item.id, ...item.data() });
      });
      setBillingData(data);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
        <div className="w-full mb-1">
          <div className="mb-4">
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
              All bills <br />
              {currentUser.email} <br />
              {plant}
            </h1>
          </div>
          <div className="items-center justify-between block sm:flex md:divide-x md:divide-gray-100 dark:divide-gray-700">
            <div className="flex items-center mb-4 sm:mb-0">
              <form className="sm:pr-3" action="#" method="GET">
                <label htmlFor="bills-search" className="sr-only">
                  Search
                </label>
                <div className="relative w-48 mt-1 sm:w-64 xl:w-96">
                  <input
                    type="text"
                    name="email"
                    id="bills-search"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Search for bills"
                  />
                </div>
              </form>
              <div className="flex items-center w-full sm:justify-end">
                <div className="flex pl-2 space-x-1">
                  <a
                    href="#"
                    className="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    {/* Add your search icon SVG here */}
                  </a>
                  <a
                    href="#"
                    className="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    {/* Add your filter icon SVG here */}
                  </a>
                  <a
                    href="#"
                    className="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    {/* Add your sort icon SVG here */}
                  </a>
                  <a
                    href="#"
                    className="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    {/* Add your settings icon SVG here */}
                  </a>
                </div>
              </div>
            </div>
            <Button onClick={openAddBillingModal}>ADD BILL</Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="overflow-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow">
              <TableComponent
                data={billingData}
                columns={billingColumns}
                actions={[
                  {
                    label: "Update",
                    onClick: (item) => handleEditItem(item),
                  },
                  {
                    label: "Delete",
                    onClick: (item) => handleDeleteItem(item),
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
      <Modal
        dismissible
        show={openModal === "addBilling"}
        onClose={closeAddBillingModal}
        className="modal_class rounded-lg shadow-md "
        style={{ overlay: { background: "rgba(0, 0, 0, 0.5)" } }}
      >
        <Modal.Header>Add Bill</Modal.Header>
        <Modal.Body>
          <BillingForm closeModal={closeAddBillingModal} />
        </Modal.Body>
      </Modal>
      <Modal
        dismissible
        show={openModal === "editBilling"}
        onClose={() => {
          setOpenModal(undefined);
          setSelectedItem(null);
        }}
        className="modal_class rounded-lg shadow-md "
        style={{ overlay: { background: "rgba(0, 0, 0, 0.5)" } }}
      >
        <Modal.Header>Edit Bill</Modal.Header>
        <Modal.Body>
          {selectedItem && (
            <BillingForm
              closeModal={() => setOpenModal(undefined)}
              itemToEdit={selectedItem}
            />
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default BillingPage;
