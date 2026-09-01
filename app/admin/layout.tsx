'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminHeader } from '@/components/admin/AdminHeader';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  // If on login page, render full screen without dashboard shell
  if (pathname === '/admin/login') {
    return <div className="min-h-screen bg-[#07120D] text-ivory">{children}</div>;
  }

  // Get current page title for the header
  let pageTitle = 'Dashboard';
  if (pathname === '/admin/products') pageTitle = 'Product Catalog';
  else if (pathname === '/admin/products/new') pageTitle = 'Add New Formulation';
  else if (pathname.startsWith('/admin/products/')) pageTitle = 'Edit Product';
  else if (pathname === '/admin/orders') pageTitle = 'Orders & Shipments';

  return (
    <div className="min-h-screen bg-[#07120D] text-ivory flex">
      {/* Sidebar */}
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        <AdminHeader
          title={pageTitle}
          onOpenSidebar={() => setSidebarOpen(true)}
        />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
