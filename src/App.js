import React, { useState, useEffect } from 'react';
import TransactionList from './components/TransactionList';
import AddTransaction from './components/AddTransaction';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [message, setMessage] = useState('');
  const [currentTransaction, setCurrentTransaction] = useState(null); // État pour la transaction actuelle

  // Fonction pour ajouter une transaction
  const handleAddTransaction = async (newTransaction) => {
    try {
        const response = await axios.post('http://localhost:5000/transactions', newTransaction);
        // Met à jour l'état local avec la nouvelle transaction
        setTransactions((prevTransactions) => [...prevTransactions, response.data]);
        setMessage('Transaction ajoutée avec succès !');
    } catch (error) {
        console.error('Erreur lors de l\'ajout de la transaction:', error.response ? error.response.data : error.message);
        setMessage('Erreur lors de l\'ajout de la transaction.');
    }
};

  // Récupérer les transactions au démarrage
  const fetchTransactions = async () => {
    try {
      const response = await axios.get('http://localhost:5000/transactions');
      setTransactions(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des transactions:', error);
      setMessage('Erreur lors de la récupération des transactions');
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // Fonction pour supprimer une transaction
  const handleDeleteTransaction = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/transactions/${id}`);
      setTransactions(
        transactions.filter((transaction) => transaction._id !== id)
      );
      setMessage('Transaction supprimée avec succès !');
    } catch (error) {
      console.error('Erreur lors de la suppression de la transaction:', error);
      setMessage('Erreur lors de la suppression de la transaction.');
    }
  };

  // Fonction pour modifier une transaction
  const handleEditTransaction = (transaction) => {
    setCurrentTransaction(transaction);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Gestion de Budget Personnel</h1>
      {message && <div className="alert alert-info">{message}</div>}
      <AddTransaction
        onAdd={handleAddTransaction}
        currentTransaction={currentTransaction}
        setCurrentTransaction={setCurrentTransaction}
      />
      <TransactionList
        transactions={transactions}
        onEdit={handleEditTransaction}
        onDelete={handleDeleteTransaction}
      />
    </div>
  );
};

export default App;
