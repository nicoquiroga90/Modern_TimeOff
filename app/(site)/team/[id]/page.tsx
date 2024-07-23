'use client'

import MyCalendar from "../../../../components/Functionalities/Calendar";
import CreateTimeoff from "../../../../components/Functionalities/CreateTimeoff";
import TeamMembers from "../../../../components/Functionalities/TeamDetails";
import WelcomeTeam from "../../../../components/Functionalities/WelcomeTeam";
import "../../../../components/Functionalities/styles/dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard-conteiner">
      <div className="dashboard-main">
        <div className="left-section">
          <MyCalendar />
          <CreateTimeoff />
        </div>
        <div className="right-section">
        <WelcomeTeam />
          <TeamMembers />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
