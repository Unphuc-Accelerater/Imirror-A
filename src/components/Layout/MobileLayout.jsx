import React from 'react';
import { FooterNavBar } from '../FooterNavBar';

export const MobileLayout = ({ children, showFooter = true, className = "" }) => {
  return (
    <div className={`min-h-screen bg-gray-50 flex flex-col ${className}`}>
      {/* Status bar simulation */}
      <div className="h-11 bg-white flex items-center justify-between px-4 text-sm font-medium text-gray-900 safe-area-pt">
        <span>9:41</span>
        <div className="flex items-center space-x-1">
          <div className="w-4 h-2.5 bg-gray-900 rounded-sm" />
          <div className="w-4 h-3 border border-gray-900 rounded-sm">
            <div className="w-2.5 h-1.5 bg-gray-900 rounded-sm m-0.5" />
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className={`flex-1 ${showFooter ? 'pb-20' : ''}`}>
        {children}
      </div>
      
      {/* Footer navigation */}
      {showFooter && <FooterNavBar />}
    </div>
  );
};