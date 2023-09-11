import { useState, useEffect } from 'react';
import { Button, Modal } from 'flowbite-react';
import { db } from '../../firebase/config';
import {
  collection,
  where,
  query,
  onSnapshot,
} from 'firebase/firestore';
import TableComponent from '../../components/table';
import TollForm from '../../components/forms/TollForm';

const TollPage = () => {
  const [openModal, setOpenModal] = useState();
  const [selectedItem, setSelectedItem] = useState(null);
  
  const openModalform = () => {
    setOpenModal('add');
  };

  const closekantaform = () => {
    setOpenModal(undefined);
  };
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

  const currentPlant = JSON.parse(localStorage.getItem('selectedPlant'));
  const [kantaData, setKantaData] = useState([]);

  const kantaColumns = [
    'entryTime',
    'exitTime',
    'entryTimeweight',
    'exitTimeweight',
    'sampleTaken',
    'source',
    'category',
    'remarks',
    'status',
    'purity',
    'crossVerification',
    'labName',
    'labAddress',
    'report',
    'dispatchDate',
    'reciertyDate',
  ];

  useEffect(() => {
    const q = query(collection(db, 'kanta'),where("plant","==",currentPlant));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = [];
      snapshot.forEach((item) => {
        data.push({ id: item.id, ...item.data() });
      });
      setKantaData(data);
      console.log(kantaData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
        <div className="w-full mb-1">
          <div className="mb-4">
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
              All Entries
            </h1>
          </div>
          <div className="items-center justify-between block sm:flex md:divide-x md:divide-gray-100 dark:divide-gray-700">
            <div className="flex items-center mb-4 sm:mb-0">
              <form className="sm:pr-3" action="#" method="GET">
                <label htmlFor="products-search" className="sr-only">
                  Search
                </label>
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
            </div>
            <Button onClick={openModalform}> ADD </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="overflow-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow">
              <TableComponent
                data={kantaData}
                columns={kantaColumns}
                actions={[
                  {
                    label: 'Update',
                    onClick: (item) => handleEditItem(item),
                  },
                  {
                    label: 'Delete',
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
        show={openModal === 'add'}
        onClose={closekantaform}
        className="modal_class rounded-lg shadow-md "
        style={{ overlay: { background: 'rgba(0, 0, 0, 0.5)' } }}
      >
        <Modal.Header>Add details</Modal.Header>
        <Modal.Body>
          <TollForm closeModal={closekantaform} />
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
            <TollForm
              closeModal={() => setOpenModal(undefined)}
              itemToEdit={selectedItem}
            />
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default TollPage;
