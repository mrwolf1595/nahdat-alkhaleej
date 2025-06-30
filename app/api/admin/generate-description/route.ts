import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { title, location, area, price, bedrooms, bathrooms, amenities } = await req.json()

  if (!title || !location || !area || !price) {
    return NextResponse.json({ error: 'البيانات غير مكتملة' }, { status: 400 })
  }

  const prompt = `
اكتب وصفًا عقاريًا احترافيًا وجذابًا باللغة العربية بناءً على التفاصيل التالية:
- اسم العقار: ${title}
- الموقع: ${location}
- المساحة: ${area} متر مربع
- السعر: ${price} ريال سعودي
- عدد الغرف: ${bedrooms}
- عدد الحمامات: ${bathrooms}
- المميزات: ${amenities?.join(', ') || 'لا توجد'}

اكتب النص بأسلوب تسويقي احترافي في أقل من 400 كلمة.`

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.Description_gen_key}`,
        'HTTP-Referer': 'https://nahdat-alkhaleej.com',
        'X-Title': 'Nahdat Alkhaleej AI Writer',
      },
      body: JSON.stringify({
        model: 'openai/gpt-3.5-turbo',

        messages: [{ role: 'user', content: prompt }],
      }),
    })

    const result = await response.json()
    console.log('🧠 AI raw result:', result); // أضف هذا السطر
    const message = result.choices?.[0]?.message?.content
    return NextResponse.json({ description: message })
  } catch (err) {
    console.error('خطأ في التوليد:', err)
    return NextResponse.json({ error: 'فشل في توليد الوصف' }, { status: 500 })
  }
}
