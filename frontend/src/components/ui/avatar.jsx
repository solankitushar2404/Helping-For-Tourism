import React, { useState } from "react";
import { cn } from "../../lib/utils"; // Updated relative import

const Avatar = ({ src, alt = "Avatar", size = 40, fallback = "👤", className = "", ...props }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className={cn(
        "rounded-full bg-gray-100 border border-gray-300 flex items-center justify-center overflow-hidden",
        className
      )}
      style={{ width: size, height: size }}
      {...props}
    >
      {!imgError && src ? (
        <img
          src={src}
          alt={alt}
          className="object-cover w-full h-full"
          onError={() => setImgError(true)}
        />
      ) : (
        <span className="text-sm">{fallback}</span>
      )}
    </div>
  );
};

export default Avatar;