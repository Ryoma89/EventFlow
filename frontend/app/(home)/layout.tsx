import Footer from '@/components/shared/Footer';
import Header from '@/components/shared/Header';
import { getUser } from '@/lib/getUser';

const HomeLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getUser();

  return (
    <div>
      <Header user={user} />
      {children}
      <Footer />
    </div>
  );
};

export default HomeLayout;
