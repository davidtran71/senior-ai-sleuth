interface NavigationArrowProps {
  direction?: 'left' | 'right';
  className?: string;
}

export const NavigationArrow = ({ direction = 'left', className = '' }: NavigationArrowProps) => {
  return (
    <svg 
      width="40" 
      height="24" 
      viewBox="0 0 40 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`${direction === 'right' ? 'rotate-180' : ''} ${className}`}
    >
      <g clipPath="url(#clip0_124_166)">
        <path 
          fillRule="evenodd" 
          clipRule="evenodd" 
          d="M4 12C4 11.4477 4.44772 11 5 11H35C35.5523 11 36 11.4477 36 12C36 12.5523 35.5523 13 35 13H5C4.44772 13 4 12.5523 4 12Z" 
          fill="currentColor"
        />
        <path 
          fillRule="evenodd" 
          clipRule="evenodd" 
          d="M12.7071 4.29289C13.0976 4.68342 13.0976 5.31658 12.7071 5.70711L6.41421 12L12.7071 18.2929C13.0976 18.6834 13.0976 19.3166 12.7071 19.7071C12.3166 20.0976 11.6834 20.0976 11.2929 19.7071L4.29289 12.7071C3.90237 12.3166 3.90237 11.6834 4.29289 11.2929L11.2929 4.29289C11.6834 3.90237 12.3166 3.90237 12.7071 4.29289Z" 
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_124_166">
          <rect width="40" height="24" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  );
};
