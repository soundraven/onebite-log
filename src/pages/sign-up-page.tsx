import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSignUp } from "@/hooks/mutations/auth/use-sign-up";
import { generateErrorMessage } from "@/lib/error";
import { useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: signUp, isPending: isSignUpPending } = useSignUp({
    onError: (error) => {
      const message = generateErrorMessage(error);

      toast.error(message, {
        position: "top-center",
      });
    },
  });

  const handleSignUp = () => {
    if (email.trim() === "" || password.trim() === "") return;

    signUp({
      email,
      password,
    });
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="text-xl font-bold">회원가입</div>
      <div className="flex flex-col gap-2">
        <Input
          className="py-6"
          onChange={(e) => setEmail(e.target.value)}
          disabled={isSignUpPending}
          type="email"
          placeholder="example@abc.com"
        ></Input>
        <Input
          className="py-6"
          onChange={(e) => setPassword(e.target.value)}
          disabled={isSignUpPending}
          type="password"
          placeholder="password"
        ></Input>
        <div>
          <Button
            disabled={isSignUpPending}
            onClick={handleSignUp}
            className="w-full"
          >
            회원가입
          </Button>
        </div>
        <div>
          <Link className="text-muted-foreground" to={"/sign-in"}>
            이미 계정이 있다면? 로그인
          </Link>
        </div>
      </div>
    </div>
  );
}
