import Header from '@/components/shared/Header';
import { getUser } from '@/lib/getUser';

const authLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {children}
    </div>
  );
};

export default authLayout;
