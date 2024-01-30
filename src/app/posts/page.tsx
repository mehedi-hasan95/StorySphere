import { CurrentUser } from "@/lib/current-user";
import { redirect } from "next/navigation";

const PostPage = async () => {
  const currentUser = await CurrentUser();
  if (!currentUser || currentUser) {
    redirect("/");
  }
  return <div></div>;
};

export default PostPage;
