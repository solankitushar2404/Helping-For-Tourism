import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Pencil, Trash2 } from 'lucide-react';
import PlaceFormModal from './PlaceFormModal';
import toast from 'react-hot-toast';

const PlacesPanel = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editPlace, setEditPlace] = useState(null);

  const fetchPlaces = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const { data } = await axios.get('http://localhost:5000/api/admin/places');
      setPlaces(data);
    } catch (err) {
      toast.error('Failed to fetch places');
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this place?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/admin/places/${id}`);
      toast.success('Place deleted');
      fetchPlaces();
    } catch (err) { 
      toast.error('Delete failed');
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPlaces();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-semibold">Use this section to maintain your place database.</h3>
        <Button onClick={() => { setEditPlace(null); setModalOpen(true); }}>+ New Place</Button>
      </div>

      {loading ? (
        <p>Loading places...</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {places.map((p) => (
            <Card key={p._id} className="relative">
              <CardContent className="p-4">
                <img
                  src={p.image || '/placeholder.jpg'}
                  alt={p.name}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="text-lg font-bold mb-1">{p.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">   District_Id : {p.district || 'Unknown'}</p>
                <p className="text-sm text-gray-700">
                  {p.description?.slice(0, 100)}...
                </p>

                <div className="flex gap-3 mt-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setEditPlace(p);
                      setModalOpen(true);
                    }}
                  >
                    <Pencil size={16} /> Edit
                  </Button>
                  <Button variant="destructive" onClick={() => handleDelete(p._id)}>
                    <Trash2 size={16} /> Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {modalOpen && (
        <PlaceFormModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSuccess={() => {
            setModalOpen(false);
            fetchPlaces();
          }}
          place={editPlace}
        />
      )}
    </div>
  );
};

export default PlacesPanel;
