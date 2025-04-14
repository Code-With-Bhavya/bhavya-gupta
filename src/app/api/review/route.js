// route.js or route.ts (in app/api/review/)

import dbConnect from "../../../../lib/monogdb";
import user from "@/app/modals/User";

export async function POST(request) {
  await dbConnect();

  const body = await request.json();

  try {

    let reviewDocument = await user.findOne();

    if (!reviewDocument) {
      reviewDocument = await user.create({ reviews: [body] });

    } else {

      // Otherwise, push the new review into the reviews array
      reviewDocument.reviews.push(body);

      await reviewDocument.save();

    }
    return Response.json(reviewDocument, { status: 201 });
  } catch (error) {
    return Response.json({ error: "Failed to create review" }, { status: 400 });
  }
}

export async function GET() {
  await dbConnect();
  
  const reviewDocument = await user.findOne();  // Get the first document (assuming only one document stores reviews)
  
  if (reviewDocument) {
      return Response.json(reviewDocument.reviews);  // Return only the reviews array
  }
  
  return Response.json([], { status: 404 });  // If no reviews exist
}

