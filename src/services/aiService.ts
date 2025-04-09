
// This is a mock service for the Gemini API
// In a real implementation, you would integrate with the actual Gemini API

import { searchQuranKnowledge } from '@/data/quranKnowledge';

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
        content: "I apologize, but I can only answer questions related to Islam, the Quran, Hadith, Prophets, and Islamic rulings. Please ask me something about Islamic teachings, history, or practices, and I'll be happy to assist you."
      }
    };
  }

  // For demo purposes, return a response based on the question
  // First check if it's a Quran question that can be answered from our knowledge base
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

  // Add responses for prophets
  if (lastMessage.includes('prophet') || lastMessage.includes('prophets')) {
    if (lastMessage.includes('muhammad')) {
      return {
        message: {
          role: 'assistant',
          content: "Prophet Muhammad (peace be upon him) is the last and final prophet in Islam. Born in Mecca around 570 CE, he received his first revelation at age 40 from Angel Gabriel in the Cave of Hira. Over 23 years, he received the Quran and established the Islamic community. His life, documented in the Seerah and Hadith, serves as an example for Muslims to follow. He passed away in 632 CE in Medina after completing his mission of delivering Allah's message to humanity."
        }
      };
    }
    
    if (lastMessage.includes('jesus') || lastMessage.includes('isa')) {
      return {
        message: {
          role: 'assistant',
          content: "In Islam, Prophet Isa (Jesus, peace be upon him) is one of the mightiest messengers of Allah. Muslims believe he was born miraculously to the Virgin Mary (Maryam) and performed miracles by Allah's permission. The Quran affirms his prophethood and the Gospel (Injil) revealed to him. However, Muslims do not believe in his divinity or crucifixion; instead, the Quran states Allah raised him to Heaven, and he will return before the Day of Judgment. He is mentioned 25 times in the Quran, more than any other prophet."
        }
      };
    }
    
    if (lastMessage.includes('moses') || lastMessage.includes('musa')) {
      return {
        message: {
          role: 'assistant',
          content: "Prophet Musa (Moses, peace be upon him) is one of the greatest prophets in Islam. The Quran narrates his life extensively, including his birth during Pharaoh's persecution of the Israelites, his upbringing in Pharaoh's household, his escape to Madyan, and his return to Egypt with the mission to free the Israelites. He received the Torah (Tawrat) from Allah on Mount Sinai and is known for his direct communication with Allah, hence his title 'Kaleemullah' (the one who spoke with Allah). His story teaches patience, faith, and perseverance."
        }
      };
    }
    
    return {
      message: {
        role: 'assistant',
        content: "Islam recognizes many prophets sent by Allah throughout history to guide humanity. Muslims believe in all prophets mentioned in the Quran, including Adam, Nuh (Noah), Ibrahim (Abraham), Ismail (Ishmael), Ishaq (Isaac), Yaqub (Jacob), Yusuf (Joseph), Musa (Moses), Dawud (David), Sulaiman (Solomon), Isa (Jesus), and Muhammad (peace be upon them all). The Quran mentions 25 prophets by name, but Islamic tradition holds that Allah sent 124,000 prophets to various civilizations throughout history. All prophets conveyed the same essential message of monotheism (Tawhid) and moral guidance, although their specific laws may have differed according to the needs of their time and people."
      }
    };
  }

  // Add responses for halal/haram questions
  if (lastMessage.includes('halal') || lastMessage.includes('haram') || lastMessage.includes('permitted') || lastMessage.includes('forbidden')) {
    if (lastMessage.includes('food') || lastMessage.includes('eat') || lastMessage.includes('meat')) {
      return {
        message: {
          role: 'assistant',
          content: "In Islam, halal food refers to what is permissible to eat according to Islamic law. Generally, all foods are considered halal except those specifically prohibited in the Quran or Hadith. Haram (forbidden) foods include pork and its derivatives, animals not slaughtered according to Islamic guidelines, blood, carrion, and animals sacrificed to other than Allah. For meat to be halal, the animal must be slaughtered by a Muslim who invokes Allah's name while cutting the throat of the animal, allowing blood to drain. Seafood is generally considered halal, though there are differing opinions among scholars regarding certain types. Regarding processed foods, Muslims should check for halal certification or verify that no haram ingredients are used."
        }
      };
    }
    
    if (lastMessage.includes('business') || lastMessage.includes('finance') || lastMessage.includes('interest') || lastMessage.includes('riba')) {
      return {
        message: {
          role: 'assistant',
          content: "In Islamic finance, certain practices are clearly defined as halal (permissible) or haram (forbidden). Riba (interest) is strictly prohibited in the Quran and Hadith, making conventional loans with interest haram. Gharar (excessive uncertainty or speculation) and Maysir (gambling) are also forbidden. Halal financial practices include profit-and-loss sharing arrangements like Mudarabah (partnership) and Musharakah (joint venture), as well as sales-based financing like Murabaha (cost-plus financing) and Ijarah (leasing). Muslims are encouraged to engage in ethical trade and investment, avoiding industries involving alcohol, pork, inappropriate entertainment, or conventional banking. Islamic banks offer alternatives that comply with Shariah principles for various financial needs."
        }
      };
    }
    
    return {
      message: {
        role: 'assistant',
        content: "In Islam, actions and items are categorized as halal (permissible) or haram (forbidden) based on guidance from the Quran and Sunnah. This binary system helps Muslims navigate daily choices according to Allah's commands. Beyond these categories are also makruh (disliked but not forbidden) and mustahabb (recommended but not obligatory) actions. The determination of what is halal or haram comes directly from Islamic texts, and where not explicitly mentioned, scholars apply principles like necessity, public interest, and harm prevention to derive rulings. Islamic jurisprudence acknowledges exceptions to haram rulings in cases of necessity (darura) to preserve life. Muslims are advised to avoid doubtful matters and seek knowledge from qualified Islamic scholars for specific rulings on contemporary issues not directly addressed in primary sources."
      }
    };
  }

  // Default response
  return {
    message: {
      role: 'assistant',
      content: "As an Islamic knowledge assistant, I'm here to help answer your questions about the Quran, Hadith, Islamic history, prophets, Islamic rulings (halal/haram), practices, and teachings. Please feel free to ask more specific questions so I can provide you with accurate and helpful information based on authentic Islamic sources."
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
