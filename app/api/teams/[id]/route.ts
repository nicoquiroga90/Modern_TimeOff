import { NextResponse } from "next/server";
import { getTeamById, updateTeam, deleteTeam } from "../../../utils/database";

export async function GET(request) {
    const { id } = request.params;
    try {
        const team = await getTeamById(id);
        if (team) {
            return NextResponse.json(team);
        } else {
            return NextResponse.json({ error: "Team not found" }, { status: 404 });
        }
    } catch (error) {
        console.error("Error fetching team:", error);
        return NextResponse.json({ error: "Failed to retrieve the team" }, { status: 500 });
    }
}

export async function PUT(request) {
    const { id } = request.params;
    const updatedTeam = request.body;
    try {
        await updateTeam(id, updatedTeam);
        return NextResponse.json({ message: "Team updated successfully" });
    } catch (error) {
        console.error("Error updating team:", error);
        return NextResponse.json({ error: "Failed to update the team" }, { status: 500 });
    }
}

export async function DELETE(request) {
    const { id } = request.params;
    try {
        await deleteTeam(id);
        return NextResponse.json({ message: "Team deleted successfully" });
    } catch (error) {
        console.error("Error deleting team:", error);
        return NextResponse.json({ error: "Failed to delete the team" }, { status: 500 });
    }
}
