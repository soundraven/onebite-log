import { Link, Outlet } from "react-router";
import logo from "@/assets/logo.png";
import { SunIcon } from "lucide-react";
import defaultAvatar from "@/assets/default-avatar.jpg";
import SessionProvider from "@/provider/session-provider";
import ModalProvider from "@/provider/modal-provider";
import ProfileButton from "@/components/layout/header/profile-button";

export default function GlobalLayout() {
  return (
    <SessionProvider>
      <ModalProvider>
        <div className="flex min-h-screen flex-col">
          <header className="h-15 border-b">
            <div className="m-auto flex h-full w-full max-w-175 justify-between px-4">
              <Link to={"/"} className="flex items-center gap-2">
                <img
                  className="h-5"
                  src={logo}
                  alt="한입 로그의 로고, 메세지 말풍선을 형상화한 모습"
                />
                <div className="font-bold">한입 로그</div>
              </Link>
              <div className="gat-5 flex items-center">
                <div className="hover:bg-muted cursor-pointer rounded-full p-2">
                  <SunIcon></SunIcon>
                </div>
                <ProfileButton></ProfileButton>
              </div>
            </div>
          </header>
          <main className="m-auto w-full max-w-175 flex-1 border-x px-4 py-6">
            <Outlet></Outlet>
          </main>
          <footer className="text-muted-foreground border-t py-10 text-center">
            @Soundraven
          </footer>
        </div>
      </ModalProvider>
    </SessionProvider>
  );
}
