import './App.css';
import React, { useState, useEffect } from 'react';
//import ReactDOM from 'react-dom';
//import { Route, Switch, HashRouter } from 'react-router-dom'
import { db } from "./firebaseConfig";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import Button from '@mui/material/Button'
// import TabPanel from './Tabs'

function App() {
  const [newSpecies, setSpecies] = useState("")
  const [newGenus, setGenus] = useState("")
  const [animals, setAnimals] = useState([]);
  const animalsColRef = collection(db, 'animals');

  const createAnimal = async () => {
    await addDoc(animalsColRef, { species: newSpecies, genus: newGenus })
  }

  const updateAnimal = async (id, species, genus) => {
    const animalDoc = doc(db, 'animals', id)
    const newFields = { species: species, genus: genus }
    await updateDoc(animalDoc, newFields)
  }

  const deleteAnimal = async (id) => {
    const animalDoc = doc(db, 'animals', id)
    await deleteDoc(animalDoc)
  }

  useEffect(() => {
    const getAnimals = async () => {
      const data = await getDocs(animalsColRef);
      setAnimals(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getAnimals();
  }, []);

  return (

    <div className="App">
      <div className="App-Header">
        <div className="App-Title">
          <h2>Firestore App</h2>
        </div>
        <div className="App-Link">
          {/* <NavLink to='/add-new-item' className="New-Link">+ New Item</NavLink> */}
        </div>
      </div>
      <input
        placeholder="Species"
        onChange={(event) => {
          setSpecies(event.target.value);
        }}
      />
      <input
        placeholder="Genus"
        onChange={(event) => {
          setGenus(event.target.value);
        }}
      />
      <Button variant="outlined" onClick={createAnimal}>New Animal</Button>
      {animals.map((animal) => {
        return (
          <div>
            <p>Species: {animal.species}</p>
            <p>Genus: {animal.genus}</p>
            <Button variant="outlined"
              onClick={() =>
                updateAnimal(animal.id, animal.species, animal.genus)}>
              Update Animal
            </Button>
          </div>
        )
      })}

    </div>



  );
}

export default App;
