import dynamic from "next/dynamic";

const SignUp = dynamic(() => import("./_components/SignUp"), {
  ssr: false,
});

const SignUpPage = () => {
  return (
    <section className="mx-auto w-4/5 flex flex-col justify-center items-center min-h-screen">
      <SignUp />
    </section>
  );
};

export default SignUpPage;
