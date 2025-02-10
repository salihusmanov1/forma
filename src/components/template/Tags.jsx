import { useFieldArray, useFormContext } from "react-hook-form";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandEmpty,
} from "@/components/ui/command";

import { Command as CommandPrimitive } from "cmdk";
import { useCallback, useRef, useState } from "react";
import { Badge } from "../ui/badge";
import { Icon } from "@iconify/react";

export function Tags({ tagList }) {
  const inputRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const dropdownRef = useRef(null);
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    name: "tags",
    control,
  });

  const handleUnselect = useCallback((tag) => {
    remove(fields.findIndex((s) => s.name === tag.name));
  }, []);

  const handleKeyDown = useCallback((e) => {
    const input = inputRef.current;
    if (input) {
      if (e.key === "Delete" || e.key === "Backspace") {
        if (input.value === "") {
          remove(fields.length);
        }
      }
      if (e.key === "Escape") {
        input.blur();
      }
    }
  }, []);

  const selectables = tagList?.data.filter(
    (tag) => !fields.some((s) => s.name === tag.name)
  );

  const handleBlur = (event) => {
    if (
      event.relatedTarget &&
      dropdownRef.current &&
      dropdownRef.current.contains(event.relatedTarget)
    ) {
      return;
    }
    setOpen(false);
  };

  return (
    <Command
      onKeyDown={handleKeyDown}
      className="overflow-visible bg-transparent"
    >
      <div className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="flex flex-wrap gap-1">
          {fields.map((tag) => (
            <Badge key={tag.name} variant="secondary">
              {tag.name}
              <button
                className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleUnselect(tag);
                  }
                }}
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onClick={() => handleUnselect(tag)}
              >
                <Icon
                  icon="lucide:x"
                  className="h-3 w-3 text-muted-foreground hover:text-foreground"
                />
              </button>
            </Badge>
          ))}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={handleBlur}
            onFocus={() => setOpen(true)}
            placeholder="Type to search tags..."
            className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>
      <div className="relative mt-2">
        <CommandList onMouseDown={(e) => e.preventDefault()}>
          {open && (
            <div
              ref={dropdownRef}
              className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in"
            >
              {inputValue || selectables.length > 0 ? (
                <CommandGroup className="max-h-[200px] overflow-y-scroll">
                  {selectables.map((tag) => (
                    <CommandItem
                      key={tag.name}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onSelect={() => {
                        setInputValue("");
                        append(tag);
                      }}
                      className={"cursor-pointer"}
                    >
                      {tag.name}
                    </CommandItem>
                  ))}

                  {!tagList?.data.some((tag) => tag.name === inputValue) &&
                    inputValue && (
                      <CommandItem
                        onSelect={() => {
                          setInputValue("");
                          append({ name: inputValue });
                        }}
                        className={"cursor-pointer"}
                      >
                        {inputValue && `'${inputValue}'`}
                      </CommandItem>
                    )}
                </CommandGroup>
              ) : (
                <CommandEmpty>No results found.</CommandEmpty>
              )}
            </div>
          )}
        </CommandList>
      </div>
    </Command>
  );
}

export default Tags;
