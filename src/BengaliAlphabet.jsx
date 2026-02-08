import React, { useState, useEffect } from 'react';
import './App.css';

const bengaliAlphabetData = [
  // Independent Vowels (স্বরবর্ণ - Shoroborno)
  {
    letter: 'অ',
    name: 'অ',
    nameRoman: 'ô',
    type: 'Vowel',
    pronunciation: 'o (as in "go")',
    exampleWord: 'অম',
    exampleRoman: 'om',
    exampleMeaning: 'mango'
  },
  {
    letter: 'আ',
    name: 'আ',
    nameRoman: 'a',
    type: 'Vowel',
    pronunciation: 'aa (as in "father")',
    exampleWord: 'আম',
    exampleRoman: 'aam',
    exampleMeaning: 'mango'
  },
  {
    letter: 'ই',
    name: 'ই',
    nameRoman: 'i',
    type: 'Vowel',
    pronunciation: 'i (as in "sit")',
    exampleWord: 'ইট',
    exampleRoman: 'iṭ',
    exampleMeaning: 'brick'
  },
  {
    letter: 'ঈ',
    name: 'ঈ',
    nameRoman: 'ī',
    type: 'Vowel',
    pronunciation: 'ee (as in "see")',
    exampleWord: 'ঈগল',
    exampleRoman: 'īgol',
    exampleMeaning: 'eagle'
  },
  {
    letter: 'উ',
    name: 'উ',
    nameRoman: 'u',
    type: 'Vowel',
    pronunciation: 'u (as in "put")',
    exampleWord: 'উট',
    exampleRoman: 'uṭ',
    exampleMeaning: 'camel'
  },
  {
    letter: 'ঊ',
    name: 'ঊ',
    nameRoman: 'ū',
    type: 'Vowel',
    pronunciation: 'oo (as in "food")',
    exampleWord: 'ঊষা',
    exampleRoman: 'ūṣa',
    exampleMeaning: 'dawn'
  },
  {
    letter: 'ঋ',
    name: 'ঋ',
    nameRoman: 'ri',
    type: 'Vowel',
    pronunciation: 'ri (as in "creek")',
    exampleWord: 'ঋতু',
    exampleRoman: 'ritu',
    exampleMeaning: 'season'
  },
  {
    letter: 'এ',
    name: 'এ',
    nameRoman: 'e',
    type: 'Vowel',
    pronunciation: 'e (as in "bed")',
    exampleWord: 'এক',
    exampleRoman: 'ek',
    exampleMeaning: 'one'
  },
  {
    letter: 'ঐ',
    name: 'ঐ',
    nameRoman: 'oi',
    type: 'Vowel',
    pronunciation: 'oi (as in "oil")',
    exampleWord: 'ঐক্য',
    exampleRoman: 'oikko',
    exampleMeaning: 'unity'
  },
  {
    letter: 'ও',
    name: 'ও',
    nameRoman: 'o',
    type: 'Vowel',
    pronunciation: 'o (as in "go")',
    exampleWord: 'ওল',
    exampleRoman: 'ol',
    exampleMeaning: 'yam'
  },
  {
    letter: 'ঔ',
    name: 'ঔ',
    nameRoman: 'ou',
    type: 'Vowel',
    pronunciation: 'ou (as in "ouch")',
    exampleWord: 'ঔষধ',
    exampleRoman: 'ouṣodh',
    exampleMeaning: 'medicine'
  },

  // Consonants (ব্যঞ্জনবর্ণ - Benjonborno)
  // Velar consonants
  {
    letter: 'ক',
    name: 'ক',
    nameRoman: 'kô',
    type: 'Consonant (velar)',
    pronunciation: 'k (as in "kite")',
    exampleWord: 'কলম',
    exampleRoman: 'kolom',
    exampleMeaning: 'pen'
  },
  {
    letter: 'খ',
    name: 'খ',
    nameRoman: 'khô',
    type: 'Consonant (velar)',
    pronunciation: 'kh (aspirated k)',
    exampleWord: 'খবর',
    exampleRoman: 'khobor',
    exampleMeaning: 'news'
  },
  {
    letter: 'গ',
    name: 'গ',
    nameRoman: 'gô',
    type: 'Consonant (velar)',
    pronunciation: 'g (as in "go")',
    exampleWord: 'গান',
    exampleRoman: 'gan',
    exampleMeaning: 'song'
  },
  {
    letter: 'ঘ',
    name: 'ঘ',
    nameRoman: 'ghô',
    type: 'Consonant (velar)',
    pronunciation: 'gh (aspirated g)',
    exampleWord: 'ঘর',
    exampleRoman: 'ghor',
    exampleMeaning: 'house'
  },
  {
    letter: 'ঙ',
    name: 'ঙ',
    nameRoman: 'ṅô',
    type: 'Consonant (velar nasal)',
    pronunciation: 'ng (as in "sing")',
    exampleWord: 'অঙ্ক',
    exampleRoman: 'ôngko',
    exampleMeaning: 'mathematics'
  },

  // Palatal consonants
  {
    letter: 'চ',
    name: 'চ',
    nameRoman: 'chô',
    type: 'Consonant (palatal)',
    pronunciation: 'ch (as in "church")',
    exampleWord: 'চা',
    exampleRoman: 'cha',
    exampleMeaning: 'tea'
  },
  {
    letter: 'ছ',
    name: 'ছ',
    nameRoman: 'chhô',
    type: 'Consonant (palatal)',
    pronunciation: 'chh (aspirated ch)',
    exampleWord: 'ছবি',
    exampleRoman: 'chhobi',
    exampleMeaning: 'picture'
  },
  {
    letter: 'জ',
    name: 'জ',
    nameRoman: 'jô',
    type: 'Consonant (palatal)',
    pronunciation: 'j (as in "jump")',
    exampleWord: 'জল',
    exampleRoman: 'jol',
    exampleMeaning: 'water'
  },
  {
    letter: 'ঝ',
    name: 'ঝ',
    nameRoman: 'jhô',
    type: 'Consonant (palatal)',
    pronunciation: 'jh (aspirated j)',
    exampleWord: 'ঝর',
    exampleRoman: 'jhor',
    exampleMeaning: 'waterfall'
  },
  {
    letter: 'ঞ',
    name: 'ঞ',
    nameRoman: 'ñô',
    type: 'Consonant (palatal nasal)',
    pronunciation: 'ny (as in "canyon")',
    exampleWord: 'জ্ঞান',
    exampleRoman: 'gyaan',
    exampleMeaning: 'knowledge'
  },

  // Retroflex consonants
  {
    letter: 'ট',
    name: 'ট',
    nameRoman: 'ṭô',
    type: 'Consonant (retroflex)',
    pronunciation: 't (hard, tongue curled back)',
    exampleWord: 'টাকা',
    exampleRoman: 'ṭaka',
    exampleMeaning: 'money'
  },
  {
    letter: 'ঠ',
    name: 'ঠ',
    nameRoman: 'ṭhô',
    type: 'Consonant (retroflex)',
    pronunciation: 'th (aspirated hard t)',
    exampleWord: 'ঠিক',
    exampleRoman: 'ṭhik',
    exampleMeaning: 'correct'
  },
  {
    letter: 'ড',
    name: 'ড',
    nameRoman: 'ḍô',
    type: 'Consonant (retroflex)',
    pronunciation: 'd (hard, tongue curled back)',
    exampleWord: 'ডাক',
    exampleRoman: 'ḍak',
    exampleMeaning: 'call'
  },
  {
    letter: 'ঢ',
    name: 'ঢ',
    nameRoman: 'ḍhô',
    type: 'Consonant (retroflex)',
    pronunciation: 'dh (aspirated hard d)',
    exampleWord: 'ঢাকা',
    exampleRoman: 'ḍhaka',
    exampleMeaning: 'Dhaka (capital)'
  },
  {
    letter: 'ণ',
    name: 'ণ',
    nameRoman: 'ṇô',
    type: 'Consonant (retroflex nasal)',
    pronunciation: 'n (retroflex)',
    exampleWord: 'গুণ',
    exampleRoman: 'guṇ',
    exampleMeaning: 'quality'
  },

  // Dental consonants
  {
    letter: 'ত',
    name: 'ত',
    nameRoman: 'tô',
    type: 'Consonant (dental)',
    pronunciation: 't (soft, tongue on teeth)',
    exampleWord: 'তারা',
    exampleRoman: 'tara',
    exampleMeaning: 'star'
  },
  {
    letter: 'থ',
    name: 'থ',
    nameRoman: 'thô',
    type: 'Consonant (dental)',
    pronunciation: 'th (aspirated soft t)',
    exampleWord: 'থালা',
    exampleRoman: 'thala',
    exampleMeaning: 'plate'
  },
  {
    letter: 'দ',
    name: 'দ',
    nameRoman: 'dô',
    type: 'Consonant (dental)',
    pronunciation: 'd (soft, tongue on teeth)',
    exampleWord: 'দাম',
    exampleRoman: 'dam',
    exampleMeaning: 'price'
  },
  {
    letter: 'ধ',
    name: 'ধ',
    nameRoman: 'dhô',
    type: 'Consonant (dental)',
    pronunciation: 'dh (aspirated soft d)',
    exampleWord: 'ধন',
    exampleRoman: 'dhon',
    exampleMeaning: 'wealth'
  },
  {
    letter: 'ন',
    name: 'ন',
    nameRoman: 'nô',
    type: 'Consonant (dental nasal)',
    pronunciation: 'n (as in "nose")',
    exampleWord: 'নাম',
    exampleRoman: 'nam',
    exampleMeaning: 'name'
  },

  // Labial consonants
  {
    letter: 'প',
    name: 'প',
    nameRoman: 'pô',
    type: 'Consonant (labial)',
    pronunciation: 'p (as in "pen")',
    exampleWord: 'পাতা',
    exampleRoman: 'pata',
    exampleMeaning: 'leaf'
  },
  {
    letter: 'ফ',
    name: 'ফ',
    nameRoman: 'phô',
    type: 'Consonant (labial)',
    pronunciation: 'ph (aspirated p)',
    exampleWord: 'ফল',
    exampleRoman: 'phol',
    exampleMeaning: 'fruit'
  },
  {
    letter: 'ব',
    name: 'ব',
    nameRoman: 'bô',
    type: 'Consonant (labial)',
    pronunciation: 'b (as in "book")',
    exampleWord: 'বই',
    exampleRoman: 'boi',
    exampleMeaning: 'book'
  },
  {
    letter: 'ভ',
    name: 'ভ',
    nameRoman: 'bhô',
    type: 'Consonant (labial)',
    pronunciation: 'bh (aspirated b)',
    exampleWord: 'ভাত',
    exampleRoman: 'bhat',
    exampleMeaning: 'rice'
  },
  {
    letter: 'ম',
    name: 'ম',
    nameRoman: 'mô',
    type: 'Consonant (labial nasal)',
    pronunciation: 'm (as in "mother")',
    exampleWord: 'মা',
    exampleRoman: 'ma',
    exampleMeaning: 'mother'
  },

  // Approximants and others
  {
    letter: 'য',
    name: 'য',
    nameRoman: 'jô',
    type: 'Consonant (approximant)',
    pronunciation: 'j (as in "joy")',
    exampleWord: 'যাও',
    exampleRoman: 'jao',
    exampleMeaning: 'go'
  },
  {
    letter: 'র',
    name: 'র',
    nameRoman: 'rô',
    type: 'Consonant (liquid)',
    pronunciation: 'r (rolled)',
    exampleWord: 'রং',
    exampleRoman: 'rong',
    exampleMeaning: 'color'
  },
  {
    letter: 'ল',
    name: 'ল',
    nameRoman: 'lô',
    type: 'Consonant (liquid)',
    pronunciation: 'l (as in "love")',
    exampleWord: 'লাল',
    exampleRoman: 'lal',
    exampleMeaning: 'red'
  },
  {
    letter: 'শ',
    name: 'শ',
    nameRoman: 'shô',
    type: 'Consonant (sibilant)',
    pronunciation: 'sh (as in "ship")',
    exampleWord: 'শান্তি',
    exampleRoman: 'shanti',
    exampleMeaning: 'peace'
  },
  {
    letter: 'ষ',
    name: 'ষ',
    nameRoman: 'ṣô',
    type: 'Consonant (sibilant)',
    pronunciation: 'sh (retroflex)',
    exampleWord: 'ষাট',
    exampleRoman: 'ṣaṭ',
    exampleMeaning: 'sixty'
  },
  {
    letter: 'স',
    name: 'স',
    nameRoman: 'sô',
    type: 'Consonant (sibilant)',
    pronunciation: 's (as in "sun")',
    exampleWord: 'সাত',
    exampleRoman: 'sat',
    exampleMeaning: 'seven'
  },
  {
    letter: 'হ',
    name: 'হ',
    nameRoman: 'hô',
    type: 'Consonant (aspirate)',
    pronunciation: 'h (as in "house")',
    exampleWord: 'হাত',
    exampleRoman: 'hat',
    exampleMeaning: 'hand'
  },
  {
    letter: 'ড়',
    name: 'ড়',
    nameRoman: 'ṛô',
    type: 'Consonant (flap)',
    pronunciation: 'r (flapped, like Spanish "pero")',
    exampleWord: 'বড়',
    exampleRoman: 'boṛo',
    exampleMeaning: 'big'
  },
  {
    letter: 'ঢ়',
    name: 'ঢ়',
    nameRoman: 'ṛhô',
    type: 'Consonant (flap)',
    pronunciation: 'rh (aspirated flap)',
    exampleWord: 'গাঢ়',
    exampleRoman: 'gaṛho',
    exampleMeaning: 'deep/thick'
  },
  {
    letter: 'য়',
    name: 'য়',
    nameRoman: 'yô',
    type: 'Consonant (approximant)',
    pronunciation: 'y (as in "yes")',
    exampleWord: 'ময়না',
    exampleRoman: 'moyna',
    exampleMeaning: 'mynah bird'
  },
  {
    letter: 'ৎ',
    name: 'খণ্ড ত',
    nameRoman: 'khôṇḍô tô',
    type: 'Consonant (final form)',
    pronunciation: 't (word-final only)',
    exampleWord: 'রাতৎ',
    exampleRoman: 'ratô',
    exampleMeaning: 'at night'
  },
  {
    letter: 'ং',
    name: 'অনুস্বার',
    nameRoman: 'ônushar',
    type: 'Diacritic (nasal)',
    pronunciation: 'ng/n (nasalization)',
    exampleWord: 'রং',
    exampleRoman: 'rong',
    exampleMeaning: 'color'
  },
  {
    letter: 'ঃ',
    name: 'বিসর্গ',
    nameRoman: 'bisôrgô',
    type: 'Diacritic (aspiration)',
    pronunciation: 'h (final aspiration)',
    exampleWord: 'দুঃখ',
    exampleRoman: 'duḥkho',
    exampleMeaning: 'sorrow'
  },
  {
    letter: '্',
    name: 'হসন্ত',
    nameRoman: 'hôshonto',
    type: 'Diacritic (virama)',
    pronunciation: '(removes inherent vowel)',
    exampleWord: 'স্কুল',
    exampleRoman: 'skul',
    exampleMeaning: 'school'
  }
];

