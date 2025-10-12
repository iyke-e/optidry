"use client";
import React, { useState, useEffect, useRef } from "react";

interface Option {
  label: string;
  value: string;
}

interface CustomSelectProps {
  options: Option[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function CustomSelect({
  options,
  value,
  onChange,
  placeholder = "Select...",
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState(options);
  const [position, setPosition] = useState<"top" | "bottom">("bottom");
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [highlightIndex, setHighlightIndex] = useState(-1);

  // Filter options
  useEffect(() => {
    const q = search.toLowerCase();
    setFiltered(options.filter((opt) => opt.label.toLowerCase().includes(q)));
  }, [search, options]);

  // Dynamic positioning
  useEffect(() => {
    if (isOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      setPosition(
        spaceBelow < 200 && spaceAbove > spaceBelow ? "top" : "bottom"
      );
    }
  }, [isOpen]);

  // Keyboard control
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen && (e.key === "ArrowDown" || e.key === "Enter")) {
      setIsOpen(true);
      return;
    }
    if (e.key === "ArrowDown") {
      setHighlightIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      setHighlightIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && highlightIndex >= 0) {
      const selected = filtered[highlightIndex];
      if (selected) {
        onChange(selected.value);
        setSearch("");
        setIsOpen(false);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  const handleSelect = (val: string) => {
    onChange(val);
    setSearch("");
    setIsOpen(false);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-sm"
      onKeyDown={handleKeyDown}
    >
      <div
        className="border rounded-lg p-2 bg-white dark:bg-gray-900 flex items-center justify-between cursor-pointer"
        onClick={() => setIsOpen((o) => !o)}
      >
        <input
          type="text"
          value={
            isOpen
              ? search
              : options.find((opt) => opt.value === value)?.label || ""
          }
          placeholder={placeholder}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-transparent outline-none"
        />
        <span className="ml-2 text-gray-500">{isOpen ? "▲" : "▼"}</span>
      </div>

      {isOpen && (
        <ul
          ref={listRef}
          className={`absolute z-50 w-full border rounded-lg bg-white dark:bg-gray-900 max-h-56 overflow-auto shadow-md ${
            position === "top" ? "bottom-full mb-1" : "top-full mt-1"
          }`}
        >
          {filtered.length === 0 ? (
            <li className="p-2 text-gray-400 text-sm">No options</li>
          ) : (
            filtered.map((opt, idx) => (
              <li
                key={opt.value}
                className={`p-2 cursor-pointer ${
                  value === opt.value
                    ? "bg-blue-100 dark:bg-blue-700"
                    : highlightIndex === idx
                    ? "bg-gray-100 dark:bg-gray-800"
                    : ""
                }`}
                onClick={() => handleSelect(opt.value)}
                onMouseEnter={() => setHighlightIndex(idx)}
              >
                {opt.label}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
