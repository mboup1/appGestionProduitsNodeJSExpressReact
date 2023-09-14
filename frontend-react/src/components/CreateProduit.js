import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom'



function CreateProduit() {
  const navigate = useNavigate();

  const [show, setShow] = useState(true);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const saveProduit = (e) => {
    e.preventDefault();
    
    let dataProduit = { price: price, name: name, description: description };
    // console.log('produit => ' + JSON.stringify(dataProduit));

    // Traiter les données du formulaire ici, par exemple les envoyer à une API
    const PRODUIT_API_BASE_URL = "http://localhost:8080/produits";
    axios.post(PRODUIT_API_BASE_URL , dataProduit)
      .then(response => {
        console.log(response.data); // Affiche la réponse du backend

      })
      .catch(error => {
        console.error(error);
      });

    // Réinitialiser les champs du formulaire
    setName('');
    setPrice('');
    setDescription('');
    handleClose();
    navigate('/produits');
    window.location.reload();
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Empêche le comportement par défaut de la touche "Entrée"
      saveProduit(event);
    }
  };


const handleClose = () => {
    setShow(false);
    navigate('/produits');
};

//   const handleShow = () => setShow(true);

  return (
    <div className='container mt-5'>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title >Ajouter un employé</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nom produit</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                // autoFocus="true"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label >Prix</Form.Label>
              <Form.Control
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                onKeyDown={handleKeyDown} 
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Annuler
          </Button>
          <Button variant="success" type="submit" onClick={saveProduit}>
            Enregistrer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CreateProduit;