"use client";

import { useState, useMemo } from "react";
import { Search, Filter, SortAsc, Grid3X3, List } from "lucide-react";
import { Temple, mathuraTemples } from "@/lib/data/temples";
import { TempleCard } from "./temple-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface TempleGridProps {
  onTempleSelect?: (temple: Temple) => void;
  selectedTempleIds?: string[];
  showSelectButton?: boolean;
}

export function TempleGrid({
  onTempleSelect,
  selectedTempleIds = [],
  showSelectButton = false,
}: TempleGridProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"priority" | "name" | "timing">("priority");
  const [filterTags, setFilterTags] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Get all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    mathuraTemples.forEach((temple) => {
      temple.tags.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags);
  }, []);

  // Filter and sort temples
  const filteredTemples = useMemo(() => {
    let temples = [...mathuraTemples];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      temples = temples.filter(
        (temple) =>
          temple.name.toLowerCase().includes(query) ||
          temple.description.toLowerCase().includes(query) ||
          temple.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Tag filter
    if (filterTags.length > 0) {
      temples = temples.filter((temple) =>
        filterTags.some((tag) => temple.tags.includes(tag))
      );
    }

    // Sort
    switch (sortBy) {
      case "priority":
        temples.sort((a, b) => b.priority - a.priority);
        break;
      case "name":
        temples.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "timing":
        temples.sort((a, b) => a.openingTime.localeCompare(b.openingTime));
        break;
    }

    return temples;
  }, [searchQuery, sortBy, filterTags]);

  const toggleTag = (tag: string) => {
    setFilterTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search temples..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-2">
          <Select value={sortBy} onValueChange={(v) => setSortBy(v as typeof sortBy)}>
            <SelectTrigger className="w-[160px]">
              <SortAsc className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="priority">By Priority</SelectItem>
              <SelectItem value="name">By Name</SelectItem>
              <SelectItem value="timing">By Opening Time</SelectItem>
            </SelectContent>
          </Select>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filter
                {filterTags.length > 0 && (
                  <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 text-xs">
                    {filterTags.length}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              {allTags.map((tag) => (
                <DropdownMenuCheckboxItem
                  key={tag}
                  checked={filterTags.includes(tag)}
                  onCheckedChange={() => toggleTag(tag)}
                >
                  {tag}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="flex border rounded-md">
            <Button
              variant={viewMode === "grid" ? "secondary" : "ghost"}
              size="icon"
              className="rounded-r-none"
              onClick={() => setViewMode("grid")}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "secondary" : "ghost"}
              size="icon"
              className="rounded-l-none"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Active Filters */}
      {filterTags.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {filterTags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
              onClick={() => toggleTag(tag)}
            >
              {tag} ×
            </Badge>
          ))}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setFilterTags([])}
            className="h-6 text-xs"
          >
            Clear all
          </Button>
        </div>
      )}

      {/* Results Count */}
      <p className="text-sm text-muted-foreground">
        Showing {filteredTemples.length} of {mathuraTemples.length} temples
      </p>

      {/* Temple Grid/List */}
      <div
        className={cn(
          viewMode === "grid"
            ? "grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            : "space-y-4"
        )}
      >
        {filteredTemples.map((temple) => (
          <TempleCard
            key={temple.id}
            temple={temple}
            variant={viewMode === "list" ? "compact" : "default"}
            isSelected={selectedTempleIds.includes(temple.id)}
            onSelect={onTempleSelect}
            showSelectButton={showSelectButton}
          />
        ))}
      </div>

      {filteredTemples.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No temples found matching your criteria.</p>
          <Button
            variant="link"
            onClick={() => {
              setSearchQuery("");
              setFilterTags([]);
            }}
          >
            Clear filters
          </Button>
        </div>
      )}
    </div>
  );
}
