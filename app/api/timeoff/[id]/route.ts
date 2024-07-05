import { NextResponse } from "next/server";
import { getTimeOffRecordById, updateTimeOffRecord, deleteTimeOffRecord } from "../../../../utils/database";

export async function GET(request: Request,
  { params }: { params: { id: string } }
)  {
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

export async function PUT(request: Request,
  { params }: { params: { id: string } }
)  {
    const { id } = params;
    const updatedTimeOffData = request.body;
    try {
        const updatedTimeOffRecord = await updateTimeOffRecord(id, updatedTimeOffData);
        return NextResponse.json(updatedTimeOffRecord);
    } catch (error) {
        console.error("Error updating time off record:", error);
        return NextResponse.json({ error: "Failed to update the time off record" }, { status: 500 });
    }
}

export async function DELETE(request: Request,
  { params }: { params: { id: string } }
)  {
    const { id } = params;
    try {
        await deleteTimeOffRecord(id);
        return NextResponse.json({ message: "Time off record deleted successfully" });
    } catch (error) {
        console.error("Error deleting time off record:", error);
        return NextResponse.json({ error: "Failed to delete the time off record" }, { status: 500 });
    }
}
