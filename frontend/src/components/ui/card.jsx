// src/components/ui/card.jsx
export const Card = ({ children, className = '' }) => {
  return <div className={`bg-white rounded-xl shadow p-4 ${className}`}>{children}</div>;
};

export const CardContent = ({ children, className = '' }) => {
  return <div className={`mt-2 ${className}`}>{children}</div>;
};
