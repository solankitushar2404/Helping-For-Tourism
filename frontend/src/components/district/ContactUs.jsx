import React, { useState } from 'react';
import { toast } from 'react-toastify';  // ✅ Import toast
import 'react-toastify/dist/ReactToastify.css';
import { AnimatePresence, motion } from 'framer-motion';
import axios from 'axios';

const ContactUs = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/contact", { name, email, message });

      if (response.status === 201) {
        setName('');
        setEmail('');
        setMessage('');
        setShowSuccessModal(true);
        toast.success('Message sent successfully! ✅'); // ✅ Show toast
      } else {
        toast.error('Oops! Something went wrong. Please try again later. ❌');
      }
    } catch (error) {
      console.error(error);
      toast.error('Oops! Something went wrong. Please try again later. ❌');
    }
  };

  return (
    <section className="contact-section py-16 px-8 bg-gray-100" id='contact'>
      <div className="container mx-auto flex flex-col md:flex-row space-y-8 md:space-y-0">
        {/* Left Section: Contact Info */}
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-4xl font-bold text-center text-emerald-950">Contact Us</h2>
          <div className="text-center md:text-left">
            <p className="text-lg">Feel free to reach out to us with any inquiries or feedback.</p>
            <div className="text-gray-700 mt-6">
              <p>Email: contact@tourism.com</p>
              <p>Phone: +91 123 456 7890</p>
              <p>Address: 123 Tourist Street, Gujarat, India</p>
            </div>
          </div>
        </div>

        {/* Right Section: Contact Form */}
        <div className="md:w-1/2 bg-white p-8 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-lg font-medium">Your Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md"
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-lg font-medium">Your Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-lg font-medium">Your Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md"
                rows="5"
                placeholder="Enter your message"
                required
              />
            </div>

            <button type="submit" className="w-full bg-cyan-950 text-white p-3 rounded-md hover:bg-heading ">
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Success Modal Popup */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white rounded-3xl p-8 max-w-md mx-auto text-center shadow-2xl relative"
            >
              <h2 className="text-2xl font-bold text-green-600 mb-4">Message Sent! ✅</h2>
              <p className="text-gray-700 mb-6">Thank you for reaching out! We will get back to you shortly.</p>
              <button
                onClick={() => setShowSuccessModal(false)}
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-xl transition"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ContactUs;