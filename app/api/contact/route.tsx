import { NextResponse } from 'next/server';
import { createContact } from '../../../utils/database';

// Maneja las solicitudes POST
export async function POST(request: Request) {
  try {
    const { name, email, subject, phone, message } = await request.json();

    if (!name || !email || !subject || !phone || !message) {
      return NextResponse.json({ success: false, message: 'All fields are required' }, { status: 400 });
    }

    const newContact = await createContact({ name, email, subject, phone, message });

    return NextResponse.json({ success: true, contact: newContact });
  } catch (error) {
    console.error('Error creating contact:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function OPTIONS() {
  return NextResponse.json({ success: false, error: 'Method Not Allowed' }, { status: 405 });
}
