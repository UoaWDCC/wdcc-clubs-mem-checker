import { DashboardContextProvider } from '../Dashboard';
import IDashboardContext from '../../../types/IDashboardContext';
import { useContext, Dispatch, SetStateAction } from 'react';

const ClubSize = () => {
  // retrieve context
  const [dashboard] = useContext(DashboardContextProvider) as [
    IDashboardContext,
    Dispatch<SetStateAction<IDashboardContext>>
  ];

  let memberCount;
  const selectedPageIndex = dashboard.selectedPageIndex;
  if (
    selectedPageIndex !== undefined &&
    dashboard.dashboardPage?.pages.length !== 0
  ) {
    const pageId = dashboard.dashboardPage?.pages[selectedPageIndex].id;
    if (pageId !== undefined) {
      memberCount =
        dashboard.dashboardPage?.memberCountByPageId[pageId].totalMembers;
    }
  }

  return (
    <div className="flex flex-col justify-between gap-4 font-display min-h-0 h-fit">
      <div>
        <h1 className="text-[#03045e] text-xl font-semibold leading-5">
          number of club users
        </h1>
        <h2 className="text-[#03045e7a] text-lg font-display font-semibold">
          specific to the Google Sheet for this checker page
        </h2>
        <h1 className="text-[#03045e] text-5xl font-display font-extrabold">
          {memberCount !== undefined ? memberCount : 'N/A'}
        </h1>
      </div>
    </div>
  );
};

export default ClubSize;
