import Button from "components/common/button/button";
import { LogOut, Trash } from "react-feather";
import { handleDeleteAccount, handleLogout } from "services/user/utils";

export default function ProfileActions() {
  return (
    <section className="flex flex-col gap-4">
      <Button
        label="Log out"
        icon={<LogOut />}
        className="!justify-start"
        onClick={handleLogout}
      />
      <Button
        label="Delete account"
        icon={<Trash />}
        className="!justify-start bg-red-800 hover:bg-red-700 dark:bg-red-300 hover:dark:bg-red-400"
        onClick={handleDeleteAccount}
      />
    </section>
  );
}
