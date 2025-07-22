import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Pencil, Trash2 } from 'lucide-react';
import DistrictFormModal from './DistrictFormModal';
import toast from 'react-hot-toast';

const DistrictsPanel = () => {
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editDistrict, setEditDistrict] = useState(null);

  const fetchDistricts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('http://localhost:5000/api/admin/districts');
      setDistricts(data);
    } catch (err) {
      toast.error('Failed to fetch districts');
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this district?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/admin/districts/${id}`);
      toast.success('District deleted');
      fetchDistricts();
    } catch (err) {
      toast.error('Delete failed');
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDistricts();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-semibold">Use this section to maintain your district database.</h3>
        <Button onClick={() => { setEditDistrict(null); setModalOpen(true); }}>+ New District</Button>
      </div>

      {loading ? (
        <p>Loading districts...</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {districts.map((d) => (
            <Card key={d._id} className="relative">
              <CardContent className="p-4">
                <img
                  src={d.hero?.image || '/placeholder.jpg'}
                  alt={d.hero?.name || d.name}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="text-lg font-bold mb-1">{d.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">State: {d.state}</p>
                <p className="text-sm text-gray-700">
                  {d.hero?.description?.slice(0, 100)}...
                </p>

                <div className="flex gap-3 mt-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setEditDistrict(d);
                      setModalOpen(true);
                    }}
                  >
                    <Pencil size={16} /> Edit
                  </Button>
                  <Button variant="destructive" onClick={() => handleDelete(d._id)}>
                    <Trash2 size={16} /> Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {modalOpen && (
        <DistrictFormModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSuccess={() => {
            setModalOpen(false);
            fetchDistricts();
          }}
          district={editDistrict}
        />
      )}
    </div>
  );
};

export default DistrictsPanel;