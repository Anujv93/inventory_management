import { useState, useEffect, useCallback } from "react";
import { Select } from "flowbite-react";
import { useDispatch } from "react-redux";
import { updatePlant } from "../../features/plant/plantSlice";

export default function InlineDropdown() {
  const plantList = ["plant_one", "plant_two", "plant_three"];
  const [selectedPlant, setPlant] = useState("");
  const dispatch = useDispatch();
  const prePlant = JSON.parse(localStorage.getItem("selectedPlant"));

  useEffect(() => {
    console.log(selectedPlant);
    dispatch(updatePlant(selectedPlant));
  }, [dispatch, selectedPlant]);

  const handlePlantSelect = useCallback((e) => {
    setPlant(e.target.value);
    localStorage.setItem("selectedPlant", JSON.stringify(e.target.value))
    location.reload()  
  },[]);

  console.log(prePlant)
  return (
    <Select onChange={handlePlantSelect} id="plants" defaultValue={prePlant}  required>
      <option default disabled >
        Select Plant
      </option>
      {plantList.map((plant) => (
        <option key={plant} value={plant}>
          {plant}
        </option>
      ))}
    </Select>
  );
}
