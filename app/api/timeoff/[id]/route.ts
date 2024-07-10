import { NextResponse } from "next/server";
import { getTimeOffRecordById, createTimeOffRecord, deleteTimeOffRecord } from "../../../../utils/database";

export async function GET(request, { params }) {
    const { id } = params;
    try {
        const timeOffRecord = await getTimeOffRecordById(id);
        if (timeOffRecord) {
            return NextResponse.json(timeOffRecord);
        } else {
            return NextResponse.json({ error: "Time off record not found" }, { status: 404 });
        }
    } catch (error) {
        console.error("Error fetching time off record:", error);
        return NextResponse.json({ error: "Failed to retrieve the time off record" }, { status: 500 });
    }
}

export async function POST(request) {
    console.log(request.body)
    const { start_date, end_date, description, member_id } = await request.json();
    try {
        const newTimeOffRecord = await createTimeOffRecord({
            member_id: member_id,
            start_date,
            end_date,
            description: description
        });
        return NextResponse.json(newTimeOffRecord);
    } catch (error) {
        console.error("Error creating time off record:", error);
        return NextResponse.json({ error: "Failed to create the time off record" }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    const { id } = params;
    try {
        await deleteTimeOffRecord(id);
        return NextResponse.json({ message: "Time off record deleted successfully" });
    } catch (error) {
        console.error("Error deleting time off record:", error);
        return NextResponse.json({ error: "Failed to delete the time off record" }, { status: 500 });
    }
}
