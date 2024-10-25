import React, { useState, useEffect } from 'react';
import { getInventoryDrugsForBranch, createInventoryDrug, deleteInventoryDrug, getCompanyById, getBranchesByPharmacyId, getDrugs } from './Apis';
import './css/ManageInventoryDrugs.css'; // Import the CSS file

const ManageInventoryDrugs = () => {
  const [inventoryDrugs, setInventoryDrugs] = useState([]);
  const [company, setCompany] = useState({});
  const [branches, setBranches] = useState([]);
  const [selectedBranchId, setSelectedBranchId] = useState('');
  const [drugs, setDrugs] = useState([]);
  const [newInventoryDrug, setNewInventoryDrug] = useState({
    drugId: '',
    price: 0,
    stock: 0,
    branchId: ''
  });

  useEffect(() => {
    const fetchCompanyData = async () => {
      const companyResponse = await getCompanyById();
      setCompany(companyResponse.data.data);
      const companyId = companyResponse.data.data.companyId;

      const branchesResponse = await getBranchesByPharmacyId(companyId);
      setBranches(branchesResponse.data.data); // Assuming your response structure
      if (branchesResponse.data.data.length > 0) {
        setSelectedBranchId(branchesResponse.data.data[0].branchId); // Default to the first branch
      }
    };
    fetchCompanyData();
  }, []);

  useEffect(() => {
    const fetchDrugs = async () => {
      const response = await getDrugs();
      setDrugs(response.data.data); // Assuming your response structure
    };
    fetchDrugs();
  }, []);

  useEffect(() => {
    const fetchInventoryDrugs = async () => {
      if (selectedBranchId) {
        const response = await getInventoryDrugsForBranch(selectedBranchId);
        setInventoryDrugs(response.data.data); // Assuming your response structure
      }
    };
    fetchInventoryDrugs();
  }, [selectedBranchId]);

  const handleAddInventoryDrug = async (e) => {
    e.preventDefault();
    try {
      const response = await createInventoryDrug({ ...newInventoryDrug, branchId: selectedBranchId });
      console.log(response.data);
      setInventoryDrugs([...inventoryDrugs, response.data.data]); // Update state with new inventory drug
      setNewInventoryDrug({
        drugId: '',
        price: 0,
        stock: 0
      });
    } catch (error) {
      console.error('Error adding inventory drug:', error);
    }
  };

  const handleDeleteInventoryDrug = async (id) => {
    try {
      await deleteInventoryDrug(id);
      setInventoryDrugs(inventoryDrugs.filter(drug => drug.id !== id)); // Remove deleted inventory drug from state
    } catch (error) {
      console.error('Error deleting inventory drug:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewInventoryDrug({ ...newInventoryDrug, [name]: value });
  };

  return (
    <div className="manage-inventory-drugs">
      <div className="company-info">
        {company.logoUrl && <img src={company.logoUrl} alt={company.name} className="company-logo" />}
        <h2>{company.name}</h2>
      </div>
      <h2>Manage Inventory Drugs</h2>
      <div>
        <label>Select Branch: </label>
        <select onChange={(e) => setSelectedBranchId(e.target.value)} value={selectedBranchId}>
          {branches.map(branch => (
            <option key={branch.branchId} value={branch.branchId}>
              {branch.branchName}
            </option>
          ))}
        </select>
      </div>
      <h3>Add New Inventory Drug</h3>
      <form onSubmit={handleAddInventoryDrug} className="inventory-drug-form">
        <label>Select Drug: </label>
        <select name="drugId" value={newInventoryDrug.drugId} onChange={handleChange}>
          <option value="">Select Drug</option>
          {drugs.map(drug => (
            <option key={drug.id} value={drug.id}>
              {drug.drugName}
            </option>
          ))}
        </select>
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={newInventoryDrug.price}
          onChange={handleChange}
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={newInventoryDrug.stock}
          onChange={handleChange}
        />
        <button type="submit">Add Inventory Drug</button>
      </form>
      <ul className="inventory-drug-list">
        {inventoryDrugs.map(drug => (
          <li key={drug.id} className="inventory-drug-item">
            <h3>{drug.drugName}</h3>
            <p>Price: {drug.price}</p>
            <p>Stock: {drug.stock}</p>
            <button onClick={() => handleDeleteInventoryDrug(drug.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageInventoryDrugs;
