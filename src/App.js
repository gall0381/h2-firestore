import './App.css';
import React, { useState, useEffect } from 'react';
import { db } from "./firebaseConfig";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import Button from '@mui/material/Button'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

function App() {

  const [newSpecies, setSpecies] = useState("")
  const [newGenus, setGenus] = useState("")
  const [animals, setAnimals] = useState([]);
  const [flowers, setFlowers] = useState([]);
  const [trees, setTrees] = useState([]);

  //variables for firebase collections
  const animalsColRef = collection(db, 'animals');
  const flowersColRef = collection(db, 'flowers');
  const treesColRef = collection(db, 'trees');

  //tabs
  const [value, setValue] = React.useState('1');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //handle create
  const createAnimal = async () => {
    await addDoc(animalsColRef, { species: newSpecies, genus: newGenus })
  }

  const createFlower = async () => {
    await addDoc(flowersColRef, { species: newSpecies, genus: newGenus })
  }

  const createTrees = async () => {
    await addDoc(treesColRef, { species: newSpecies, genus: newGenus })
  }

  //update operations
  const updateAnimal = async (id, species, genus) => {
    const animalDoc = doc(db, 'animals', id)
    const newFields = { species: species, genus: genus }
    await updateDoc(animalDoc, newFields)
  }

  const updateFlower = async (id, species, genus) => {
    const flowerDoc = doc(db, 'flowers', id)
    const newFields = { species: species, genus: genus }
    await updateDoc(flowerDoc, newFields)
  }

  const updateTree = async (id, species, genus) => {
    const treeDoc = doc(db, 'trees', id)
    const newFields = { species: species, genus: genus }
    await updateDoc(treeDoc, newFields)
  }

  //delete operations
  const deleteAnimal = async (id) => {
    const animalDoc = doc(db, 'animals', id)
    await deleteDoc(animalDoc)
  }

  const deleteFlower = async (id) => {
    const flowerDoc = doc(db, 'flowers', id)
    await deleteDoc(flowerDoc)
  }

  const deleteTree = async (id) => {
    const treeDoc = doc(db, 'trees', id)
    await deleteDoc(treeDoc)
  }

  useEffect(() => {
    const getAnimals = async () => {
      const data = await getDocs(animalsColRef);
      setAnimals(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getAnimals();

    const getFlowers = async () => {
      const data = await getDocs(flowersColRef);
      setFlowers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getFlowers();

    const getTrees = async () => {
      const data = await getDocs(treesColRef);
      setTrees(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getTrees();

  }, []);

  return (
    <div className="App">
      <div className="App-Header">
        <div className="App-Title">
          <h2>Firestore App &nbsp;✽</h2>
        </div>
        <div className="App-Link">
          <p>Created by Naomi Gallupe</p>
        </div>
      </div>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} >
              <Tab label="Animals" value="animals" />
              <Tab label="Flowers" value="flowers" />
              <Tab label="Trees" value="trees" />
            </TabList>
          </Box>
          <div className="Instructions">
            <p>You can add, update or delete from any category. Click on any tab to begin.</p>
          </div>
          <TabPanel value="animals">
            <TextField sx={{ m: 0.5 }} size="small"
              label="Species"
              onChange={(event) => {
                setSpecies(event.target.value);
              }}
            />
            <TextField sx={{ m: 0.5 }} size="small"
              label="Genus"
              onChange={(event) => {
                setGenus(event.target.value);
              }}
            />
            <Button sx={{ m: 0.5 }} variant="outlined" onClick={createAnimal}>Add New Animal</Button>
            {animals.map((animal) => {
              return (
                <div>
                  <Card sx={{ maxWidth: 345, m: 2 }} variant="outlined">
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        Species: {animal.species}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Genus: {animal.genus}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button variant="outlined"
                        onClick={() =>
                          updateAnimal(animal.id, animal.species, animal.genus)}>
                        Update Animal
                      </Button>
                      <Button variant="outlined"
                        onClick={() =>
                          deleteAnimal(animal.id)}>
                        Delete Animal
                      </Button>
                    </CardActions>
                  </Card>
                </div>
              )
            })}
          </TabPanel>
          <TabPanel value="flowers">
            <TextField sx={{ m: 0.5 }} size="small"
              label="Species"
              onChange={(event) => {
                setSpecies(event.target.value);
              }}
            />
            <TextField sx={{ m: 0.5 }} size="small"
              label="Genus"
              onChange={(event) => {
                setGenus(event.target.value);
              }}
            />
            <Button sx={{ m: 0.5 }} variant="outlined" onClick={createAnimal}>Add New Flower</Button>
            {flowers.map((flower) => {
              return (
                <div>
                  <Card sx={{ maxWidth: 345, m: 2 }} variant="outlined">
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        Species: {flower.species}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Genus: {flower.genus}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button variant="outlined"
                        onClick={() =>
                          updateFlower(flower.id, flower.species, flower.genus)}>
                        Update Flower
                      </Button>
                      <Button variant="outlined"
                        onClick={() =>
                          deleteFlower(flower.id)}>
                        Delete Flower
                      </Button>
                    </CardActions>
                  </Card>
                </div>
              )
            })}
          </TabPanel>
          <TabPanel value="trees">
            <TextField sx={{ m: 0.5 }} size="small"
              label="Species"
              onChange={(event) => {
                setSpecies(event.target.value);
              }}
            />
            <TextField sx={{ m: 0.5 }} size="small"
              label="Genus"
              onChange={(event) => {
                setGenus(event.target.value);
              }}
            />
            <Button sx={{ m: 0.5 }} variant="outlined" onClick={createAnimal}>Add New Tree</Button>
            {trees.map((tree) => {
              return (
                <div>
                  <Card sx={{ maxWidth: 345, m: 2 }} variant="outlined">
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        Species: {tree.species}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Genus: {tree.genus}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button variant="outlined"
                        onClick={() =>
                          updateTree(tree.id, tree.species, tree.genus)}>
                        Update Tree
                      </Button>
                      <Button variant="outlined"
                        onClick={() =>
                          deleteTree(tree.id)}>
                        Delete Tree
                      </Button>
                    </CardActions>
                  </Card>
                </div>
              )
            })}
          </TabPanel>
        </TabContext>
      </Box>
    </div>



  );
}

export default App;
