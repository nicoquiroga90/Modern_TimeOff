import { NextResponse } from "next/server";
import { getTimeOffRecords, deleteTimeOffRecord } from "../../../utils/database";

export async function GET() {
    try {
        const timeOffRecords = await getTimeOffRecords();
        return NextResponse.json(timeOffRecords);
    } catch (error) {
        console.error("Error fetching time off records:", error);
        return NextResponse.json({ error: "Failed to fetch time off records" }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        const { id } = await request.json();
        await deleteTimeOffRecord(id);
        return NextResponse.json({ message: "Time off record deleted successfully" });
    } catch (error) {
        console.error("Error deleting time off record:", error);
        return NextResponse.json({ error: "Failed to delete the time off record" }, { status: 500 });
    }
}