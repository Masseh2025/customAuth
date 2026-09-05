import getUser from "@/lib/auth";

export default function MainPage() {
  getUser();
  return <h1>Main page</h1>;
}
