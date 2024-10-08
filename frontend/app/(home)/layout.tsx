import Footer from '@/components/shared/Footer';
import Header from '@/components/shared/Header';

const HomeLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default HomeLayout;
