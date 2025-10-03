// src/app/api/debug/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Check environment variables (without exposing full credentials)
    const databaseUrl = process.env.DATABASE_URL;
    
    const info = {
      hasDatabaseUrl: !!databaseUrl,
      databaseHost: databaseUrl ? new URL(databaseUrl).host : 'MISSING',
      nodeEnv: process.env.NODE_ENV,
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(info);
  } catch (error) {
    return NextResponse.json({ 
      error: 'Failed to check environment',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
