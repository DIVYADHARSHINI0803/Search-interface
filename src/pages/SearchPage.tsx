import { useEffect, useMemo, useRef, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useDebounce } from "../hooks/useDebounce";
import { Button } from "../components/ui/button";

// items to search through (mock data for demonstration)
const mockItems = [
  "React",
  "TypeScript",
  "Tailwind CSS",
  "ShadCN",
  "Node.js",
  "Express",
  "MongoDB",
  "MySQL",
];

// SearchPage component demonstrates button variants/sizes and a search interface with debouncing and localStorage persistence
export default function SearchPage() {
  const [search, setSearch] = useLocalStorage<string>("search-query", "");
  const [results, setResults] = useState<string[]>(mockItems);
  const [isLoading, setIsLoading] = useState(false);
  const searchButtonRef = useRef<HTMLButtonElement>(null);

// debounce the search input to avoid excessive filtering while typing
  const debouncedSearch = useDebounce(search, 500);

// useEffect to filter results based on debounced search term, simulating a loading state
  useEffect(() => {
    setIsLoading(true);

    const timer = setTimeout(() => {
      const filteredResults = mockItems.filter((item) =>
        item.toLowerCase().includes(debouncedSearch.toLowerCase()),
      );

      setResults(filteredResults);
      setIsLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [debouncedSearch]);

// useMemo to calculate result count efficiently, only recalculating when results change
  const resultCount = useMemo(() => results.length, [results]);

  const handleClear = () => {
    setSearch("");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
        <p className="text-3xl font-semibold text-blue-700 mb-4 text-center">
          SearchX: Fast & Persistent Search Interface
        </p>
      <div className="mx-auto max-w-2xl rounded-xl bg-white p-6 shadow-md">

{/* Sizes */}
        <h1 className="mb-2 text-2xl font-bold text-gray-900">Sizes</h1>
        <div className="mb-4 flex gap-3">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>

{/* Variants */}
        <h1 className="mb-2 text-2xl font-bold text-gray-900">Variants</h1>
        <div className="mb-4 flex gap-3">
          <Button variant="primary" size="md">
            Primary
          </Button>
          <Button variant="secondary" size="md">
            Secondary
          </Button>
          <Button variant="ghost" size="md">
            Ghost
          </Button>
          <Button variant="danger" size="md">
            Danger
          </Button>
        </div>

{/* Search Interface */}
        <h1 className="mb-2 text-2xl font-bold text-gray-900">
          Search Interface
        </h1>
        <p className="mb-6 text-sm text-gray-600">
          Search is stored in localStorage and debounced before filtering.
        </p>

        <div className="mb-4 flex gap-3">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search technologies..."
            className="flex-1 rounded-md border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
          />

          <Button variant="primary" size="md" ref={searchButtonRef}>
            Search
          </Button>

          <Button variant="ghost" size="md" onClick={handleClear}>
            Clear
          </Button>
        </div>

{/* isLoading and Results */}
        <div className="mb-4">
          <Button variant="primary" size="md" isLoading={isLoading}>
            Loading Button
          </Button>
        </div>

        <div className="mb-3 text-sm text-gray-700">
          Showing {resultCount} result{resultCount !== 1 ? "s" : ""}
        </div>

        <ul className="space-y-2">
          {results.length > 0 ? (
            results.map((item, index) => (
              <li
                key={index}
                className="rounded-md border border-gray-200 bg-gray-50 px-4 py-2"
              >
                {item}
              </li>
            ))
          ) : (
            <li className="text-sm text-gray-500">No results found.</li>
          )}
        </ul>
      </div>
    </div>
  );
}
