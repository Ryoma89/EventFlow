const authLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <main
      className="h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url("/signIn.jpeg")`,
        backgroundBlendMode: "lighten",
      }}
    >
      {children}
    </main>
  );
};

export default authLayout;
