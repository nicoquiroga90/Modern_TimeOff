import { NextResponse } from "next/server";
import { getMemberById, updateMember, deleteMember } from "../../../../utils/database";

export async function GET(request: Request,
  { params }: { params: { id: string } }
)  {
    const { id } = params;

    try {
        const member = await getMemberById(id);
        if (member) {
            return NextResponse.json(member);
        } else {
            return NextResponse.json({ error: "Member not found" }, { status: 404 });
        }
    } catch (error) {
        console.error("Error fetching member:", error);
        return NextResponse.json({ error: "Failed to retrieve the member" }, { status: 500 });
    }
}

export async function PUT(request: Request,
  { params }: { params: { id: string } }
)  {
    const { id } = params;
    const updatedMember = request.body;
    try {
        await updateMember(id, updatedMember);
        return NextResponse.json({ message: "Member updated successfully" });
    } catch (error) {
        console.error("Error updating member:", error);
        return NextResponse.json({ error: "Failed to update the member" }, { status: 500 });
    }
}

export async function DELETE(request: Request,
  { params }: { params: { id: string } }
)  {
    const { id } = params;
    try {
        await deleteMember(id);
        return NextResponse.json({ message: "Member deleted successfully" });
    } catch (error) {
        console.error("Error deleting member:", error);
        return NextResponse.json({ error: "Failed to delete the member" }, { status: 500 });
    }
}
