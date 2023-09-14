import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';
// import UpdateProduit from './UpdateProduit';

function ListProduits(props) {
    const navigate = useNavigate();
    const [data, setData] = useState([]);

    useEffect(() => {
            axios.get('http://localhost:8080/produits')
            .then(response => {
                setData(response.data);
                // console.log("response.dataListProduits : "+JSON.stringify(response.data))
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const deleteproduit = (produitId) => {
        const PRODUIT_API_BASE_URL = "http://localhost:8080/produits/";
        axios.delete(PRODUIT_API_BASE_URL +  produitId);
        window.location.reload();
    };
    
    return (       
        <> 
            <div className='mt-5'>
            <h2 className='text-center mb-3'>Liste des produits</h2>
                <div className='container'>
                    <div className="row">
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Nom</th>
                                    <th>Prix</th>
                                    <th>Description</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.map(
                                        (produit, index) => 
                                        <tr key={index} className='m-3 w-25 mx-auto'>
                                            <td>{index+1}</td>
                                            <td>{produit.name}</td>
                                            <td>{produit.price}</td>
                                            <td>{produit.description}</td>
                                            <td>
                                                <button className="btn btn-success"  onClick={() => {navigate(`/produit/${produit._id}`)}} >Modifier </button>
                                                <button style={{ marginLeft: "10px" }} className="btn btn-danger" onClick={() => {deleteproduit(produit._id) }} >Supprimer </button>
                                            </td>
                                        </tr> 
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </>
    );
};

export default ListProduits;