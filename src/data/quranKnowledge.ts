
// Knowledge base with information about the Quran extracted from Wikipedia
export const quranKnowledge = {
  general: {
    title: "Quran",
    description: "The Quran, also romanized Qur'an or Koran, is the central religious text of Islam, believed by Muslims to be a revelation directly from God (Allāh). It is organized in 114 chapters (surah, pl. suwer) which consist of individual verses (āyah). Besides its religious significance, it is widely regarded as the finest work in Arabic literature, and has significantly influenced the Arabic language. It is the object of a modern field of academic research known as Quranic studies.",
    revelationPeriod: "Muslims believe the Quran was orally revealed by God to the final Islamic prophet Muhammad through the angel Gabriel incrementally over a period of some 23 years, beginning on the Laylat al-Qadr, when Muhammad was 40, and concluding in 632, the year of his death.",
    significance: "Muslims believe the Quran to be God's literal words, a complete code of life, the final revelation to humanity, a work of divine guidance revealed to Muhammad through the angel Gabriel."
  },
  structure: {
    chapters: "The Quran consists of 114 chapters of varying lengths, known as a sūrah. Each sūrah consists of verses, known as āyāt, which originally means a 'sign' or 'evidence' sent by God.",
    verses: "The total number of verses in the most popular Hafs Quran is 6,236; however, the number varies if the bismillahs are counted separately. According to one estimate the Quran consists of 77,430 words, 18,994 unique words, 12,183 stems, 3,382 lemmas and 1,685 roots.",
    arrangement: "Chapters are classified as Meccan or Medinan, depending on whether the verses were revealed before or after the migration of Muhammad to the city of Medina on traditional account. Sūrah names are derived from a name or a character in the text, or from the first letters or words of the sūrah. Chapters are not arranged in chronological order, rather the chapters appear to be arranged roughly in order of decreasing size."
  },
  history: {
    compilation: "According to Islamic tradition, the Quran was compiled into written form shortly after Muhammad's death in 632 CE. The first caliph, Abu Bakr, ordered the collection of the Quran into a single volume. This process was completed under the third caliph, Uthman, who established a standard version known as the Uthmanic codex around 650 CE.",
    preservation: "Muslims believe that the present Quranic text corresponds to that revealed to Muhammad, and according to their interpretation of Quran 15:9, it is protected from corruption ('Indeed, it is We who sent down the Quran and indeed, We will be its guardians').",
    manuscripts: "Some of the oldest Quranic manuscripts include the Sana'a manuscripts discovered in Yemen in 1972 and the Birmingham Quran manuscript, which according to radiocarbon dating is one of the oldest known Quranic manuscripts, dated to between 568 and 645 CE."
  },
  content: {
    mainThemes: "The central theme of the Quran is monotheism. God is depicted as living, eternal, omniscient and omnipotent. The Quranic content is concerned with basic Islamic beliefs including the existence of God and the resurrection. Narratives of the early prophets, ethical and legal subjects, historical events of Muhammad's time, charity and prayer also appear in the Quran.",
    stories: "The Quran contains stories of many of the people and events recounted in Jewish and Christian sacred books (Tanakh, Bible) and devotional literature (Apocrypha, Midrash), although it differs in many details. Adam, Enoch, Noah, Eber, Shelah, Abraham, Lot, Ishmael, Isaac, Jacob, Joseph, Job, Jethro, David, Solomon, Elijah, Elisha, Jonah, Aaron, Moses, Zechariah, John the Baptist and Jesus are mentioned in the Quran as prophets of God.",
    law: "The Quran is one of the fundamental sources of Islamic law (sharia). Some formal religious practices receive significant attention in the Quran including the salat (prayer) and fasting in the month of Ramadan."
  },
  interpretation: {
    tafsir: "Tafsir refers to an exegesis, or commentary, of the Quran. Principally, a tafsir deals with the issues of linguistics, jurisprudence, and theology. In terms of perspective and approach, tafsir can be broadly divided into two main categories, namely tafsir bi-al-ma'thur (lit. received tafsir), and tafsir bi-al-ra'y (lit. tafsir by opinion).",
    translations: "Translating the Quran has always been problematic and difficult. Many argue that the Quranic text cannot be reproduced in another language or form. An Arabic word may have a range of meanings depending on the context, making an accurate translation difficult.",
    recitation: "The proper recitation of the Quran is the subject of a separate discipline named tajwid which determines in detail how the Quran should be recited, how each individual syllable is to be pronounced, the need to pay attention to the places where there should be a pause, to elisions, where the pronunciation should be long or short, where letters should be sounded together and where they should be kept separate."
  },
  literary: {
    style: "The Quran's message is conveyed with various literary structures and devices. In the original Arabic, the suras and verses employ phonetic and thematic structures that assist the audience's efforts to recall the message of the text. Muslims assert that the Quranic content and style is inimitable.",
    inimitability: "In Islam, 'i'jāz (Arabic: اَلْإِعْجَازُ), 'inimitability challenge' of the Quran in sense of feṣāḥa and belagha (both eloquence and rhetoric) is the doctrine which holds that the Quran has a miraculous quality, both in content and in form, that no human speech can match."
  },
  culturalImpact: {
    art: "The Quran also inspired Islamic arts and specifically the so-called Quranic arts of calligraphy and illumination. The Quran is never decorated with figurative images, but many Qurans have been highly decorated with decorative patterns in the margins of the page, or between the lines or at the start of suras.",
    influence: "After the Quran, and the general rise of Islam, the Arabic alphabet developed rapidly into an art form. The Quran exerted a particular influence on Arabic literature's diction, themes, metaphors, motifs and symbols and added new expressions and new meanings to old, pre-Islamic words that would become ubiquitous."
  }
};

