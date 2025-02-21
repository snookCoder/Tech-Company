import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import mongoose from 'mongoose';

// Define the schema outside the handler to ensure it’s only created once
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  createdAt: { type: Date, default: Date.now },
});

// Get or create the model outside the handler (it will be cached by Mongoose)
let ContactForm;
try {
  ContactForm = mongoose.model('ContactForm');
} catch (error) {
  ContactForm = mongoose.model('ContactForm', contactSchema);
}

export async function POST(request: Request) {
  try {
    // Parse the form data from the request
    const body = await request.json();
    const { name, email, message } = body;
    console.log("body", body);

    // Validate the input
    if (!name || !email || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Connect to MongoDB
    await connectToDatabase();
    console.log('dsfnkl');

    // Insert the form data into MongoDB
    const result = await ContactForm.create({
      name,
      email,
      message,
    });
    console.log("result", result);

    // Return a success response
    return NextResponse.json({ message: "Form submitted successfully", id: result._id }, { status: 201 });
  } catch (error) {
    console.error('Error submitting form:', error.message);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}