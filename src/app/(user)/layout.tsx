import React, { ReactNode } from "react";
import Sidebar from "@/components/common/layout/sidebar";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <aside className="fixed inset-y-0 left-0 hidden w-[250px] overflow-y-auto md:block lg:w-[275px]">
        <Sidebar />
      </aside>

      <main className="grow overflow-y-auto md:ml-[250px] lg:ml-[275px]">
        <div className="mx-auto max-w-2xl p-4">{children}</div>
      </main>

      <aside className="fixed inset-y-0 right-0 hidden w-1/4 overflow-y-auto lg:block">
        <div className="h-full bg-muted p-4">Aside Placeholder</div>
      </aside>

      {/* Mobile layout */}
      <div className="md:hidden">
        <div className="p-4">{children}</div>

        {/* Buttons at the bottom */}
        <div className="fixed inset-x-0 bottom-0 border-t bg-background p-4">
          <div className="flex justify-around">
            <button className="btn">Home</button>
            <button className="btn">Search</button>
            <button className="btn">Messages</button>
            <button className="btn">All</button>
          </div>
        </div>
      </div>
    </div>
  );
}
