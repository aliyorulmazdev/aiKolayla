"use server";

import OpenAI from "openai";
import prisma from "./db";
import { revalidatePath } from "next/cache";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const generateChatResponse = async (chatMessages) => {
  try {
    const response = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "you are a helpful assistant" },
        ...chatMessages,
      ],
      model: "gpt-3.5-turbo",
      temperature: 0,
      max_tokens: 100,
    });
    return {
      message: response.choices[0].message,
      tokens: response.usage.total_tokens,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const generateTourResponse = async ({ city, country }) => {
  const query = `Tam olarak ${country} içinde bu ${city}'yi bulun.
  Eğer ${city} ve ${country} varsa, ailelerin bu ${city},${country}'de yapabileceği şeylerin bir listesini oluşturun. 
  Bir liste oluşturduktan sonra, bir günlük tur oluşturun. Yanıt aşağıdaki JSON formatında olmalıdır: 
  {
    "tour": {
      "city": "${city}",
      "country": "${country}",
      "title": "turun başlığı",
      "description": "şehir ve tur hakkında kısa açıklama",
      "stops": ["durağın adı", "durağın adı", "durağın adı"]
    }
  }
  "stops" özelliği sadece üç durağı içermelidir.
  Eğer tam olarak ${city} hakkında bilgi bulamazsanız, veya ${city} yoksa, veya nüfusu 1'den azsa, veya belirtilen ${country}'de bulunmuyorsa, ek karakter olmadan { "tour": null } döndürün.`;
  try {
    const response = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "you are a tour guide" },
        {
          role: "user",
          content: query,
        },
      ],
      model: "gpt-3.5-turbo",
      temperature: 0,
    });

    const tourData = JSON.parse(response.choices[0].message.content);
    if (!tourData.tour) {
      return null;
    }
    return { tour: tourData.tour, tokens: response.usage.total_tokens };
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getExistingTour = async ({ city, country }) => {
  return prisma.tour.findUnique({
    where: {
      city_country: {
        city,
        country,
      },
    },
  });
};

export const createNewTour = async (tour) => {
  return prisma.tour.create({
    data: tour,
  });
};

export const getAllTours = async (searchTerm) => {
  if (!searchTerm) {
    const tours = await prisma.tour.findMany({
      orderBy: {
        city: "asc",
      },
    });

    return tours;
  }

  const tours = await prisma.tour.findMany({
    where: {
      OR: [
        {
          city: {
            contains: searchTerm,
          },
        },
        {
          country: {
            contains: searchTerm,
          },
        },
      ],
    },
    orderBy: {
      city: "asc",
    },
  });
  return tours;
};

export const getSingleTour = async (id) => {
  return prisma.tour.findUnique({
    where: {
      id,
    },
  });
};

export const fetchUserTokensById = async (clerkId) => {
  const result = await prisma.token.findUnique({
    where: {
      clerkId,
    },
  });

  return result?.tokens;
};

export const generateUserTokensForId = async (clerkId) => {
  const result = await prisma.token.create({
    data: {
      clerkId,
    },
  });
  return result?.tokens;
};

export const fetchOrGenerateTokens = async (clerkId) => {
  const result = await fetchUserTokensById(clerkId);
  if (result) {
    return result.tokens;
  }
  return (await generateUserTokensForId(clerkId)).tokens;
};

export const subtractTokens = async (clerkId, tokens) => {
  const result = await prisma.token.update({
    where: {
      clerkId,
    },
    data: {
      tokens: {
        decrement: tokens,
      },
    },
  });
  revalidatePath("/profile");
  // Return the new token value
  return result.tokens;
};
