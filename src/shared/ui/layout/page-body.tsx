interface PageBodyProps {
  children: React.ReactNode;
}

export const PageBody = ({ children }: PageBodyProps) => {
  return <div className="w-full h-[calc(100%-40px)] p-2">{children}</div>;
};
