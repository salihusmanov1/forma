const TemplateDefaultImage = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 300 200"
      className="w-full h-32 rounded-t-lg"
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width="300" height="200" fill="#f3f4f6" />
      <rect
        x="100"
        y="50"
        width="100"
        height="120"
        fill="#ffffff"
        stroke="#d1d5db"
        strokeWidth="4"
      />
      <rect x="115" y="70" width="70" height="8" rx="2" fill="#d1d5db" />
      <rect x="115" y="90" width="50" height="8" rx="2" fill="#d1d5db" />
      <rect x="115" y="110" width="60" height="8" rx="2" fill="#d1d5db" />
      <rect x="115" y="130" width="40" height="8" rx="2" fill="#d1d5db" />
      <path d="M180 50 L200 70 L200 50 Z" fill="#e5e7eb" />
    </svg>
  );
};

export default TemplateDefaultImage;
