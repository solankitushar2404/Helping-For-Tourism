// DistrictsPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import DistrictsPanel from '../../components/admin/DistrictsPanel';
import DistrictFormModal from '../../components/admin/DistrictFormModal';

const DistrictsPage = () => {
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [showFormModal, setShowFormModal] = useState(false);

  const fetchDistricts = async () => {
    try {
      const { data } = await axios.get('/api/admin/districts');
      setDistricts(data);
    } catch (err) {
      toast.error('Failed to load districts');
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDistricts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this district?')) return;
    try {
      await axios.delete(`/api/admin/districts/${id}`);
      toast.success('District deleted');
      fetchDistricts();
    } catch (err) {
      toast.error('Failed to delete');
      console.log(err);
    }
  };

  const handleEdit = (district) => {
    setSelectedDistrict(district);
    setShowFormModal(true);
  };

  const handleCreate = () => {
    setSelectedDistrict(null);
    setShowFormModal(true);
  };

  const handleFormSubmit = () => {
    setShowFormModal(false);
    fetchDistricts();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Districts Management</h2>
      </div>
      <DistrictsPanel
        districts={districts}
        onDelete={handleDelete}
        onEdit={handleEdit}
        loading={loading}
      />
      {showFormModal && (
        <DistrictFormModal
          district={selectedDistrict}
          onClose={() => setShowFormModal(false)}
          onSubmit={handleFormSubmit}
        />
      )}
    </div>
  );
};

export default DistrictsPage;
