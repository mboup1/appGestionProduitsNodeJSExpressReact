import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import {useNavigate, useParams } from 'react-router-dom';

function UpdateProduit(props) {
  const navigate = useNavigate();
  const { id } = useParams();

  const [show, setShow] = useState(true);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');  


  useEffect(() => {
    // Fetch the existing product data from the API
    const PRODUIT_API_BASE_URL = `http://localhost:8080/produits/${id}`;
    axios.get(PRODUIT_API_BASE_URL)
      .then(response => {
        const productData = response.data;
        setName(productData.name);
        setPrice(productData.price);
        setDescription(productData.description);
      })
      .catch(error => {
        console.error(error);
      });
  }, [id]);

  const updateProduit = (e) => {
    e.preventDefault();
    console.log("Sauvegarder modification")

    let updatedData = { price: price, name: name, description: description };
    console.log("updatedData : "+JSON.stringify(updatedData))
    const PRODUIT_API_BASE_URL = `http://localhost:8080/produits/${id}`;
    axios.put(PRODUIT_API_BASE_URL, updatedData)
      .then(response => {
        // console.log(response.data); // Affiche la réponse du backend
      })
      .catch(error => {
        console.error(error);
      });

    handleClose();
    navigate('/produits');
    // window.location.reload();
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      updateProduit(event);
    }
  };

  const handleClose = () => {
    setShow(false);
    navigate('/produits');
  };

  return (
    <div className='container mt-5'>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier le produit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nom produit</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Prix</Form.Label>
              <Form.Control
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                onKeyDown={handleKeyDown} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
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
          <Button variant="success" type="submit" onClick={updateProduit}>
            Enregistrer
          </Button>
        </Modal.Footer>
      </Modal>               
    </div>
  );
}

export default UpdateProduit;

