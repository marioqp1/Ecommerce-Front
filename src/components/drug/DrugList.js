import React, { useEffect, useState } from 'react';
import { getAllDrugs, deleteDrug } from '../../services/DrugService';
import UpdateDrug from './UpdateDrug';

const DrugList = () => {
  const [drugs, setDrugs] = useState([]);
  const [token, setToken] = useState(''); // This should come from authentication
  const [selectedDrug, setSelectedDrug] = useState(null);

  useEffect(() => {
    fetchAllDrugs();
  }, []);

  const fetchAllDrugs = async () => {
    try {
      const response = await getAllDrugs();
      setDrugs(response.data);
    } catch (error) {
      console.error('Error fetching drugs:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDrug(id, token);
      setDrugs(drugs.filter((drug) => drug.id !== id));
      alert('Drug deleted successfully');
    } catch (error) {
      console.error('Error deleting drug:', error);
      alert('Failed to delete drug');
    }
  };

  return (
    <div>
      <h2>Drug List</h2>
      {selectedDrug && <UpdateDrug drug={selectedDrug} token={token} />}
      <ul>
        {drugs.map((drug) => (
          <li key={drug.id}>
            {drug.drugName}
            <button onClick={() => setSelectedDrug(drug)}>Edit</button>
            <button onClick={() => handleDelete(drug.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DrugList;
