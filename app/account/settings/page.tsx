export default function Page() {
  return (
    <>
      <h1 className="text-4xl font-semibold">Email preferences</h1>
      <label className="mt-8 block rounded-xl border p-4">
        <input type="checkbox" defaultChecked /> New designs and stitching
        inspiration
      </label>
      <label className="mt-3 block rounded-xl border p-4">
        <input type="checkbox" defaultChecked /> Order and file update
        notifications
      </label>
    </>
  );
}
