import { NextResponse } from "next/server";
import { getTimeOffRecords } from "../../../utils/database";

export async function GET() {
    try {
        const timeOffRecords = await getTimeOffRecords();
        return NextResponse.json(timeOffRecords);
    } catch (error) {
        console.error("Error fetching time off records:", error);
        return NextResponse.json({ error: "Failed to fetch time off records" }, { status: 500 });
    }
}
