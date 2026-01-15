import logo from "@/assets/logo.png";

export default function GlobalLoader() {
  return (
    <div className="bg-muted flex h-screen w-screen flex-col items-center justify-center">
      <div className="mb-15 flex animate-bounce items-center gap-4">
        <img className="w-10" src={logo} alt="한입 로그 로고 아이콘" />
        <div className="text-2xl font-bold">한입 로그</div>
      </div>
    </div>
  );
}
