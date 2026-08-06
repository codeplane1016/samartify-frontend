import { Orders } from "@/components/account/AccountContent";
export default function Page() {
  return (
    <>
      <h1 className="text-4xl font-semibold">Orders</h1>
      <p className="mt-2 text-foreground-secondary">Your paid transaction history, receipts, licenses, and payment details.</p>
      <Orders />
    </>
  );
}
