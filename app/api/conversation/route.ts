import { OpenAI } from 'openai'
import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'
const openai = new OpenAI({
  apiKey: process.env.CHATGPT_API_KEY,
  baseURL: process.env.CHATGPT_API_URL
})

export async function POST(req: Request) {
  try {
    const { userId } = auth()
    const body = await req.json()
    const { message } = body
    console.log('🚀 ~ POST ~ message:', message)

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    if (!openai.apiKey) {
      return new NextResponse('OpenAI API Key not configured.', { status: 500 })
    }

    if (!message) {
      return new NextResponse('Message are required', { status: 400 })
    }

    const completion = await openai.chat.completions.create({
      messages: message,
      model: 'gpt-3.5-turbo'
    })

    console.log('🚀 ~ POST ~ completion:', completion)
    return NextResponse.json(completion.choices[0].message)
  } catch (error) {
    console.log('🚀 ~ POST ~ error:', error)
    return new NextResponse('Internel error', { status: 500 })
  }
}
