"use client";
import style from "./styles.module.scss";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={style.layoutDashboard}>{children}</body>
    </html>
  );
}
