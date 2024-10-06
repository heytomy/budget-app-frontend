import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddTransaction = ({ onAdd, currentTransaction, setCurrentTransaction }) => {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [error, setError] = useState('');

    const categories = [
        'Alimentation',
        'Transports',
        'Loisirs',
        'Factures',
        'Autres',
    ];

    useEffect(() => {
        if (currentTransaction) {
            setDescription(currentTransaction.description);
            setAmount(currentTransaction.amount);
            setCategory(currentTransaction.category);
        } else {
            setDescription('');
            setAmount('');
            setCategory('');
        }
    }, [currentTransaction]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation simple
        if (!description || amount <= 0 || !category) {
            setError('Veuillez entrer une description, un montant valide et une catégorie.');
            return;
        }

        const newTransaction = { description, amount: Number(amount), category };

        try {
            if (currentTransaction) {
                // Mise à jour d'une transaction existante
                const response = await axios.put(`http://localhost:5000/transactions/${currentTransaction._id}`, newTransaction);
                onAdd(response.data); // Met à jour la liste des transactions
                setCurrentTransaction(null); // Réinitialiser
            } else {
                // Ajout d'une nouvelle transaction
                const response = await axios.post('http://localhost:5000/transactions', newTransaction);
                onAdd(response.data);
            }

            // Réinitialiser les champs
            setDescription('');
            setAmount('');
            setCategory('');
            setError('');
        } catch (err) {
            console.error('Erreur lors de l\'ajout ou de la mise à jour de la transaction:', err);
            setError('Erreur lors de l\'ajout ou de la mise à jour de la transaction.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>
            <div className="mb-3">
                <input
                    type="number"
                    className="form-control"
                    placeholder="Montant"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                />
            </div>
            <div className="mb-3">
                <select
                    className="form-control"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                >
                    <option value="" disabled>
                        Sélectionner une catégorie
                    </option>
                    {categories.map((cat, index) => (
                        <option key={index} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>
            </div>
            <button type="submit" className="btn btn-primary">
                {currentTransaction ? 'Modifier Transaction' : 'Ajouter Transaction'}
            </button>
        </form>
    );
};

export default AddTransaction;