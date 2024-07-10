import { NextResponse } from "next/server";
import { getMembers, createMember, deleteMember } from "../../../utils/database";

export async function GET() {
  try {
    const members = await getMembers();
    return NextResponse.json(members);
  } catch (error) {
    console.error("Error fetching members:", error);
    return NextResponse.json({ error: "Failed to fetch members" }, { status: 500 });
  }
}

export async function POST(request) {
    try {
        const newMember = await request.json(); 
        const createdMember = await createMember(newMember);
        return NextResponse.json({ message: "New member has been added", member: createdMember });
    } catch (error) {
        console.error("Error adding member:", error);
        return NextResponse.json({ error: "Failed to add a new member" }, { status: 500 });
    }
}