function BengaliAlphabet() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [usedIndices, setUsedIndices] = useState([]);

  const getNextCard = () => {
    let availableIndices = bengaliAlphabetData
      .map((_, index) => index)
      .filter(index => !usedIndices.includes(index));

    if (availableIndices.length === 0) {
      setUsedIndices([]);
      availableIndices = bengaliAlphabetData.map((_, index) => index);
    }

    const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
    setCurrentIndex(randomIndex);
    setUsedIndices([...usedIndices, randomIndex]);
    setIsFlipped(false);
  };

  useEffect(() => {
    getNextCard();
  }, []);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const currentCard = bengaliAlphabetData[currentIndex];

  return (
    <div className="App">
      <header className="App-header">
        <h1>বাংলা বর্ণমালা</h1>
        <h2>Bengali Alphabet Flashcards</h2>
        <p className="instruction">Click the card to flip it</p>
        
        <div className={`flashcard ${isFlipped ? 'flipped' : ''}`} onClick={handleFlip}>
          <div className="flashcard-inner">
            <div className="flashcard-front">
              <div className="bengali-letter">{currentCard.letter}</div>
            </div>
            
            <div className="flashcard-back">
              <div className="letter-details">
                <div className="letter-name">
                  <span className="bengali-text">{currentCard.name}</span>
                  <span className="roman-text"> ({currentCard.nameRoman})</span>
                </div>
                
                <div className="letter-type">{currentCard.type}</div>
                
                <div className="pronunciation">
                  <strong>Pronunciation:</strong> {currentCard.pronunciation}
                </div>
                
                <div className="example-word">
                  <strong>Example:</strong>
                  <div className="example-bengali">{currentCard.exampleWord}</div>
                  <div className="example-details">
                    {currentCard.exampleRoman} - {currentCard.exampleMeaning}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button className="next-button" onClick={getNextCard}>
          Next Letter →
        </button>

        <div className="progress">
          Letter {usedIndices.length} of {bengaliAlphabetData.length}
        </div>
      </header>
    </div>
  );
}

export default BengaliAlphabet;
