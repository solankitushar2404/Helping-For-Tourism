// src/components/ui/button.jsx
export const Button = ({ children, ...props }) => {
  return (
    <button className="bg-cyan-700 text-white px-4 py-2 rounded hover:bg-cyan-800 transition" {...props}>
      {children}
    </button>
  );
};
