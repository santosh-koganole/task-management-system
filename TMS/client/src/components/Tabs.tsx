import { Tab, TabGroup, TabList, TabPanels } from "@headlessui/react";
import { ReactNode } from "react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
interface ITab {
  title: string;
  icon: ReactNode; // Allows JSX elements like <MdGridView />
}

interface ITabsProps {
  tabs: ITab[];
  setSelected: (index: number) => void; // Function that updates selected index
  children?: ReactNode; // Optional children
}
const Tabs: React.FC<ITabsProps> = ({ tabs, setSelected, children }) => {
  return (
    <div className="w-full px-1 sm:px-0">
      <TabGroup>
        <TabList className="flex space-x-6 rounded-xl p-1">
          {tabs.map((tab, index) => (
            <Tab
              key={tab.title}
              onClick={() => setSelected(index)}
              className={({ selected }) =>
                classNames(
                  "w-fit flex items-center outline-none gap-2 px-3 py-2.5 text-base font-medium leading-5 bg-white",

                  selected
                    ? "text-blue-700  border-b-2 border-blue-600"
                    : "text-gray-800  hover:text-blue-800"
                )
              }
            >
              {tab.icon}
              <span>{tab.title}</span>
            </Tab>
          ))}
        </TabList>
        <TabPanels className="w-full mt-2">{children}</TabPanels>
      </TabGroup>
    </div>
  );
};
export default Tabs;
