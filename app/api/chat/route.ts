import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { message } = await req.json();

  if (!message) {
    return NextResponse.json({ error: 'Message is required' }, { status: 400 });
  }

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`, // لاحظ غيرنا المفتاح هنا
        'HTTP-Referer': 'https://your-website.com', // هنا ضع رابط موقعك
        'X-Title': 'Real Estate Assistant', // اسم مشروعك اللي هيظهر في openrouter dashboard
      },
      body: JSON.stringify({
        model: 'openai/gpt-3.5-turbo', // موديل مجاني وسريع ومتاح
        messages: [
          { role: 'system', content: 'You are a helpful real estate assistant that helps users with property offers, auctions, and evaluations.' },
          { role: 'user', content: message },
        ],
        temperature: 0.5,
        max_tokens: 500,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('OpenRouter API Error:', data);
      return NextResponse.json({ error: 'Failed to fetch AI response' }, { status: 500 });
    }

    const reply = data.choices?.[0]?.message?.content || 'Sorry, I did not understand.';

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Server Error:', error);
    return NextResponse.json({ error: 'Failed to get AI response' }, { status: 500 });
  }
}
