import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
// import TableEmployees from './TableEmployees';



function UpdateEmployee() {
    const navigate = useNavigate();

    const [show, setShow] = useState(true);
    const [persons, setPersons] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/employers')
            .then(response => {
                //Les données à ajouter dans Update
                setPersons(response.data);
                // console.log("response.data : " + JSON.stringify(response.data));
            })
            .catch(error => {
                console.error(error);
            });
    }, []);
    // const personId = parseInt(persons.id, 10);


    useEffect(() => {
        const filtered = persons.filter(personFilter => personFilter.id === 1);
        filtered.map( idFilter => idFilter.id)
        // console.log("filtered"+JSON.stringify(filtered))
        setFilteredData(filtered);
    }, [persons]);
    
    let updatedPersons = [];

    const handleNameChangeFirstName = (id, firstName) => {
        // Create a new array with the updated name
        updatedPersons = [...persons];
        updatedPersons[id].firstName = firstName;
        // Update the state with the new array
        setPersons(updatedPersons);

    };

    const handleNameChangeName = (id, name) => {
        const updatedPersons = [...persons];
        updatedPersons[id].name = name;
        setPersons(updatedPersons);
    };

    const handleNameChangeEmail = (id, email) => {
        updatedPersons = [...persons];
        updatedPersons[id].email = email;
        setPersons(updatedPersons);
    };

    const updateEmployee = (person,personId, index, event) => {
        console.log("personId : "+personId)

        console.log("index : " + index);
        
        event.preventDefault();
        const EMPLOYEE_API_BASE_URL = `http://localhost:8080/employer/${1}`;
        axios.put(EMPLOYEE_API_BASE_URL + index, person)
        .then(response => {
            // console.log("response.data : "+response.data); // Affiche la réponse du backend
        })
        .catch(error => {
            console.error(error);
        });

        handleClose();
        // console.log("Modifier")
        navigate('/employers');
        // window.location.reload();
    };

    const handleClose = () => {
        setShow(false);
        navigate('/employers');
    }

    const cancel = () => {
        handleClose();
        navigate('/employers');
    }

    return (
        <div className='container mt-5'>
            {
                filteredData.map(
                    (person, index) => (
                        <div key={index+1}>
                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Mise à jour de l'employé</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Prénom</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={person.firstName}
                                                onChange={(e) => handleNameChangeFirstName(index, e.target.value)}
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label >Nom</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={person.name}
                                                onChange={(e) => handleNameChangeName(index, e.target.value)}
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control
                                                type="email"
                                                value={person.email}
                                                onChange={(e) => handleNameChangeEmail(index, e.target.value)}
                                            />
                                        </Form.Group>
                                    </Form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="danger" onClick={cancel}>
                                        Annuler
                                    </Button>
                                    <Button variant="success" type="submit" onClick={(event) => updateEmployee(person, person.id, index, event)} >
                                        Enregistrer
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </div>
                    )
                )
            }
        </div>
    );
}

export default UpdateEmployee;