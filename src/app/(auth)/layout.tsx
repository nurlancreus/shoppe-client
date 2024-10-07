import Header from "./_components/layout/header";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mx-auto w-6/12">
      <Header/>
      <div>{children}</div>
    </div>
  );
}
