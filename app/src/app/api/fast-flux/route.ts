import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

const FAST_FLUX_SERVER_URL = process.env.FAST_FLUX_SERVER_URL || "http://localhost:7001";

export async function POST(request: NextRequest) {
  try {
    // Check if Fast Flux server URL is configured
    if (!FAST_FLUX_SERVER_URL) {
      console.error('FAST_FLUX_SERVER_URL environment variable is not set');
      return NextResponse.json(
        { error: "Image generation service is not configured" },
        { status: 503 }
      );
    }

    // Get the user session to verify authentication
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized - Please log in" },
        { status: 401 }
      );
    }

    // Parse the request body
    const body = await request.json();
    const { prompt, num, style } = body;

    // Validate required fields
    if (!prompt || !num || !style) {
      return NextResponse.json(
        { error: "Missing required fields: prompt, num, style" },
        { status: 400 }
      );
    }

    // Validate input
    if (typeof prompt !== 'string' || prompt.trim().length === 0) {
      return NextResponse.json(
        { error: "Invalid prompt" },
        { status: 400 }
      );
    }

    if (typeof num !== 'number' || num < 1 || num > 8) {
      return NextResponse.json(
        { error: "Number of images must be between 1 and 8" },
        { status: 400 }
      );
    }

    // Prepare the request to Fast Flux server
    const fastFluxPayload = {
      prompt: prompt.trim(),
      num: num,
      email: session.user.email,
      style: style
    };

    console.log('Making request to Fast Flux server:', FAST_FLUX_SERVER_URL);
    console.log('Payload:', fastFluxPayload);

    // Make request to Fast Flux server
    const response = await fetch(`${FAST_FLUX_SERVER_URL}/fast-flux`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any API keys or authentication headers here if needed
        // 'Authorization': `Bearer ${process.env.FAST_FLUX_API_KEY}`,
      },
      body: JSON.stringify(fastFluxPayload),
    });

    if (!response.ok) {
      console.error('Fast Flux server error:', response.status, response.statusText);
      return NextResponse.json(
        { error: "Image generation service is currently unavailable" },
        { status: 503 }
      );
    }

    // Return the streaming response directly
    return new NextResponse(response.body, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });

  } catch (error) {
    console.error('Fast Flux API error:', error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Handle preflight requests
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
} 