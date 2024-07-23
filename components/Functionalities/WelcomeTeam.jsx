"use client";
import { useState, useEffect, useContext } from "react";
import { useParams } from "next/navigation";
import { TeamDataContext } from "./Context";
import Loading from "./Loading";
import "./styles/welcomeTeam.css";

const WelcomeTeam = () => {
  const { teams } = useContext(TeamDataContext);
  const [isLoading, setLoading] = useState(true);
  const [team, setTeam] = useState(null);

  const params = useParams()
  const { id } = params;

  useEffect(() => {
    if (id) {
      setLoading(true);
      const fetchTeamData = async () => {
        try {
          const currentTeam = teams.find((team) => team.team_code === id);
          setTeam(currentTeam);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching team data:", error);
          setLoading(false);
        }
      };

      fetchTeamData();
    }
  }, [id, teams]);

  return (
    <div className="containerList">
      <Loading open={isLoading} />
      <div className="titleContainer">
        <div className="titleContainer-heading">
          {team && (
            <h1>
              Hi Team <span>{team.team_name}</span>!😃
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default WelcomeTeam;
