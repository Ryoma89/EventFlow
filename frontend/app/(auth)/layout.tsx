import Header from '@/components/shared/Header';
import { getUser } from '@/lib/getUser';

const authLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getUser();
  return (
    <div>
      <Header user={user}/>
      {children}
    </div>
  );
};

export default authLayout;
