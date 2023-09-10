/* eslint-disable react/prop-types */
import { Label, TextInput, Button } from "flowbite-react";
import { useState, useEffect } from "react";
import { db } from "../../firebase/config"; // Import Firebase config and necessary Firestore functions
import { serverTimestamp, addDoc, collection, doc,getDoc,updateDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/user/userSlice";

export default function InventoryForm({ closeModal, itemToEdit }) {
  const currentPlant = JSON.parse(localStorage.getItem("selectedPlant"));
  const currentUser = useSelector(selectUser);
  const [isEdit, setisEdit] = useState(false);

  const [itemName, setItemName] = useState("");
  const [partNo, setPartNo] = useState("");
  const [rackNo, setRackNo] = useState("");
  const [qty, setQty] = useState("");
  const [issueQty, setIssueQty] = useState("");
  const [netQty, setNetQty] = useState("");
  const [remark, setRemark] = useState("");

  // Set initial values if editing an item
  useEffect(() => {
    if (itemToEdit) {
      setItemName(itemToEdit.itemName);
      setPartNo(itemToEdit.partNo);
      setRackNo(itemToEdit.rackNo);
      setQty(itemToEdit.qty);
      setIssueQty(itemToEdit.issueQty);
      setNetQty(itemToEdit.netQty);
      setRemark(itemToEdit.remark);
      setisEdit(true);
    }
  }, [itemToEdit]);

  const handelUpdate = async (e) => {
  e.preventDefault();
  try {
    const docRef = doc(db, "inventory", itemToEdit.id);
    // Retrieve the current data of the document
    const docSnapshot = await getDoc(docRef);
    if (docSnapshot.exists()) {
      const currentData = docSnapshot.data();

      // Create a new document in the "edits" subcollection with the previous data
      const editHistoryRef = collection(docRef,'updates');
      const editData = {
        ...currentData,
        timeStamp: serverTimestamp(),
        user: currentUser,
      };

      // Set the data for the edit document
      await addDoc(editHistoryRef,editData);

      // Update the document with the new data
      await updateDoc(docRef,{
        itemName,
        partNo,
        rackNo,
        qty,
        issueQty,
        netQty,
        remark,
        timeStamp: serverTimestamp(),
        plant: currentPlant,
        user: currentUser,
      });
    }
  } catch (e) {
    alert(e.message);
  }
  closeModal();
};
  // Handle form submission
  const handleAddItem = async (e) => {
    e.preventDefault();

    try {
      // Add the form data to the Firebase Firestore collection
      const dataToUpload = {
        itemName,
        partNo,
        rackNo,
        qty,
        issueQty,
        netQty,
        remark,
        timeStamp: serverTimestamp(),
        plant: currentPlant,
        user: currentUser,
      };
      const docRef = await addDoc(collection(db, "inventory"), dataToUpload);
      console.log("Document written with ID: ", docRef.id);

      // Clear the form fields after submission
      setItemName("");
      setPartNo("");
      setRackNo("");
      setQty("");
      setIssueQty("");
      setNetQty("");
      setRemark("");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
    closeModal();
  };

  return (
    <form className="bg-white rounded-lg px-2 w-full" >
      <div className="mb-4">
        <Label htmlFor="itemName" value="Item Name" />
        <TextInput
          id="itemName"
          placeholder="Enter item name"
          required
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="partNo" value="Part No." />
        <TextInput
          id="partNo"
          placeholder="Enter part number"
          required
          value={partNo}
          onChange={(e) => setPartNo(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="rackNo" value="Rack No." />
        <TextInput
          id="rackNo"
          placeholder="Enter rack number"
          required
          value={rackNo}
          onChange={(e) => setRackNo(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="qty" value="QTY" />
        <TextInput
          id="qty"
          placeholder="Enter quantity"
          type="number"
          required
          value={qty}
          onChange={(e) => setQty(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="issueQty" value="Issue QTY" />
        <TextInput
          id="issueQty"
          placeholder="Enter issued quantity"
          type="number"
          required
          value={issueQty}
          onChange={(e) => setIssueQty(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="netQty" value="Net QTY" />
        <TextInput
          id="netQty"
          placeholder="Enter net quantity"
          type="number"
          required
          value={netQty}
          onChange={(e) => setNetQty(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="remark" value="Remark" />
        <TextInput
          id="remark"
          placeholder="Enter remarks"
          required
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
        />
      </div>
      <Button onc className="w-full" onClick={isEdit ? handelUpdate : handleAddItem}>
        {isEdit ? "UPDATE ITEM" : "ADD ITEM"}
      </Button>
    </form>
  );
}