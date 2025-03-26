"use client";
import * as React from "react";

const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="border rounded-lg shadow-sm p-4 bg-white">
      {children}
    </div>
  );
};

const CardContent = ({ children }: { children: React.ReactNode }) => {
  return <div className="p-4">{children}</div>;
};

export { Card, CardContent };