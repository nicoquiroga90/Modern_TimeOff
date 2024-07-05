import { NextResponse } from "next/server";
import { getTeams, addTeam } from "../../../utils/database";

export async function GET() {
    try {
        const teams = await getTeams();
        return NextResponse.json(teams);
    } catch (error) {
        console.error("Error fetching teams:", error);
        return NextResponse.json({ error: "Failed to fetch teams" }, { status: 500 });
    }
}

export async function POST(request) {
    const newTeam = request.body;
    try {
        await addTeam(newTeam);
        return NextResponse.json({ message: "New team has been added" });
    } catch (error) {
        console.error("Error adding team:", error);
        return NextResponse.json({ error: "Failed to add a new team" }, { status: 500 });
    }
}
