import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";

const AddEditModal = ({ isOpen, onClose, title, children, onSubmit }) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-lg font-semibold">{title}</Dialog.Title>
            <button onClick={onClose}><X className="w-5 h-5 text-gray-500" /></button>
          </div>
          <form onSubmit={onSubmit} className="space-y-4">
            {children}
            <div className="flex justify-end gap-2">
              <button type="button" onClick={onClose} className="px-4 py-1 bg-gray-200 rounded-md">Cancel</button>
              <button type="submit" className="px-4 py-1 bg-blue-600 text-white rounded-md">Save</button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default AddEditModal;
