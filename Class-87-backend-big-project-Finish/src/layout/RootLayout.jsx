import { Outlet } from "react-router";

const RootLayout = () => {
  return (
    <>
      {/* Built-in React-Router File */}
      <Outlet />
    </>
  );
}
export default RootLayout;