// Helper function to search through the knowledge base
export const searchQuranKnowledge = (query: string): string => {
  const lowerQuery = query.toLowerCase();
  let result = '';
  
  // Search through general information
  if (
    lowerQuery.includes('what is quran') || 
    lowerQuery.includes('about quran') ||
    lowerQuery.includes('definition of quran')
  ) {
    result = quranKnowledge.general.description;
  }
  
  // Search for structure information
  else if (
    lowerQuery.includes('structure') || 
    lowerQuery.includes('chapters') || 
    lowerQuery.includes('verses') || 
    lowerQuery.includes('surah') ||
    lowerQuery.includes('ayat')
  ) {
    result = `${quranKnowledge.structure.chapters} ${quranKnowledge.structure.verses} ${quranKnowledge.structure.arrangement}`;
  }
  
  // Search for history information
  else if (
    lowerQuery.includes('history') || 
    lowerQuery.includes('compilation') || 
    lowerQuery.includes('preservation') ||
    lowerQuery.includes('manuscript') ||
    lowerQuery.includes('origin')
  ) {
    result = `${quranKnowledge.history.compilation} ${quranKnowledge.history.preservation} ${quranKnowledge.history.manuscripts}`;
  }
  
  // Search for content information
  else if (
    lowerQuery.includes('content') || 
    lowerQuery.includes('theme') || 
    lowerQuery.includes('stories') ||
    lowerQuery.includes('message')
  ) {
    result = `${quranKnowledge.content.mainThemes} ${quranKnowledge.content.stories}`;
  }
  
  // Search for interpretation information
  else if (
    lowerQuery.includes('interpretation') || 
    lowerQuery.includes('tafsir') || 
    lowerQuery.includes('translation') ||
    lowerQuery.includes('recitation') ||
    lowerQuery.includes('tajwid')
  ) {
    result = `${quranKnowledge.interpretation.tafsir} ${quranKnowledge.interpretation.translations} ${quranKnowledge.interpretation.recitation}`;
  }
  
  // Search for literary aspects
  else if (
    lowerQuery.includes('literary') || 
    lowerQuery.includes('style') || 
    lowerQuery.includes('inimitability') ||
    lowerQuery.includes('miracle') ||
    lowerQuery.includes('i\'jaz')
  ) {
    result = `${quranKnowledge.literary.style} ${quranKnowledge.literary.inimitability}`;
  }
  
  // Search for cultural impact
  else if (
    lowerQuery.includes('art') || 
    lowerQuery.includes('calligraphy') || 
    lowerQuery.includes('influence') ||
    lowerQuery.includes('cultural impact')
  ) {
    result = `${quranKnowledge.culturalImpact.art} ${quranKnowledge.culturalImpact.influence}`;
  }
  
  return result || "I have information about the Quran's structure, history, content, interpretation, literary aspects, and cultural impact. Could you please ask a more specific question about any of these topics?";
};
