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


export default function TollForm({ closeModal, itemToEdit }) {

    const currentUser = useSelector(selectUser);
    const currentPlant = JSON.parse(localStorage.getItem("selectedPlant"));
    const [isEdit,setIsEdit] = useState(false)
  // Define your kanta fields here
  const [entryTime, setEntryTime] = useState('');
  const [exitTime, setExitTime] = useState('');
  const [entryTimeweight, setEntryTimeweight] = useState('');
  const [exitTimeweight, setExitTimeweight] = useState('');
  const [sampleTaken, setSampleTaken] = useState('');
  const [source, setSource] = useState('');
  const [category, setCategory] = useState('');
  const [remarks, setRemarks] = useState('');
  const [status, setStatus] = useState('');
  const [purity, setPurity] = useState('');
  const [crossVerification, setCrossVerification] = useState('');
  const [labName, setLabName] = useState('');
  const [labAddress, setLabAddress] = useState('');
  const [report, setReport] = useState('');
  const [dispatchDate, setDispatchDate] = useState('');
  const [reciertyDate, setReciertyDate] = useState('');

  // ...
  useEffect(() => {
    if (itemToEdit){
        setEntryTime(itemToEdit.entryTime)
setExitTime(itemToEdit.exitTime)
setEntryTimeweight(itemToEdit.entryTimeweight)
setExitTimeweight(itemToEdit.exitTimeweight)
setSampleTaken(itemToEdit.sampleTaken)
setSource(itemToEdit.source)
setCategory(itemToEdit.category)
setRemarks(itemToEdit.remarks)
setStatus(itemToEdit.status)
setPurity(itemToEdit.purity)
setCrossVerification(itemToEdit.crossVerification)
setLabName(itemToEdit.labName)
setLabAddress(itemToEdit.labAddress)
setReport(itemToEdit.report)
setDispatchDate(itemToEdit.dispatchDate)
setReciertyDate(itemToEdit.reciertyDate)
setIsEdit(true)
    }
  },[itemToEdit])

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(db, 'kanta', itemToEdit.id); // Adjust the collection name as needed
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        const currentData = docSnapshot.data();

        const editHistoryRef = collection(docRef,"updates");

        const editData = {
          ...currentData,
          timeStamp: serverTimestamp(),
          user: currentUser,
        };

        await addDoc(editHistoryRef, editData);

        await updateDoc(docRef,{
        entryTime,
        exitTime,
        entryTimeweight,
        exitTimeweight,
        sampleTaken,
        source,
        category,
        remarks,
        status,
        purity,
        crossVerification,
        labName,
        labAddress,
        report,
        dispatchDate,
        reciertyDate,
        timeStamp: serverTimestamp(),
        plant: currentPlant,
        user: currentUser,
        })
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
        entryTime,
        exitTime,
        entryTimeweight,
        exitTimeweight,
        sampleTaken,
        source,
        category,
        remarks,
        status,
        purity,
        crossVerification,
        labName,
        labAddress,
        report,
        dispatchDate,
        reciertyDate,
        timeStamp: serverTimestamp(),
        plant: currentPlant,
        user: currentUser,
      };
      const docRef = await addDoc(collection(db, 'kanta'),dataToUpload); // Adjust the collection name as needed
      console.log('Document written with ID: ', docRef.id);

      // Clear the form fields after submission
      setEntryTime('');
      setExitTime('');
      setEntryTimeweight('');
      setExitTimeweight('');
      setSampleTaken('');
      setSource('');
      setCategory('');
      setRemarks('');
      setStatus('');
      setPurity('');
      setCrossVerification('');
      setLabName('');
      setLabAddress('');
      setReport('');
      setDispatchDate('');
      setReciertyDate('');
    } catch (error) {
      console.error('Error adding document: ', error);
    }
    closeModal();
  };

  return (
   <form className="bg-white rounded-lg px-2 w-full">
      <div className="mb-4">
        <Label htmlFor="entryTime" value="Entry Time" />
        <TextInput
          id="entryTime"
          placeholder="Enter Entry Time"
          required
          value={entryTime}
          onChange={(e) => setEntryTime(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="exitTime" value="Exit Time" />
        <TextInput
          id="exitTime"
          placeholder="Enter Exit Time"
          required
          value={exitTime}
          onChange={(e) => setExitTime(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="entryTimeweight" value="Entry Time Weight" />
        <TextInput
          id="entryTimeweight"
          placeholder="Enter Entry Time Weight"
          required
          value={entryTimeweight}
          onChange={(e) => setEntryTimeweight(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="exitTimeweight" value="Exit Time Weight" />
        <TextInput
          id="exitTimeweight"
          placeholder="Enter Exit Time Weight"
          required
          value={exitTimeweight}
          onChange={(e) => setExitTimeweight(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="sampleTaken" value="Sample Taken" />
        <TextInput
          id="sampleTaken"
          placeholder="Enter Sample Taken"
          required
          value={sampleTaken}
          onChange={(e) => setSampleTaken(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="source" value="Source" />
        <TextInput
          id="source"
          placeholder="Enter Source"
          required
          value={source}
          onChange={(e) => setSource(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="category" value="Category" />
        <TextInput
          id="category"
          placeholder="Enter Category"
          required
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="remarks" value="Remarks" />
        <TextInput
          id="remarks"
          placeholder="Enter Remarks"
          required
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="status" value="Status" />
        <TextInput
          id="status"
          placeholder="Enter Status"
          required
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="purity" value="Purity" />
        <TextInput
          id="purity"
          placeholder="Enter Purity"
          required
          value={purity}
          onChange={(e) => setPurity(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="crossVerification" value="Cross Verification" />
        <TextInput
          id="crossVerification"
          placeholder="Enter Cross Verification"
          required
          value={crossVerification}
          onChange={(e) => setCrossVerification(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="labName" value="Lab Name" />
        <TextInput
          id="labName"
          placeholder="Enter Lab Name"
          required
          value={labName}
          onChange={(e) => setLabName(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="labAddress" value="Lab Address" />
        <TextInput
          id="labAddress"
          placeholder="Enter Lab Address"
          required
          value={labAddress}
          onChange={(e) => setLabAddress(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="report" value="Report" />
        <TextInput
          id="report"
          placeholder="Enter Report"
          required
          value={report}
          onChange={(e) => setReport(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="dispatchDate" value="Dispatch Date" />
        <TextInput
          id="dispatchDate"
          placeholder="Enter Dispatch Date"
          required
          value={dispatchDate}
          onChange={(e) => setDispatchDate(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="reciertyDate" value="Recierty Date" />
        <TextInput
          id="reciertyDate"
          placeholder="Enter Recierty Date"
          required
          value={reciertyDate}
          onChange={(e) => setReciertyDate(e.target.value)}
        />
      </div>
      <div className="flex items-center justify-end">
        {isEdit ? (
          <Button className="mr-2" onClick={handleUpdate}>
            Update
          </Button>
        ) : (
          <Button className="mr-2" onClick={handleAddItem}>
            Add
          </Button>
        )}
        <Button type="button" onClick={closeModal}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
