// route.js or route.ts (in app/api/review/)

import dbConnect from "../../../../lib/monogdb";
import user from "@/app/modals/User";

export async function POST(request) {
  await dbConnect();

  const body = await request.json();

  try {
    // Try to find any document (assuming only one main document exists)
    let reviewDocument = await user.findOne();

    // Check if a review with the same gmail already exists
    console.log(body);
    const existingReview = await user.findOne({ "reviews.email": body.email });
    
    console.log(existingReview);

    if (existingReview) {
      return Response.json(
        { message: "Review already exists with this email" },
        { status: 345 }
      );
    }

    if (!reviewDocument) {
      // If no document exists at all, create a new one
      reviewDocument = await user.create({ reviews: [body] });
    } else {
      // If document exists, push the new review
      reviewDocument.reviews.push(body);
      await reviewDocument.save();
    }

    return Response.json(reviewDocument, { status: 201 });
  } catch (error) {
    console.error("Error creating review:", error);
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

