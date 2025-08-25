import SideNavigation from "@/app/_components/SideNavigation";
export default function Layout({ children }) {
  return (
    <div className="grid grid-cols-[16rem_1fr] h-full gap-12">
      <SideNavigation />
      <div className="py-12 px-8">
        {" "}
        <main>{children}</main>
      </div>
    </div>
  );
}
