import Header from '@/components/shared/Header';

const authLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default authLayout;
