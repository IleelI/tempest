import type { NextPage } from "next";
import RegistrationForm from "components/user/registration/registration-form";
import LoginForm from "components/user/login/login-form";
import Divider from "components/common/divider/divider";

const UserPage: NextPage = function () {
  return (
    <div className="flex flex-col gap-16">
      <LoginForm />
      <Divider title="or" />
      <RegistrationForm />
    </div>
  );
};

export default UserPage;
