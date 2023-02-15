import Button from "components/common/button/button";
import useLogout from "hooks/useLogout/useLogout";
import { LogOut, Trash } from "react-feather";

export default function ProfileActions() {
  const logout = useLogout();

  return (
    <section className="flex flex-col gap-4">
      <Button
        label="Log out"
        icon={<LogOut />}
        className="!justify-start"
        onClick={logout}
      />
      <Button
        label="Delete account"
        icon={<Trash />}
        className="!justify-start bg-red-800 hover:bg-red-700 dark:bg-red-300 hover:dark:bg-red-400"
      />
    </section>
  );
}
