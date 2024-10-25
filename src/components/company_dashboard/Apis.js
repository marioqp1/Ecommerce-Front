import axios from 'axios';

export const BASE_URL = 'https://grad-ecommerce-production.up.railway.app';

// Endpoints for different entities
export const BRANCHES_URL = `${BASE_URL}/api/branches`;
export const INVENTORY_DRUGS_URL = `${BASE_URL}/api/inventory-drugs`;
export const COMPANY_URL = `${BASE_URL}/api/company`;
export const DRUGS_URL = `${BASE_URL}/api/drugs`;
///'http://localhost:8080/api/company/get'
const getAuthHeaders = () => {
  const token = localStorage.getItem('token'); // Ensure token is fetched from local storage
  const headers = { headers: { token } }; // Use the key 'token' as the header name
  console.log('Headers:', headers); // Log headers to verify the token
  return headers;
};

// Branches
export const getBranches = () => axios.get(BRANCHES_URL, getAuthHeaders());
export const getBranchById = (id) => axios.get(`${BRANCHES_URL}/${id}`, getAuthHeaders());
export const createBranch = (data, companyId) => axios.post(`${BRANCHES_URL}?companyId=${companyId}`, data, getAuthHeaders());
export const updateBranch = (id, data) => axios.put(`${BRANCHES_URL}/${id}`, data, getAuthHeaders());
export const deleteBranch = (id) => axios.delete(`${BRANCHES_URL}/${id}`, getAuthHeaders());
export const getBranchesByPharmacyId = (pharmacyId) => axios.get(`${BRANCHES_URL}/branches/pharmacy/${pharmacyId}`, getAuthHeaders());

// Inventory Drugs
export const getInventoryDrugsForBranch = (branchId) => axios.get(`${INVENTORY_DRUGS_URL}/branch/${branchId}`, getAuthHeaders());
export const createInventoryDrug = (data) => axios.post(`${INVENTORY_DRUGS_URL}/save`, data, getAuthHeaders());
export const updateInventoryDrug = (id, data) => axios.put(`${INVENTORY_DRUGS_URL}/update/${id}`, data, getAuthHeaders());
export const deleteInventoryDrug = (id) => axios.delete(`${INVENTORY_DRUGS_URL}/delete/${id}`, getAuthHeaders());
export const getInventoryDrugById = (id) => axios.get(`${INVENTORY_DRUGS_URL}/${id}`, getAuthHeaders());

// Company
export const getCompanyById = () => axios.get(`${COMPANY_URL}/get/id`, getAuthHeaders());

//Drugs
export const getDrugs = () => axios.get(DRUGS_URL);