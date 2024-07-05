import { neon } from "@neondatabase/serverless";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
    throw new Error("DATABASE_URL is not defined");
}

const sql = neon(databaseUrl);

// Funciones CRUD para la entidad "members"
export async function getMembers() {
    const members = await sql`SELECT * FROM members`;
    return members;
}

export async function createMember(memberData) {
    const result = await sql`
        INSERT INTO members (name, email, created_at)
        VALUES (${memberData.name}, ${memberData.email}, NOW())
        RETURNING *`;
    return result[0];
}

export async function getMemberById(id) {
    const result = await sql`SELECT * FROM members WHERE id = ${id}`;
    return result[0];
}

export async function updateMember(id, updatedMemberData) {
    const result = await sql`
        UPDATE members
        SET name = ${updatedMemberData.name}, email = ${updatedMemberData.email}
        WHERE id = ${id}
        RETURNING *`;
    return result[0];
}

export async function deleteMember(id) {
    const result = await sql`DELETE FROM members WHERE id = ${id} RETURNING *`;
    return result[0];
}

// Funciones CRUD para la entidad "teams"
export async function getTeams() {
    const teams = await sql`SELECT * FROM teams`;
    return teams;
}

export async function createTeam(teamData) {
    const result = await sql`
        INSERT INTO teams (name, description, created_at)
        VALUES (${teamData.name}, ${teamData.description}, NOW())
        RETURNING *`;
    return result[0];
}

export async function getTeamById(id) {
    const result = await sql`SELECT * FROM teams WHERE id = ${id}`;
    return result[0];
}

export async function updateTeam(id, updatedTeamData) {
    const result = await sql`
        UPDATE teams
        SET name = ${updatedTeamData.name}, description = ${updatedTeamData.description}
        WHERE id = ${id}
        RETURNING *`;
    return result[0];
}

export async function deleteTeam(id) {
    const result = await sql`DELETE FROM teams WHERE id = ${id} RETURNING *`;
    return result[0];
}

// Funciones CRUD para la entidad "timeoff"
export async function getTimeOffRecords() {
    const timeOffRecords = await sql`SELECT * FROM timeoff`;
    return timeOffRecords;
}

export async function createTimeOffRecord(timeOffData) {
    const result = await sql`
        INSERT INTO timeoff (employee_id, start_date, end_date, reason, created_at)
        VALUES (${timeOffData.employee_id}, ${timeOffData.start_date}, ${timeOffData.end_date}, ${timeOffData.reason}, NOW())
        RETURNING *`;
    return result[0];
}

export async function getTimeOffRecordById(id) {
    const result = await sql`SELECT * FROM timeoff WHERE id = ${id}`;
    return result[0];
}

export async function updateTimeOffRecord(id, updatedTimeOffData) {
    const result = await sql`
        UPDATE timeoff
        SET start_date = ${updatedTimeOffData.start_date}, end_date = ${updatedTimeOffData.end_date}, reason = ${updatedTimeOffData.reason}
        WHERE id = ${id}
        RETURNING *`;
    return result[0];
}

export async function deleteTimeOffRecord(id) {
    const result = await sql`DELETE FROM timeoff WHERE id = ${id} RETURNING *`;
    return result[0];
}
