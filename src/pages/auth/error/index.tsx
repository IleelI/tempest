import { useRouter } from "next/router";

function AuthError() {
  const { query } = useRouter();
  console.log(query);
  return <div>AuthError</div>;
}

export default AuthError;
