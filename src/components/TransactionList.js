import React from 'react';

const TransactionList = ({ transactions, onEdit, onDelete }) => {
    return (
        <div>
            <h2 className="mb-3">Transactions</h2>
            <ul className="list-group">
                {transactions.map(transaction => (
                    <li key={transaction._id} className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                            <strong>{transaction.description}</strong>: {transaction.amount} €
                            <span className="badge bg-secondary ms-2">{transaction.category}</span>
                        </div>
                        <div>
                            <button className="btn btn-warning btn-sm me-2" onClick={() => onEdit(transaction)}>Modifier</button>
                            <button className="btn btn-danger btn-sm" onClick={() => onDelete(transaction._id)}>Supprimer</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TransactionList;