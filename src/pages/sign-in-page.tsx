import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSignInWithPassword } from "@/hooks/mutations/auth/use-sign-in-with-password";
import { useState } from "react";
import { Link } from "react-router";

import gitHubLogo from "@/assets/github-mark.svg";
import { useSignInWithOAuth } from "@/hooks/mutations/auth/use-sign-in-with-oauth";
import { toast } from "sonner";
import { generateErrorMessage } from "@/lib/error";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: signInWithPassword, isPending: isSignInWithPasswordPending } =
    useSignInWithPassword({
      onError: (error) => {
        const message = generateErrorMessage(error);

        toast.error(message, {
          position: "top-center",
        });

        setPassword("");
      },
    });

  const { mutate: signInWithOAuth, isPending: isSignInWithOAuthPending } =
    useSignInWithOAuth({
      onError: (error) => {
        const message = generateErrorMessage(error);

        toast.error(message, {
          position: "top-center",
        });
      },
    });

  const handleSignInWithPassword = () => {
    if (email.trim() === "" || password.trim() === "") return;

    signInWithPassword({
      email,
      password,
    });
  };

  const handleSignInWithOAuth = () => {
    signInWithOAuth("github");
  };

  const isPending = isSignInWithPasswordPending || isSignInWithOAuthPending;

  return (
    <div className="flex flex-col gap-8">
      <div className="text-xl font-bold">로그인</div>
      <div className="flex flex-col gap-2">
        <Input
          className="py-6"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isPending}
          type="email"
          placeholder="example@abc.com"
        ></Input>
        <Input
          className="py-6"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isPending}
          type="password"
          placeholder="password"
        ></Input>
        <div className="mb-4 flex flex-col gap-2">
          <Button
            disabled={isPending}
            onClick={handleSignInWithPassword}
            className="w-full"
          >
            로그인
          </Button>
          <Button
            className="w-full"
            variant={"outline"}
            onClick={handleSignInWithOAuth}
          >
            <img src={gitHubLogo} className="h-4 w-4"></img>Github로 로그인
          </Button>
        </div>
        <div className="flex flex-col gap-2">
          <Link className="text-muted-foreground" to={"/sign-up"}>
            계정이 없으시다면? 회원가입
          </Link>
          <Link className="text-muted-foreground" to={"/forget-password"}>
            비밀번호를 잊으셨나요?
          </Link>
        </div>
      </div>
    </div>
  );
}
