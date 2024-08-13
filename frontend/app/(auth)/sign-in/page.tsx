import dynamic from "next/dynamic";

const SignIn = dynamic(() => import("./_components/SignIn"), {
  ssr: false,
});

const SignInPage = () => {
  return (
    <section className="mx-auto w-4/5 flex flex-col justify-center items-center min-h-screen">
      <SignIn />
    </section>
  );
};

export default SignInPage;
