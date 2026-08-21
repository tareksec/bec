import { NextResponse } from 'next/server'
import { getMediumPosts } from '@/lib/medium'

export async function GET() {
  return NextResponse.json(await getMediumPosts())
}