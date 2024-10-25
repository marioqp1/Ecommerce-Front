import React, { useState, useEffect } from 'react';
import { getInventoryDrugsForBranch, createInventoryDrug, updateInventoryDrug, deleteInventoryDrug, getCompanyById, getBranchesByPharmacyId, getDrugs } from './Apis';
import './css/ManageInventoryDrugs.css'; // Import the CSS file

const ManageInventoryDrugs = () => {
  const [inventoryDrugs, setInventoryDrugs] = useState([]);
  const [company, setCompany] = useState({});
  const [branches, setBranches] = useState([]);
  const [drugs, setDrugs] = useState([]);
  const [selectedBranchId, setSelectedBranchId] = useState('');
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
    const fetchInventoryDrugs = async () => {
      if (selectedBranchId) {
        const response = await getInventoryDrugsForBranch(selectedBranchId);
        setInventoryDrugs(response.data.data); // Assuming your response structure
      }
    };
    fetchInventoryDrugs();
  }, [selectedBranchId]);

  useEffect(() => {
    const fetchDrugs = async () => {
      const response = await getDrugs();
      setDrugs(response.data.data); // Assuming your response structure
    };
    fetchDrugs();
  }, []);

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

  const handleUpdateInventoryDrug = async (id) => {
    try {
      const response = await updateInventoryDrug(id, { ...newInventoryDrug, branchId: selectedBranchId });
      console.log(response.data);
      setInventoryDrugs(inventoryDrugs.map(drug => (drug.id === id ? response.data.data : drug))); // Update state with updated inventory drug
    } catch (error) {
      console.error('Error updating inventory drug:', error);
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
        <label htmlFor="drugId">Drug:</label>
        <select name="drugId" onChange={handleChange} value={newInventoryDrug.drugId}>
          {drugs.map(drug => (
            <option key={drug.id} value={drug.id}>
              {drug.drugName}
            </option>
          ))}
        </select>
        <label htmlFor="price">Price:</label>
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={newInventoryDrug.price}
          onChange={handleChange}
        />
        <label htmlFor="stock">Stock:</label>
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={newInventoryDrug.stock}
          onChange={handleChange}
        />
        <button type="submit">Add Inventory Drug</button>
      </form>
      <h3>Inventory Drugs</h3>
      <table className="inventory-drug-table">
        <thead>
          <tr>
            <th>Drug Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {inventoryDrugs.map(drug => (
            <tr key={drug.id}>
              <td>{drug.drugName}</td>
              <td>{drug.price}</td>
              <td>{drug.stock}</td>
              <td>
                <button onClick={() => handleUpdateInventoryDrug(drug.id)}>Update</button>
                <button onClick={() => handleDeleteInventoryDrug(drug.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageInventoryDrugs;
