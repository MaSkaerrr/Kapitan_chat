import React, { useState, createContext, useRef, useEffect } from 'react';
import Card from '../Component/Card/Card';
import Header from '../Component/Header/Header';
import Modal from '../Component/Modal/Modal';
import Footer from '../Component/Footer/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { deleteAxios, getAxios, postAxiosAdd, putAxios } from '../Axios/AxiosCommand';
import CardProvider from '../Provider/Provider/CardProvider';
import AddModalProvider from '../Provider/Provider/AddModalProvider';
import AddModal from '../Component/AddModal/AddModal';

export const ModalContext = createContext({});

const Main = () => {
  const [mass, setMass] = useState([]);
  const [currobj, setCurrobj] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const inputRef = useRef(null);

  const loadData = async () => {
    const response = await getAxios("https://jsonplaceholder.typicode.com/todos");
    if (response.status === 200) {
      const mass1 = response.data.slice(0, 10);
      const mass2 = response.data.slice(200);
      setMass([...mass1, ...mass2]);
    }
  };

  const setLocalStorageData = (mass) => {
    localStorage.setItem('mass', JSON.stringify(mass));
  };

  const getLocalStorageData = () => {
    const data = localStorage.getItem('mass');
    return data ? Array.from(JSON.parse(data)) : [];
  };

  useEffect(() => {
    const localData = getLocalStorageData();
    if (localData.length > 0) {
      setMass(localData);
    } else {
      loadData();
    }
  }, []);

  const handleEditClick = (item) => {
    setCurrobj(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleChangemass = (id, value) => {
    const updatedMass = mass.map(item => item.id === id ? { ...item, title: value } : item);
    setMass(updatedMass);
    putAxios("https://jsonplaceholder.typicode.com/todos", id, updatedMass.find(item => item.id === id));
  };

  const onCheckboxChange = (id) => {
    const updatedMass = mass.map(item => item.id === id ? { ...item, completed: !item.completed } : item);
    setMass(updatedMass);
    putAxios("https://jsonplaceholder.typicode.com/todos", id, updatedMass.find(item => item.id === id));
  };

  const handleDeleteClick = (id) => {
    const updatedMass = mass.filter(item => item.id !== id);
    setMass(updatedMass);
    deleteAxios("https://jsonplaceholder.typicode.com/todos", id);
  };

  const handleAddModalOpen = (event) => {
    event.preventDefault();
    setIsAddModalOpen(true);
  };

  const handleAddModalClose = () => {
    setIsAddModalOpen(false);
  };

  const handleSubmitAddModal = (newItem) => {
    setMass([...mass, newItem]);
    postAxiosAdd("https://jsonplaceholder.typicode.com/todos", newItem);
    handleAddModalClose();
  };

  return (
    <CardProvider value={{ mass, handleEditClick, onCheckboxChange, handleDeleteClick }}>
      <ModalContext.Provider value={{ item: currobj, onClose: handleCloseModal, onSave: handleChangemass }}>
        <AddModalProvider value={{ lastitem: mass[mass.length - 1], Open: handleAddModalOpen, Close: handleAddModalClose, Submit: handleSubmitAddModal, inputRef }}>
          <h3 style={{ marginLeft: '30px', fontSize: 'bold' }}>ToDoList</h3>
          <div className="container-fluid d-flex justify-content-center align-items-center" style={{ height: '100%', background: 'blue' }}>
            <div className="container-lg" style={{ height: '85%', background: 'white', borderRadius: '0.75rem', padding: '4% 3%', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
              <Header />
              <Card />
              {isModalOpen && <Modal />}
              {isAddModalOpen && <AddModal />}
              <button onClick={() => setLocalStorageData(mass)} className="btn btn-primary" style={{ width: '5%', height: '5%', marginLeft: '0.75rem' }}>Save</button>
            </div>
          </div>
          <Footer />
        </AddModalProvider>
      </ModalContext.Provider>
    </CardProvider>
  );
};

export default Main;




// import React, { useState, createContext, useRef, useEffect } from 'react';
// import Card from '../Component/Card/Card';
// import Header from '../Component/Header/Header';
// import Modal from '../Component/Modal/Modal';
// import Footer from '../Component/Footer/Footer';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { data } from '../Component/Card/data';
// import CardProvider from '../Provider/Provider/CardProvider';
// import AddModalProvider from '../Provider/Provider/AddModalProvider';
// import AddModal from '../Component/AddModal/AddModal';
// import { deleteAxios, getAxios, postAxiosAdd, putAxios } from '../Axios/AxiosCommand';

// export const ModalContext = createContext({});

// const Main= () => {
//   const setLocalStorageData = (mass) => {
//     localStorage.setItem('mass', JSON.stringify(mass));
//   };

//   const getLocalStorageData = () => {
//     const data = localStorage.getItem('mass');
//     return data ? Array.from(JSON.parse(data)) : data;
//   };


  
//   const [mass, setMass] = useState([]);

//     useEffect(()=>{
//             getAxios("https://jsonplaceholder.typicode.com/todos").then((value) => {
//             if(value.status === 200){
//               const mass1 = value.data.slice(0, 10);
//               const mass2 = value.data.slice(200);
//               setMass([...mass1,...mass2]);
//             }
//         });
        
//     },[])


//   const [currobj, setCurrobj] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isAddModalOpen, setIsAddModalOpen] = useState(false);
//   const inputRef = useRef(null);
//   const handleEditClick = (item) => {
//     setCurrobj(item);
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//   };

//   const handleChangemass = (id, value) => {
//     const updatedMass = mass.map(item => item.id === id ? { ...item, title: value } : item);
//     setMass(updatedMass);
//     putAxios("https://jsonplaceholder.typicode.com/todos",id,mass.find(item => item.id === id));
//   };

//   const onCheckboxChange = (id) => {
//     const updatedMass = mass.map(item => item.id === id ? { ...item, completed: !item.completed } : item);
//     setMass(updatedMass);
//     putAxios("https://jsonplaceholder.typicode.com/todos",id,mass.find(item => item.id === id));
//   };
//   const handleDeleteClick =(id)=>{
//     const index = mass.findIndex(item=>item.id===id);
//     const updatemass1 =mass.slice(0,index);
//     const updatemass2 = mass.slice(index+1);
//     setMass([...updatemass1,...updatemass2]); 
//     deleteAxios("https://jsonplaceholder.typicode.com/todos",id);
//   }

//   const handleAddModalOpen = (event) => {
//     event.preventDefault(); 
//     setIsAddModalOpen(true);
//     console.log(isAddModalOpen);
//   };

//   const handleAddModalClose = () => {
//     setIsAddModalOpen(false);
//   };

//   const handleSubmitAddModal = (newItem) => {
//     setMass([...mass, newItem]);
//     postAxiosAdd("https://jsonplaceholder.typicode.com/todos",newItem);
//     handleAddModalClose();
//   };

//   return (
//     <CardProvider value={{ mass, handleEditClick, onCheckboxChange,handleDeleteClick  }}>
//       <ModalContext.Provider value={{ item: currobj, onClose: handleCloseModal, onSave: handleChangemass }}>
//         <AddModalProvider value={{ lastitem: mass[mass.length - 1], Open: handleAddModalOpen, Close: handleAddModalClose, Submit: handleSubmitAddModal,inputRef }}>
//           <h3 style={{ marginLeft: '30px', fontSize: 'bold' }}>ToDoList</h3>
//           <div className="container-fluid d-flex justify-content-center align-items-center" style={{ height: '100%', background: 'blue' }}>
//             <div className="container-lg" style={{ height: '85%', background: 'white', borderRadius: '0.75rem', padding: '4% 3%', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
//               <Header/>
//               <Card/>
//               {isModalOpen && <Modal />}
//               {isAddModalOpen && <AddModal />}
//               <button onClick={() => setLocalStorageData(mass)} className="btn btn-primary" style={{ width: '5%', height: '5%', marginLeft: '0.75rem' }}>Save</button>
//             </div>
//           </div>
//           <Footer />
//         </AddModalProvider>
//       </ModalContext.Provider>
//     </CardProvider>
//   );
// };

// export default Main;