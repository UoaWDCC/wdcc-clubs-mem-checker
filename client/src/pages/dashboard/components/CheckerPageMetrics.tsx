import {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  useContext,
  useRef,
} from 'react';
import { ArrowDown2, ArrowUp2 } from 'iconsax-react';
import { DashboardContextProvider } from '../Dashboard';
import IDashboardContext from '../../../types/IDashboardContext';

const getKeyFromDisplayString = (
  displayString: string,
  map: { [key: string]: string }
) => {
  for (const key in map) {
    if (map[key] === displayString) {
      return key;
    }
  }
  return map[Object.keys(map)[0]];
};

const CheckerPageMetrics = () => {
  /* time periods: last 7 days, last 2 weeks, last month, all time */
  const [dashboard, setDashboard] = useContext(DashboardContextProvider) as [
    IDashboardContext,
    Dispatch<SetStateAction<IDashboardContext>>
  ];

  const metrics =
    dashboard.dashboardPage?.pages.length !== 0 &&
    dashboard.dashboardPage &&
    dashboard.selectedPageIndex !== undefined
      ? dashboard.dashboardPage.pages[dashboard.selectedPageIndex].metrics
      : Object.create(null);

  const possibleTimePeriodsDisplay: { [key: string]: string } = {
    allTime: 'all time',
    lastDay: 'last day',
    last7Days: 'last 7 days',
    last30Days: 'last 30 days',
  };
  const possibleTimePeriods = Object.keys(metrics);

  const [timePeriod, setTimePeriod] = useState<undefined | string>();
  const [isOpen, setIsOpen] = useState(false);

  // Ref for the dropdown title
  const dropdownTitleRef = useRef<HTMLDivElement>(null);
  // Ref for the dropdown list element
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Function to close the dropdown when clicking outside of it
  const closeDropdownOnOutsideClick = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      dropdownTitleRef.current &&
      !dropdownTitleRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    // Attach the event listener when the component mounts
    document.addEventListener('mousedown', closeDropdownOnOutsideClick);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', closeDropdownOnOutsideClick);
    };
  }, []);

  useEffect(() => {
    setTimePeriod(possibleTimePeriodsDisplay[possibleTimePeriods[0]]);
  }, [dashboard.dashboardPage && dashboard.selectedPageIndex !== undefined]);

  const handleSelectTimePeriod = (time: string) => {
    setIsOpen(!isOpen);
    setTimePeriod(time);
  };

  return (
    <div className="p-4 flex flex-col">
      <div className="p-4 flex flex-col bg-transparent h-1/5">
        <div
          ref={dropdownTitleRef}
          className="bg-[#087DF1] h-12 relative rounded-lg flex flex-row items-center justify-between border-none z-2 cursor-pointer w-full"
          onClick={
            Object.getPrototypeOf(metrics) === null
              ? () => {}
              : () => setIsOpen(!isOpen)
          }
        >
          <p className="p-2 text-[white] text-lg font-sans font-semibold">
            {Object.getPrototypeOf(metrics) === null ? 'N/A' : timePeriod}{' '}
          </p>
          <div className="pr-5 py-10 flex items-center">
            {!isOpen && (
              <ArrowDown2
                size="20"
                color="white"
              />
            )}
            {isOpen && (
              <ArrowUp2
                size="20"
                color="white"
              />
            )}
          </div>
        </div>
        {isOpen && (
          <div
            ref={dropdownRef}
            className="absolute z-4 rounded-lg bg-[#489ef4] overflow-x-hidden w-48"
          >
            {Object.values(possibleTimePeriodsDisplay).map((time) => (
              <div
                key={time}
                className="items-center gap-10 cursor-pointer flex py-6 px-3 opacity-50 z-3 text-lg font-bold font-sans h-5 hover:bg-[#0c81d4]"
                onClick={() => handleSelectTimePeriod(time)}
                style={{ transform: 'translate(0%, 5.7vh)' }}
              >
                <p>{time}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col h-1/5">
        <h1 className="font-sans font-bold text-[#03045e] text-xl">
          number of users
        </h1>
        <h1 className="font-sans text-[#03045e]">
          total number of checks performed
        </h1>
        <h1 className="font-sans font-black text-[#03045e] text-3xl">
          {Object.getPrototypeOf(metrics) === null
            ? 'N/A'
            : timePeriod &&
              metrics[
                getKeyFromDisplayString(timePeriod, possibleTimePeriodsDisplay)
              ].numberOfChecks}
        </h1>
      </div>
      <div className="p-4 flex flex-col bg-[#E6E9F1] h-2/5">
        <h1 className="font-sans font-bold text-[#03045e] text-xl">
          duplicates found
        </h1>
        <h2 className="font-sans text-[#03045e]">
          total number of existing memberships found
        </h2>
        <h1 className="font-sans font-black text-[#03045e] text-3xl">
          {Object.getPrototypeOf(metrics) === null
            ? 'N/A'
            : timePeriod &&
              metrics[
                getKeyFromDisplayString(timePeriod, possibleTimePeriodsDisplay)
              ].numberOfDuplicates}
        </h1>
      </div>
    </div>
  );
};

export default CheckerPageMetrics;
