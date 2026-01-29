const CheckIcon = ({ className }: { className?: string }) => (
  <svg 
    width="18" 
    height="18" 
    viewBox="0 0 18 18" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path 
      d="M0 9C0 4.02944 4.02944 0 9 0C13.9706 0 18 4.02944 18 9C18 13.9706 13.9706 18 9 18C4.02944 18 0 13.9706 0 9Z" 
      fill="#00A5FE"
    />
    <path 
      d="M13 7L7.5 12L5 9.72727" 
      stroke="white" 
      strokeWidth="1.33333" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

export default CheckIcon;
