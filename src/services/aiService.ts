
// This is a mock service for the Gemini API
// In a real implementation, you would integrate with the actual Gemini API

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface ChatResponse {
  message: Message;
  conversationId?: string;
}

// Mock response function - would be replaced with actual API call
export const sendChatMessage = async (
  messages: Message[],
  apiKey?: string
): Promise<ChatResponse> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Check if this is an Islamic question
  const lastMessage = messages[messages.length - 1].content.toLowerCase();
  
  if (!isIslamicQuestion(lastMessage)) {
    return {
      message: {
        role: 'assistant',
        content: "I apologize, but I can only answer questions related to Islam, the Quran, and Hadith. Please ask me something about Islamic teachings, history, or practices, and I'll be happy to assist you."
      }
    };
  }

  // For demo purposes, return a hardcoded response based on the question
  if (lastMessage.includes('quran')) {
    return {
      message: {
        role: 'assistant',
        content: "The Holy Quran is the central religious text of Islam. Muslims believe it was revealed by Allah (God) to the Prophet Muhammad through the angel Gabriel over a period of approximately 23 years, beginning in 610 CE when Muhammad was 40, and concluding in 632 CE, the year of his death. The Quran consists of 114 chapters (surahs) which contain a total of 6,236 verses (ayat). It is regarded by Muslims as the main miracle of Muhammad, as proof of his prophethood, and as the culmination of a series of divine messages."
      }
    };
  }

  if (lastMessage.includes('hadith')) {
    return {
      message: {
        role: 'assistant',
        content: "Hadith are the collected sayings, actions, and silent approvals of the Prophet Muhammad (peace be upon him). They are second only to the Quran in terms of authority in Islamic law and practice. The most authentic collections of Hadith are Sahih al-Bukhari and Sahih Muslim, followed by the four Sunan works (Abu Dawud, al-Tirmidhi, al-Nasa'i, and Ibn Majah). These collections were compiled in the 9th century CE, about 200-250 years after the Prophet's death."
      }
    };
  }

  if (lastMessage.includes('pillars') || lastMessage.includes('pillar of islam')) {
    return {
      message: {
        role: 'assistant',
        content: "The Five Pillars of Islam are the five basic acts of worship that are considered obligatory for all Muslims. They are:\n\n1. Shahada (Faith): The declaration of faith - 'There is no god but Allah, and Muhammad is the messenger of Allah'\n\n2. Salat (Prayer): Performing ritual prayers five times each day\n\n3. Zakat (Charity): Giving 2.5% of one's savings to the poor and needy\n\n4. Sawm (Fasting): Fasting during the month of Ramadan\n\n5. Hajj (Pilgrimage): Pilgrimage to Mecca at least once in a lifetime if physically and financially able"
      }
    };
  }

  // Default response
  return {
    message: {
      role: 'assistant',
      content: "As an Islamic knowledge assistant, I'm here to help answer your questions about the Quran, Hadith, Islamic history, practices, and teachings. Please feel free to ask more specific questions so I can provide you with accurate and helpful information based on authentic Islamic sources."
    }
  };
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
    'istighfar', 'subhanallah', 'alhamdulillah', 'allahu akbar'
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
