import Image from "next/image";
import LoginForm from "./components/Login/LoginForm";

export default function Home() {
  return (
    <main className="h-[100vh] flex justify-center items-center">
      <LoginForm></LoginForm>
    </main>
  );
}
