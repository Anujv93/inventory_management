/* eslint-disable react/prop-types */
import { Label, TextInput, Button } from "flowbite-react";
import { useState, useEffect } from "react";
import { db } from "../../firebase/config";
import {
  serverTimestamp,
  addDoc,
  collection,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/user/userSlice";

export default function BillingForm({ closeModal, itemToEdit }) {
  const currentPlant = JSON.parse(localStorage.getItem("selectedPlant"));
  const currentUser = useSelector(selectUser);
  const [isEdit, setIsEdit] = useState(false);

  const [billNo, setBillNo] = useState("");
  const [date, setDate] = useState("");
  const [partyName, setPartyName] = useState("");
  const [goods, setGoods] = useState("");
  const [qty, setQty] = useState("");
  const [unit, setUnit] = useState("");
  const [price, setPrice] = useState("");
  const [sgst, setSgst] = useState("");
  const [cgst, setCgst] = useState("");
  const [igst, setIgst] = useState("");
  const [roundOff, setRoundOff] = useState("");
  const [grandTotal, setGrandTotal] = useState("");

  // Set initial values if editing an item
  useEffect(() => {
    if (itemToEdit) {
      setBillNo(itemToEdit.billNo);
      setDate(itemToEdit.date);
      setPartyName(itemToEdit.partyName);
      setGoods(itemToEdit.goods);
      setQty(itemToEdit.qty);
      setUnit(itemToEdit.unit);
      setPrice(itemToEdit.price);
      setSgst(itemToEdit.sgst);
      setCgst(itemToEdit.cgst);
      setIgst(itemToEdit.igst);
      setRoundOff(itemToEdit.roundOff);
      setGrandTotal(itemToEdit.grandTotal);
      setIsEdit(true);
    }
  }, [itemToEdit]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(db, "billing", itemToEdit.id);
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        const currentData = docSnapshot.data();

        const editHistoryRef = collection(docRef, "updates");

        const editData = {
          ...currentData,
          timeStamp: serverTimestamp(),
          user: currentUser,
        };

        await addDoc(editHistoryRef, editData);

        await updateDoc(docRef, {
        billNo,
        date,
        partyName,
        goods,
        qty,
        unit,
        price,
        sgst,
        cgst,
        igst,
        roundOff,
        grandTotal,
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

  const handleAddItem = async (e) => {
    e.preventDefault();
    try {
      const dataToUpload = {
        billNo,
        date,
        partyName,
        goods,
        qty,
        unit,
        price,
        sgst,
        cgst,
        igst,
        roundOff,
        grandTotal,
        timeStamp: serverTimestamp(),
        plant: currentPlant,
        user: currentUser,
      };
      const docRef = await addDoc(collection(db, "billing"), dataToUpload);
      console.log("Document written with ID: ", docRef.id);

      setBillNo("");
      setDate("");
      setPartyName("");
      setGoods("");
      setQty("");
      setUnit("");
      setPrice("");
      setSgst("");
      setCgst("");
      setIgst("");
      setRoundOff("");
      setGrandTotal("");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
    closeModal();
  };

  return (
    <form className="bg-white rounded-lg px-2 w-full">
      <div className="mb-4">
        <Label htmlFor="billNo" value="Bill No." />
        <TextInput
          id="billNo"
          placeholder="Enter Bill No."
          required
          value={billNo}
          onChange={(e) => setBillNo(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="date" value="Date" />
        <TextInput
          id="date"
          placeholder="Enter Date"
          required
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="partyName" value="Party Name" />
        <TextInput
          id="partyName"
          placeholder="Enter Party Name"
          required
          value={partyName}
          onChange={(e) => setPartyName(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="goods" value="Goods" />
        <TextInput
          id="goods"
          placeholder="Enter Goods"
          required
          value={goods}
          onChange={(e) => setGoods(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="qty" value="QTY" />
        <TextInput
          id="qty"
          placeholder="Enter QTY"
          type="number"
          required
          value={qty}
          onChange={(e) => setQty(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="unit" value="Unit" />
        <TextInput
          id="unit"
          placeholder="Enter Unit"
          required
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="price" value="Price" />
        <TextInput
          id="price"
          placeholder="Enter Price"
          type="number"
          required
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="sgst" value="SGST" />
        <TextInput
          id="sgst"
          placeholder="Enter SGST"
          type="number"
          required
          value={sgst}
          onChange={(e) => setSgst(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="cgst" value="CGST" />
        <TextInput
          id="cgst"
          placeholder="Enter CGST"
          type="number"
          required
          value={cgst}
          onChange={(e) => setCgst(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="igst" value="IGST" />
        <TextInput
          id="igst"
          placeholder="Enter IGST"
          type="number"
          required
          value={igst}
          onChange={(e) => setIgst(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="roundOff" value="Round Off" />
        <TextInput
          id="roundOff"
          placeholder="Enter Round Off"
          type="number"
          required
          value={roundOff}
          onChange={(e) => setRoundOff(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="grandTotal" value="Grand Total" />
        <TextInput
          id="grandTotal"
          placeholder="Enter Grand Total"
          type="number"
          required
          value={grandTotal}
          onChange={(e) => setGrandTotal(e.target.value)}
        />
      </div>
      <Button
        className="w-full"
        onClick={isEdit ? handleUpdate : handleAddItem}
      >
        {isEdit ? "UPDATE ITEM" : "ADD ITEM"}
      </Button>
    </form>
  );
}