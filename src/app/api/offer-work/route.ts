// import { NextResponse } from 'next/server';
// import axios from 'axios';

// export async function POST(request: Request) {
//   try {
//     // FormData ni qabul qilish
//     const formData = await request.formData();

//     // FormData dan maydonlarni olish
//     const contactPerson = formData.get('contactPerson') as string;
//     const phone = formData.get('phone') as string;
//     const location = formData.get('location') as string;
//     const workTitle = formData.get('workTitle') as string;
//     const definition = formData.get('definition') as string;
//     const activeTopButton = formData.get('activeTopButton') as string;
//     const activeBottomButton = formData.get('activeBottomButton') as string;
//     const priceFrom = formData.get('priceFrom') as string;
//     const currency = formData.get('currency') as string;
//     const selectedCategories = formData.get('selectedCategories') as string;
//     const dateFrom = formData.get('dateFrom') as string;
//     const dateTo = formData.get('dateTo') as string;
//     const files = formData.getAll('files[]'); // Fayllarni massiv sifatida olish

//     // Validatsiya
//     if (!contactPerson || !phone || !location || !workTitle || !definition || !activeTopButton || !activeBottomButton || !priceFrom || !currency || !selectedCategories) {
//       return NextResponse.json(
//         { success: false, error: 'Barcha majburiy maydonlarni to‘ldiring' },
//         { status: 400 }
//       );
//     }

//     // Backend uchun FormData yaratish
//     const backendFormData = new FormData();
//     backendFormData.append('contact_person', contactPerson);
//     backendFormData.append('phone', phone);
//     backendFormData.append('location', location);
//     backendFormData.append('work_title', workTitle);
//     backendFormData.append('definition', definition);
//     backendFormData.append('active_top_button', activeTopButton);
//     backendFormData.append('payment_type', activeBottomButton); // Backend maydoniga moslashtirildi
//     backendFormData.append('price_from', priceFrom);
//     backendFormData.append('currency', currency);
//     backendFormData.append('categories', selectedCategories); // JSON string sifatida
//     if (dateFrom) backendFormData.append('date_from', dateFrom);
//     if (dateTo) backendFormData.append('date_to', dateTo);
//     files.forEach((file, index) => backendFormData.append(`files[${index}]`, file));


//     // Backend’ga so‘rov yuborish
//     const response = await axios.post(
//       `${process.env.NEXT_PUBLIC_BASE_URL}api/v1/offers`, // Endpoint /offers sifatida yangilandi
//       backendFormData,
//       {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       }
//     );

//     return NextResponse.json({ success: true, data: response.data }, { status: response.status });
//   } catch (error: any) {
//     console.error('Error submitting offer:', error.message, error.response?.data || {});
//     return NextResponse.json(
//       { success: false, error: error.response?.data?.detail || 'Internal Server Error' },
//       { status: error.response?.status || 500 }
//     );
//   }
// }