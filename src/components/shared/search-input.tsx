import { useState } from "react";

const SearchBar = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "all", name: "All" },
    { id: "electronics", name: "Electronics" },
    { id: "books", name: "Books" },
    { id: "clothing", name: "Clothing" },
    { id: "toys", name: "Toys" },
  ];

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Api Call and Redirect to Products Page
    console.log(
      "Searching in category:",
      selectedCategory,
      "for:",
      searchQuery
    );
  };

  return (
    <form onSubmit={handleSearch} className="flex w-full max-w-6xl gap-x-2">
      {/* Category Dropdown */}
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="px-2 py-2 bg-gray-100 border-r border-gray-300 rounded-lg text-sm focus:outline-none"
      >
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>

      {/* Search Input */}
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search..."
        className="flex-1 px-4 py-2 focus:border-sky-600 focus:border-2 border-2 border-gray-300"
      />

      {/* Search Button */}
      <button
        type="submit"
        className="px-6 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-800 rounded-lg border border-yellow-500 focus:outline-none"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
