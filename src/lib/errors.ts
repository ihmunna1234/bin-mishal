import { NextResponse } from 'next/server';

/**
 * Creates a sanitized JSON error response for clients.
 * Logs full error details and stack trace to server console with correlation ID.
 * Returns only generic safe error message and correlation ID to client.
 */
export function createErrorResponse(
  error: unknown,
  fallbackMessage = 'An unexpected server error occurred. Please try again.',
  statusCode = 500
): NextResponse {
  const errorId = crypto.randomUUID();

  // Log full detailed error on server side only
  console.error(`[SERVER API ERROR | Correlation ID: ${errorId}]`, {
    timestamp: new Date().toISOString(),
    error,
    message: error instanceof Error ? error.message : String(error),
    stack: error instanceof Error ? error.stack : undefined,
  });

  // Client receives generic message with correlation ID for support lookup
  return NextResponse.json(
    {
      success: false,
      error: fallbackMessage,
      errorId,
    },
    { status: statusCode }
  );
}
