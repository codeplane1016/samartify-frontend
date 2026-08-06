import { DownloadList } from "@/components/account/AccountContent";
export default function Page() {
  return (
    <>
      <h1 className="text-4xl font-semibold">My downloads</h1>
      <p className="mt-2 text-stone-500">
        Purchased, free, and redeemed reward designs stay available here.
      </p>
      <DownloadList />
    </>
  );
}
