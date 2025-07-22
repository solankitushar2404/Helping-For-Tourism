// components/admin/HotelsPanel.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Pencil, Trash2 } from 'lucide-react';
import HotelFormModal from './HotelFormModal';
import toast from 'react-hot-toast';

const HotelsPanel = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editHotel, setEditHotel] = useState(null);

  const fetchHotels = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('http://localhost:5000/api/admin/hotels');
    //   console.log(data[0]);
      setHotels(data);
    } catch (err) {
      toast.error('Failed to fetch hotels');
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this hotel?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/admin/hotels/${id}`);
      toast.success('Hotel deleted');
      fetchHotels();
    } catch (err) {
      toast.error('Delete failed');
      console.log(err);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-semibold">Use this section to maintain your hotel database.</h3>
        <Button onClick={() => { setEditHotel(null); setModalOpen(true); }}>+ New Hotel</Button>
      </div>

      {loading ? (
        <p>Loading hotels...</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {hotels.map((h) => (
            <Card key={h._id} className="relative">
              <CardContent className="p-4">
                <img
                  src={h.image || '/placeholder.jpg'}
                  alt={h.name}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="text-lg font-bold mb-1">{h.name}</h3>
                <p className="text-sm text-muted-foreground mb-1">Type : {h.category}</p>
                <p className="text-sm text-muted-foreground mb-1">Price : ₹{h.price_per_night}</p>
                <p className="text-sm text-muted-foreground mb-1">Rating : {h.rating}</p>
                <p className="text-sm text-gray-700">{h.address?.slice(0, 100)}.</p>

                <div className="flex gap-3 mt-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setEditHotel(h);
                      setModalOpen(true);
                    }}
                  >
                    <Pencil size={16} /> Edit
                  </Button>
                  <Button variant="destructive" onClick={() => handleDelete(h._id)}>
                    <Trash2 size={16} /> Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {modalOpen && (
        <HotelFormModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSuccess={() => {
            setModalOpen(false);
            fetchHotels();
          }}
          hotel={editHotel}
        />
      )}
    </div>
  );
};

export default HotelsPanel;
