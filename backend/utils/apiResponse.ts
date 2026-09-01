import { NextResponse } from 'next/server';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  count?: number;
}

export function successResponse<T>(data: T, status = 200, extra: Record<string, any> = {}) {
  return NextResponse.json(
    {
      success: true,
      data,
      ...extra,
    },
    { status }
  );
}

export function errorResponse(message: string, status = 400, errors?: any) {
  return NextResponse.json(
    {
      success: false,
      message,
      ...(errors ? { errors } : {}),
    },
    { status }
  );
}
