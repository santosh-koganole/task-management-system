import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";
import { Fragment } from "react";
import { FieldValues, UseFormSetValue, UseFormTrigger } from "react-hook-form";
import { BsChevronExpand } from "react-icons/bs";
import { MdCheck } from "react-icons/md";

interface SelectListProps {
  label?: string;
  lists: string[]; // Change this if `lists` is an array of objects
  selected: string; // Change this if `selected` is an object
  setSelected: React.Dispatch<React.SetStateAction<string>>; // Change this to the correct type if needed
  registerName?: string; // Optional for validation
  setValue?: UseFormSetValue<FieldValues>; // Optional for validation
  trigger?: UseFormTrigger<FieldValues>; // Optional for validation
  isDisabled?: boolean;
}
const SelectList: React.FC<SelectListProps> = ({
  lists,
  selected,
  setSelected,
  label,
  registerName,
  setValue,
  trigger,
  isDisabled,
}) => {
  const handleSelect = (value: string) => {
    setSelected(value);
    if (setValue && registerName) setValue(registerName, value); // Update RHF form state
    if (trigger && registerName) trigger(registerName); // Trigger validation
  };

  return (
    <div className="w-full">
      {label && <p className="text-slate-900 dark:text-gray-500">{label}</p>}

      <Listbox value={selected} onChange={handleSelect} disabled={isDisabled}>
        <div className="relative mt-1">
          <ListboxButton
            className={`relative w-full cursor-default rounded pl-3 pr-10 text-left px-3 py-2.5 2xl:py-3 border border-gray-300 sm:text-sm ${
              isDisabled ? "bg-gray-200 cursor-not-allowed" : "bg-white "
            }`}
          >
            <span className="block truncate">{selected}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <BsChevronExpand
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </ListboxButton>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ListboxOptions className="z-50 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {lists.map((list, index) => (
                <ListboxOption
                  key={index}
                  className={({ selected }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      selected ? "bg-amber-100 text-amber-900" : "text-gray-900"
                    }`
                  }
                  value={list}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {list}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <MdCheck className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default SelectList;
