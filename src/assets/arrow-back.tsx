import React from "react";

interface ArrowBackProps {
  onclose: () => void;
  className: string;
}

export function ArrowBack({ onclose, className }: ArrowBackProps) {
  return (
    <svg
      onClick={onclose}
      className = {className}
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 96 960 960"
      width="24"
    >
      <path
        d="M480 904.479 151.521 576 480 247.521l75.653 74.653-200.825 200.825h453.651v106.002H354.828l200.825 200.825L480 904.479Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}