import React from 'react';
import { FooterNavBar } from '../FooterNavBar';

export const MobileLayout = ({ children, showFooter = true, className = "" }) => {
  return (
    <div className={`min-h-screen bg-gray-50 flex flex-col ${className}`}>
      {/* Main content */}
      <div className={`flex-1 ${showFooter ? 'pb-20' : ''}`}>
        {children}
      </div>
      
      {/* Footer navigation */}
      {showFooter && <FooterNavBar />}
    </div>
  );
};