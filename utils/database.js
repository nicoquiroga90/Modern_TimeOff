// En un archivo, por ejemplo: utils/database.js

import { neon } from "@neondatabase/serverless";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
    throw new Error("DATABASE_URL is not defined");
}

const sql = neon(databaseUrl);

// Funciones CRUD para la tabla members

// Función para obtener todos los miembros
export async function getMembers() {
    const members = await sql`SELECT * FROM members`;
    return members;
}

// Función para obtener un miembro por su ID
export async function getMemberById(id) {
    console.log(id)
    const [member] = await sql`SELECT * FROM members WHERE id = ${id}`;
    return member;
}

// Función para agregar un nuevo miembro
export async function addMember(newMember) {
    newMember.created_date = new Date();
    const query = await sql`INSERT INTO members ${sql(newMember)}`;
    return query;
}

// Función para actualizar un miembro
export async function updateMember(id, updatedMember) {
    const query = await sql`UPDATE members SET ${sql(updatedMember)} WHERE id = ${id}`;
    return query;
}

// Función para eliminar un miembro por su ID
export async function deleteMember(id) {
    const query = await sql`DELETE FROM members WHERE id = ${id}`;
    return query;
}

// Funciones adicionales para otras tablas (ejemplo: teams y timeoff)

// Función para obtener todos los equipos (teams)
export async function getTeams() {
    const teams = await sql`SELECT * FROM teams`;
    return teams;
}

// Función para obtener todos los registros de tiempo libre (timeoff)
export async function getTimeOffRecords() {
    const timeOffRecords = await sql`SELECT * FROM timeoff`;
    return timeOffRecords;
}

// Función para obtener todos los datos relacionados (miembros, equipos y tiempo libre)
export async function getAllData() {
    const members = await getMembers();
    const teams = await getTeams();
    const timeOffRecords = await getTimeOffRecords();

    return {
        members,
        teams,
        timeOffRecords
    };
}
