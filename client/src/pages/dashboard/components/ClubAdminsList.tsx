import { Dispatch, SetStateAction, useContext, useState } from 'react';
import { DashboardContextProvider } from '../Dashboard';
import IDashboardContext from '../../../types/IDashboardContext';

const ClubAdminsList = () => {
  const [dashboard, setDashboard] = useContext(DashboardContextProvider) as [
    IDashboardContext,
    Dispatch<SetStateAction<IDashboardContext>>
  ];

  const admins = dashboard.dashboardPage?.clubAdmins || [];
  // const admins = ["Adam McKinsley", "Bob Arthur", "Cindy Wong", "Amanda Young"];

  return (
    <div className="w-full p-4 flex flex-col gap-2">
      <h1 className="text-[#03045e] text-lg font-bold font-display">
        club admins
      </h1>
      <div className="w-full min-h-24 bg-[#E0E0E0] rounded-lg overflow-y-scroll p-2">
        {admins.map((admin) => (
          <p
            key={admin}
            className="text-[#03045e] font-display text-md"
          >
            {admin}
          </p>
        ))}
      </div>
    </div>
  );
};

export default ClubAdminsList;
