import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { mockDisasters, DisasterData } from "@/data/mockData";
import DisasterCard from "./DisasterCard";

interface SearchSectionProps {
  onSelectDisaster: (d: DisasterData) => void;
}

const SearchSection = ({ onSelectDisaster }: SearchSectionProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<DisasterData[]>([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = () => {
    if (!query.trim()) return;
    const q = query.toLowerCase();
    const found = mockDisasters.filter(
      (d) => d.location.toLowerCase().includes(q) || d.type.toLowerCase().includes(q)
    );
    setResults(found);
    setSearched(true);
  };

  return (
    <section className="mx-auto max-w-2xl px-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Search city, village, or area…"
            className="pl-10"
          />
        </div>
        <Button onClick={handleSearch}>Search</Button>
      </div>

      {searched && (
        <div className="mt-4 space-y-3">
          {results.length === 0 ? (
            <p className="text-center text-sm text-muted-foreground">No disasters found for "{query}"</p>
          ) : (
            results.map((d) => <DisasterCard key={d.id} disaster={d} onViewAuthorities={() => onSelectDisaster(d)} />)
          )}
        </div>
      )}
    </section>
  );
};

export default SearchSection;
