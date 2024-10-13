import React, { useState } from 'react';
import { Button } from './button';

interface DropdownProps {
  children: React.ReactNode;
}

export const Dropdown: React.FC<DropdownProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === DropdownTrigger) {
          return React.cloneElement(child as React.ReactElement<any>, {
            onClick: () => setIsOpen(!isOpen),
          });
        }
        return child;
      })}
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child) && child.type === DropdownMenu) {
              return child;
            }
          })}
        </div>
      )}
    </div>
  );
};

export const DropdownTrigger: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => (
  <div {...props}>{children}</div>
);

export const DropdownMenu: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="py-1">{children}</div>
);

export const DropdownItem: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, ...props }) => (
  <button
    className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
    {...props}
  >
    {children}
  </button>
);
