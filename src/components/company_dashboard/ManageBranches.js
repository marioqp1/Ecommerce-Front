import React, { useState, useEffect } from 'react';
import { getCompanyById, getBranchesByPharmacyId, createBranch, deleteBranch } from './Apis';
import './css/ManageBranches.css'; // Import the CSS file for styling

const ManageBranches = () => {
  const [branches, setBranches] = useState([]);
  const [company, setCompany] = useState({});
  const [newBranch, setNewBranch] = useState({
    branchName: '',
    address: '',
    city: '',
    branchState: true,
    zip: '',
    phone: '',
    email: '',
    lat: 0,
    lng: 0,
    companyId: '' // We will remove this field
  });

  useEffect(() => {
    const fetchCompanyData = async () => {
      const companyResponse = await getCompanyById();
      setCompany(companyResponse.data.data);
      const companyId = companyResponse.data.data.companyId;

      const branchesResponse = await getBranchesByPharmacyId(companyId);
      setBranches(branchesResponse.data.data); // Assuming your response structure
    };
    fetchCompanyData();
  }, []);

  const handleAddBranch = async (e) => {
    e.preventDefault();
    try {
      const response = await createBranch(newBranch, company.companyId); // Use the fetched company ID
      console.log(response.data);
      setBranches([...branches, response.data.data]); // Update state with new branch
      setNewBranch({
        branchName: '',
        address: '',
        city: '',
        branchState: true,
        zip: '',
        phone: '',
        email: '',
        lat: 0,
        lng: 0
      });
    } catch (error) {
      console.error('Error adding branch:', error);
    }
  };

  const handleDeleteBranch = async (id) => {
    try {
      await deleteBranch(id);
      setBranches(branches.filter(branch => branch.branchId !== id)); // Remove deleted branch from state
    } catch (error) {
      console.error('Error deleting branch:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBranch({ ...newBranch, [name]: value });
  };

  return (
    <div className="manage-branches">
      <div className="company-info">
        {company.logoUrl && <img src={company.logoUrl} alt={company.name} className="company-logo" />}
        <h2>{company.name}</h2>
      </div>
      <h2>Manage Branches</h2>
      <h3>Add New Branch</h3>
      <form onSubmit={handleAddBranch} className="branch-form">
        <input
          type="text"
          name="branchName"
          placeholder="Branch Name"
          value={newBranch.branchName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={newBranch.address}
          onChange={handleChange}
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={newBranch.city}
          onChange={handleChange}
        />
        <input
          type="text"
          name="zip"
          placeholder="ZIP Code"
          value={newBranch.zip}
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={newBranch.phone}
          onChange={handleChange}
        />
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={newBranch.email}
          onChange={handleChange}
        />
        <input
          type="number"
          name="lat"
          placeholder="Latitude"
          value={newBranch.lat}
          onChange={handleChange}
        />
        <input
          type="number"
          name="lng"
          placeholder="Longitude"
          value={newBranch.lng}
          onChange={handleChange}
        />
        <button type="submit">Add Branch</button>
      </form>
      <ul className="branch-list">
        {branches.map(branch => (
          <li key={branch.branchId} className="branch-item">
            <h3>{branch.branchName}</h3>
            <p>{branch.address}, {branch.city}</p>
            <p>{branch.phone} | {branch.email}</p>
            <button onClick={() => handleDeleteBranch(branch.branchId)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageBranches;
