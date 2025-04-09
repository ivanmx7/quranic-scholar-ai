import { searchQuranKnowledge } from '@/data/quranKnowledge';
import { generateGeminiResponse } from './geminiService';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface ChatResponse {
  message: Message;
  conversationId?: string;
}

export const sendChatMessage = async (
  messages: Message[],
  apiKey?: string
): Promise<ChatResponse> => {
  try {
    // First check if this is an Islamic question
    const lastMessage = messages[messages.length - 1].content.toLowerCase();
    
    if (!isIslamicQuestion(lastMessage)) {
      return {
        message: {
          role: 'assistant',
          content: "I apologize, but I can only answer questions related to Islam, the Quran, Hadith, Prophets, and Islamic rulings. Please ask me something about Islamic teachings, history, or practices, and I'll be happy to assist you."
        }
      };
    }

    // For Quran-specific questions, check our local knowledge base first
    if (lastMessage.includes('quran')) {
      const quranInfo = searchQuranKnowledge(lastMessage);
      if (quranInfo) {
        return {
          message: {
            role: 'assistant',
            content: quranInfo
          }
        };
      }
    }
    
    // For all other Islamic questions, use the Gemini API
    try {
      // Add a system message if not present
      if (!messages.some(msg => msg.role === 'system')) {
        messages = [
          {
            role: 'system',
            content: "You are QuranGPT, an AI assistant specialized in Islamic knowledge. You provide accurate information about the Quran, Hadith, Islamic history, prophets, and Islamic practices. Only answer questions related to Islam. Keep your responses respectful, accurate, and based on authentic Islamic sources. If you don't know something, acknowledge it rather than making up information."
          },
          ...messages
        ];
      }
      
      return await generateGeminiResponse(messages);
    } catch (error) {
      console.error("Error with Gemini API:", error);
      // Fallback to simple responses if the API fails
      return getFallbackResponse(lastMessage);
    }
  } catch (error) {
    console.error("Error in sendChatMessage:", error);
    return {
      message: {
        role: 'assistant',
        content: "I apologize, but I encountered an error. Please try again later."
      }
    };
  }
};

// Simple function to check if a question is related to Islam
function isIslamicQuestion(question: string): boolean {
  const islamicKeywords = [
    'islam', 'muslim', 'quran', 'hadith', 'prophet', 'muhammad', 'allah', 'mosque', 'masjid',
    'prayer', 'salat', 'salah', 'zakat', 'hajj', 'umrah', 'ramadan', 'eid', 'fasting', 'sawm',
    'sunnah', 'sharia', 'halal', 'haram', 'imam', 'sheikh', 'ayat', 'surah', 'jannah', 'jahannam',
    'dua', 'dhikr', 'tawhid', 'shirk', 'iman', 'kufr', 'jihad', 'mecca', 'medina', 'kaaba',
    'asr', 'maghrib', 'isha', 'fajr', 'zuhr', 'wudu', 'tayammum', 'shahada', 'seerah',
    'sahabah', 'caliph', 'ummah', 'shariah', 'madhhab', 'fiqh', 'tafseer', 'tajweed',
    'istighfar', 'subhanallah', 'alhamdulillah', 'allahu akbar', 'permitted', 'forbidden',
    'jesus', 'isa', 'moses', 'musa', 'noah', 'nuh', 'abraham', 'ibrahim', 'adam', 'solomon',
    'sulaiman', 'david', 'dawud', 'joseph', 'yusuf', 'riba', 'interest'
  ];

  // If it's a greeting or very short message, assume it's allowed
  if (question.length < 15) return true;

  // Check if any Islamic keyword is present
  for (const keyword of islamicKeywords) {
    if (question.includes(keyword)) {
      return true;
    }
  }

  // If no Islamic keywords are found and it's not a short greeting
  return false;
}

// Fallback responses in case the API fails
function getFallbackResponse(message: string): ChatResponse {
  if (message.includes('hadith')) {
    return {
      message: {
        role: 'assistant',
        content: "Hadith are the collected sayings, actions, and silent approvals of the Prophet Muhammad (peace be upon him). They are second only to the Quran in terms of authority in Islamic law and practice. The most authentic collections of Hadith are Sahih al-Bukhari and Sahih Muslim, followed by the four Sunan works (Abu Dawud, al-Tirmidhi, al-Nasa'i, and Ibn Majah). These collections were compiled in the 9th century CE, about 200-250 years after the Prophet's death."
      }
    };
  }

  if (message.includes('pillars') || message.includes('pillar of islam')) {
    return {
      message: {
        role: 'assistant',
        content: "The Five Pillars of Islam are the five basic acts of worship that are considered obligatory for all Muslims. They are:\n\n1. Shahada (Faith): The declaration of faith - 'There is no god but Allah, and Muhammad is the messenger of Allah'\n\n2. Salat (Prayer): Performing ritual prayers five times each day\n\n3. Zakat (Charity): Giving 2.5% of one's savings to the poor and needy\n\n4. Sawm (Fasting): Fasting during the month of Ramadan\n\n5. Hajj (Pilgrimage): Pilgrimage to Mecca at least once in a lifetime if physically and financially able"
      }
    };
  }

  // Default fallback response
  return {
    message: {
      role: 'assistant',
      content: "As an Islamic knowledge assistant, I'm here to help answer your questions about the Quran, Hadith, Islamic history, prophets, Islamic rulings, practices, and teachings. Please feel free to ask more specific questions so I can provide you with accurate information based on authentic Islamic sources."
    }
  };
}
