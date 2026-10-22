import { AuthPage } from "@/components/AuthPage";

export const metadata = {
  title: "Cadastrar-se | Bia Fashion Kids",
  description: "Crie sua conta Bia Fashion Kids.",
};

export default function CadastrarSePage() {
  return <AuthPage mode="signup" />;
}
