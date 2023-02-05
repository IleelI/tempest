import Button from "components/common/button/button";
import type { NextPage } from "next";

const LogoutPage: NextPage = () => {
  return (
    <div>
      <h1>Log out</h1>
      <Button label="Logout" />
    </div>
  );
};

export default LogoutPage;
