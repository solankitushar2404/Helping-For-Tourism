import React, { createContext, useContext } from "react";
import { cn } from "../../lib/utils"; // Updated relative import

const TabsContext = createContext();

export const Tabs = ({ value, onValueChange, children, className = "" }) => {
  return (
    <TabsContext.Provider value={{ value, onValueChange }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
};

export const TabsList = ({ children, className = "" }) => {
  return <div className={cn("flex gap-2", className)}>{children}</div>;
};

export const TabsTrigger = ({ value, children, className = "" }) => {
  const { value: activeValue, onValueChange } = useContext(TabsContext);
  const isActive = activeValue === value;

  return (
    <button
      onClick={() => onValueChange(value)}
      className={cn(
        "px-4 py-2 rounded-full text-sm font-medium transition",
        isActive
          ? "bg-blue-600 text-white shadow"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200",
        className
      )}
    >
      {children}
    </button>
  );
};

export const TabsContent = ({ value, children, className = "" }) => {
  const { value: activeValue } = useContext(TabsContext);
  if (value !== activeValue) return null;
  return <div className={className}>{children}</div>;
};
