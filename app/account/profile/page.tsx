export default function Page() {
  return (
    <>
      <h1 className="text-4xl font-semibold">Profile</h1>
      <form className="mt-8 grid max-w-xl gap-4 sm:grid-cols-2">
        {["First name", "Last name", "Email", "Phone", "Country"].map((x) => (
          <label key={x}>
            {x}
            <input
              defaultValue={x === "First name" ? "Maker" : ""}
              className="mt-1 w-full rounded-xl border p-3"
            />
          </label>
        ))}
        <button className="rounded-full bg-stone-900 p-3 text-white">
          Save profile
        </button>
      </form>
    </>
  );
}
