export default function Searchbar() {
  const handleSearchChange = (e: any) => {
    console.log(e.target.value)
  }

  return (
    <div>
      <input
        onChange={handleSearchChange}
        type="text"
        className="w-full text-white placeholder-white rounded bg-gray-700 p-4"
        placeholder="🔍   Search blogs..."
      />
    </div>
  )
}
