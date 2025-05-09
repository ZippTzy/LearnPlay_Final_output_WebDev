function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function generateMathQuestion(type) {
  let a, b, question, correctAnswer;

  switch (type) {
    case "Addition":
      a = Math.floor(Math.random() * 21);
      b = Math.floor(Math.random() * 21);
      question = `What is ${a} + ${b}?`;
      correctAnswer = a + b;
      break;
    case "Subtraction":
      a = Math.floor(Math.random() * 21);
      b = Math.floor(Math.random() * a);
      question = `What is ${a} - ${b}?`;
      correctAnswer = a - b;
      break;
    case "Multiplication":
      a = Math.floor(Math.random() * 11);
      b = Math.floor(Math.random() * 11);
      question = `What is ${a} x ${b}?`;
      correctAnswer = a * b;
      break;
    case "Division":
      b = Math.floor(Math.random() * 9) + 1;
      correctAnswer = Math.floor(Math.random() * 11);
      a = b * correctAnswer;
      question = `What is ${a} ÷ ${b}?`;
      break;
    default:
      return null;
  }

  const options = new Set([correctAnswer]);
  while (options.size < 4) {
    const wrong = correctAnswer + Math.floor(Math.random() * 11) - 5;
    if (wrong >= 0) options.add(wrong);
  }

  return {
    question,
    correctAnswer: correctAnswer.toString(),
    options: shuffle([...options].map(String)),
  };
}

function generateMathQuestions() {
  const subcategories = [
    "Addition",
    "Subtraction",
    "Multiplication",
    "Division",
  ];
  const questions = {};
  subcategories.forEach((sub) => {
    questions[sub] = Array.from({ length: 10 }, () =>
      generateMathQuestion(sub)
    );
  });
  return questions;
}

const scienceQuestions = {
  Experiments: [
    {
      question: "What tool do you use to measure temperature?",
      correctAnswer: "Thermometer",
      options: ["Thermometer", "Ruler", "Scale", "Clock"],
    },
    {
      question: "What do plants need to grow?",
      correctAnswer: "Sunlight",
      options: ["Sunlight", "Rocks", "Plastic", "Soap"],
    },
    {
      question: "What is the process by which plants make their own food?",
      correctAnswer: "Photosynthesis",
      options: ["Photosynthesis", "Respiration", "Digestion", "Transpiration"],
    },
    {
      question: "What is the force that pulls objects towards the Earth?",
      correctAnswer: "Gravity",
      options: ["Gravity", "Friction", "Inertia", "Magnetism"],
    },
    {
      question: "What is the smallest unit of matter?",
      correctAnswer: "Atom",
      options: ["Atom", "Molecule", "Cell", "Proton"],
    },
    {
      question: "What is the chemical symbol for water?",
      correctAnswer: "H2O",
      options: ["H2O", "CO2", "NaCl", "O2"],
    },
    {
      question: "What type of energy is stored in food?",
      correctAnswer: "Chemical Energy",
      options: [
        "Chemical Energy",
        "Kinetic Energy",
        "Potential Energy",
        "Solar Energy",
      ],
    },
    {
      question:
        "What is the name of the process where water changes from a liquid to a gas?",
      correctAnswer: "Evaporation",
      options: ["Evaporation", "Condensation", "Freezing", "Melting"],
    },
    {
      question:
        "What is the name of the process where water changes from a gas to a liquid?",
      correctAnswer: "Condensation",
      options: ["Condensation", "Evaporation", "Freezing", "Melting"],
    },
    {
      question:
        "What is the name of the process where a solid changes directly to a gas?",
      correctAnswer: "Sublimation",
      options: ["Sublimation", "Melting", "Freezing", "Condensation"],
    },
  ],
  Astronomy: [
    {
      question: "Which planet is known as the Red Planet?",
      correctAnswer: "Mars",
      options: ["Mars", "Earth", "Venus", "Jupiter"],
    },
    {
      question: "What is the name of our galaxy?",
      correctAnswer: "Milky Way",
      options: ["Milky Way", "Andromeda", "Whirlpool", "Triangulum"],
    },
    {
      question: "What is the largest planet in our solar system?",
      correctAnswer: "Jupiter",
      options: ["Jupiter", "Saturn", "Neptune", "Uranus"],
    },
    {
      question: "What is a celestial body that orbits a planet?",
      correctAnswer: "Moon",
      options: ["Moon", "Star", "Comet", "Asteroid"],
    },
    {
      question:
        "What is the name of the star at the center of our solar system?",
      correctAnswer: "Sun",
      options: ["Sun", "Sirius", "Proxima Centauri", "Betelgeuse"],
    },
    {
      question: "What are shooting stars?",
      correctAnswer: "Meteors",
      options: ["Meteors", "Comets", "Asteroids", "Satellites"],
    },
    {
      question: "What is a group of stars that form a pattern?",
      correctAnswer: "Constellation",
      options: ["Constellation", "Galaxy", "Nebula", "Cluster"],
    },
    {
      question: "What is the name of the force that causes the tides?",
      correctAnswer: "Gravity",
      options: ["Gravity", "Magnetism", "Electricity", "Friction"],
    },
    {
      question: "What is a large cloud of gas and dust in space?",
      correctAnswer: "Nebula",
      options: ["Nebula", "Comet", "Asteroid", "Planet"],
    },
    {
      question:
        "What is the name of the dwarf planet known for its unusual orbit?",
      correctAnswer: "Pluto",
      options: ["Pluto", "Eris", "Makemake", "Haumea"],
    },
  ],
  Biology: [
    {
      question: "What part of the body pumps blood?",
      correctAnswer: "Heart",
      options: ["Heart", "Lungs", "Stomach", "Brain"],
    },
    {
      question: "What is the basic unit of life?",
      correctAnswer: "Cell",
      options: ["Cell", "Tissue", "Organ", "Organism"],
    },
    {
      question: "What process do plants use to convert sunlight into energy?",
      correctAnswer: "Photosynthesis",
      options: ["Photosynthesis", "Respiration", "Digestion", "Fermentation"],
    },
    {
      question: "What is the green pigment in plants that captures sunlight?",
      correctAnswer: "Chlorophyll",
      options: ["Chlorophyll", "Carotene", "Xanthophyll", "Anthocyanin"],
    },
    {
      question: "What is the largest organ in the human body?",
      correctAnswer: "Skin",
      options: ["Skin", "Liver", "Brain", "Heart"],
    },
    {
      question: "What is the process by which organisms produce offspring?",
      correctAnswer: "Reproduction",
      options: ["Reproduction", "Growth", "Development", "Metabolism"],
    },
    {
      question:
        "What is the process of breaking down food into smaller molecules?",
      correctAnswer: "Digestion",
      options: ["Digestion", "Absorption", "Assimilation", "Excretion"],
    },
    {
      question: "What is the name for the genetic material in cells?",
      correctAnswer: "DNA",
      options: ["DNA", "RNA", "Protein", "Carbohydrate"],
    },
    {
      question:
        "What is the process by which organisms maintain a stable internal environment?",
      correctAnswer: "Homeostasis",
      options: ["Homeostasis", "Adaptation", "Evolution", "Mutation"],
    },
    {
      question: "What is the study of living things?",
      correctAnswer: "Biology",
      options: ["Biology", "Chemistry", "Physics", "Geology"],
    },
  ],
  Geography: [
    {
      question: "What is the largest ocean?",
      correctAnswer: "Pacific Ocean",
      options: [
        "Pacific Ocean",
        "Atlantic Ocean",
        "Indian Ocean",
        "Arctic Ocean",
      ],
    },
    {
      question: "What is the highest mountain in the world?",
      correctAnswer: "Mount Everest",
      options: ["Mount Everest", "K2", "Kangchenjunga", "Lhotse"],
    },
    {
      question: "What is the longest river in the world?",
      correctAnswer: "Amazon River",
      options: [
        "Amazon River",
        "Nile River",
        "Yangtze River",
        "Mississippi River",
      ],
    },
    {
      question: "What is the largest desert in the world?",
      correctAnswer: "Antarctica",
      options: ["Antarctica", "Sahara Desert", "Arabian Desert", "Gobi Desert"],
    },
    {
      question: "What is the name of Earth's only natural satellite?",
      correctAnswer: "Moon",
      options: ["Moon", "Sun", "Star", "Planet"],
    },
    {
      question: "What is the name of the largest continent?",
      correctAnswer: "Asia",
      options: ["Asia", "Africa", "North America", "South America"],
    },
    {
      question:
        "What is the name of the Earth's layer that contains the continents and ocean basins?",
      correctAnswer: "Crust",
      options: ["Crust", "Mantle", "Core", "Lithosphere"],
    },
    {
      question:
        "What is the process of wearing away the Earth's surface by natural forces?",
      correctAnswer: "Erosion",
      options: ["Erosion", "Weathering", "Deposition", "Sedimentation"],
    },
    {
      question: "What is a large body of salt water surrounded by land?",
      correctAnswer: "Sea",
      options: ["Sea", "Lake", "River", "Ocean"],
    },
    {
      question: "What is the study of the Earth's physical features?",
      correctAnswer: "Geography",
      options: ["Geography", "Geology", "Astronomy", "Meteorology"],
    },
  ],
};

const vocabularyQuestions = {
  Reading: [
    {
      question: "What is the opposite of 'hot'?",
      correctAnswer: "Cold",
      options: ["Cold", "Warm", "Boil", "Heat"],
    },
    {
      question: "What is a synonym for 'happy'?",
      correctAnswer: "Joyful",
      options: ["Joyful", "Sad", "Angry", "Tired"],
    },
    {
      question: "What is an antonym for 'big'?",
      correctAnswer: "Small",
      options: ["Small", "Large", "Huge", "Giant"],
    },
    {
      question: "What is a synonym for 'quick'?",
      correctAnswer: "Fast",
      options: ["Fast", "Slow", "Rapid", "Swift"],
    },
    {
      question: "What is an antonym for 'up'?",
      correctAnswer: "Down",
      options: ["Down", "Above", "Over", "High"],
    },
    {
      question: "What is a synonym for 'beautiful'?",
      correctAnswer: "Gorgeous",
      options: ["Gorgeous", "Ugly", "Plain", "Homely"],
    },
    {
      question: "What is an antonym for 'light'?",
      correctAnswer: "Heavy",
      options: ["Heavy", "Bright", "Dark", "Weightless"],
    },
    {
      question: "What is a synonym for 'sad'?",
      correctAnswer: "Depressed",
      options: ["Depressed", "Happy", "Cheerful", "Merry"],
    },
    {
      question: "What is an antonym for 'start'?",
      correctAnswer: "End",
      options: ["End", "Begin", "Finish", "Conclude"],
    },
    {
      question: "What is a synonym for 'angry'?",
      correctAnswer: "Furious",
      options: ["Furious", "Calm", "Peaceful", "Serene"],
    },
  ],
  Writing: [
    {
      question: "What do we use to write?",
      correctAnswer: "Pencil",
      options: ["Pencil", "Spoon", "Ruler", "Eraser"],
    },
    {
      question: "What is a collection of sentences?",
      correctAnswer: "Paragraph",
      options: ["Paragraph", "Sentence", "Word", "Letter"],
    },
    {
      question: "What punctuation mark ends a sentence?",
      correctAnswer: "Period",
      options: ["Period", "Comma", "Question Mark", "Exclamation Point"],
    },
    {
      question:
        "What is the name for a story with a beginning, middle, and end?",
      correctAnswer: "Narrative",
      options: ["Narrative", "Poem", "Play", "Essay"],
    },
    {
      question: "What is a word that describes a noun?",
      correctAnswer: "Adjective",
      options: ["Adjective", "Verb", "Adverb", "Noun"],
    },
    {
      question: "What is a word that shows action?",
      correctAnswer: "Verb",
      options: ["Verb", "Noun", "Pronoun", "Adjective"],
    },
    {
      question: "What is a word that modifies a verb?",
      correctAnswer: "Adverb",
      options: ["Adverb", "Adjective", "Noun", "Pronoun"],
    },
    {
      question: "What is a group of words that contains a subject and a verb?",
      correctAnswer: "Clause",
      options: ["Clause", "Phrase", "Sentence", "Paragraph"],
    },
    {
      question: "What is the process of correcting errors in writing?",
      correctAnswer: "Editing",
      options: ["Editing", "Proofreading", "Revising", "Writing"],
    },
    {
      question: "What is a short story with a moral lesson?",
      correctAnswer: "Fable",
      options: ["Fable", "Myth", "Legend", "Tale"],
    },
  ],
  Letters: [
    {
      question: "Which is a vowel?",
      correctAnswer: "A",
      options: ["A", "B", "C", "D"],
    },
    {
      question: "Which letter comes after 'G'?",
      correctAnswer: "H",
      options: ["H", "F", "I", "J"],
    },
    {
      question: "Which letter is the first letter of the alphabet?",
      correctAnswer: "A",
      options: ["A", "Z", "B", "C"],
    },
    {
      question: "Which letter is a consonant?",
      correctAnswer: "B",
      options: ["B", "A", "E", "I"],
    },
    {
      question: "Which letter is often used to represent a sound?",
      correctAnswer: "X",
      options: ["X", "Y", "Z", "W"],
    },
    {
      question: "Which letter is found in the word 'cat'?",
      correctAnswer: "C",
      options: ["C", "D", "E", "F"],
    },
    {
      question: "Which letter is a vowel?",
      correctAnswer: "E",
      options: ["E", "F", "G", "H"],
    },
    {
      question: "Which letter comes before 'M'?",
      correctAnswer: "L",
      options: ["L", "K", "N", "O"],
    },
    {
      question: "Which letter is the last letter of the alphabet?",
      correctAnswer: "Z",
      options: ["Z", "Y", "X", "W"],
    },
    {
      question: "Which letter is a consonant?",
      correctAnswer: "T",
      options: ["T", "U", "V", "W"],
    },
  ],
  Numbers: [
    {
      question: "What comes after 4?",
      correctAnswer: "5",
      options: ["5", "3", "2", "6"],
    },
    {
      question: "What is 2 + 2?",
      correctAnswer: "4",
      options: ["4", "3", "5", "6"],
    },
    {
      question: "What is 10 - 5?",
      correctAnswer: "5",
      options: ["5", "6", "4", "3"],
    },
    {
      question: "What is half of 10?",
      correctAnswer: "5",
      options: ["5", "10", "2", "20"],
    },
    {
      question: "What is 3 x 3?",
      correctAnswer: "9",
      options: ["9", "6", "12", "3"],
    },
    {
      question: "What is 12 / 4?",
      correctAnswer: "3",
      options: ["3", "4", "6", "12"],
    },
    {
      question: "What is the next even number after 8?",
      correctAnswer: "10",
      options: ["10", "9", "11", "12"],
    },
    {
      question: "What is 5 less than 15?",
      correctAnswer: "10",
      options: ["10", "11", "9", "20"],
    },
    {
      question: "What is 10 more than 20?",
      correctAnswer: "30",
      options: ["30", "10", "20", "40"],
    },
    {
      question: "What is the square root of 16?",
      correctAnswer: "4",
      options: ["4", "2", "8", "16"],
    },
  ],
};

const filipinoQuestions = {
  History: [
    {
      question: "When did the Philippines become free from Spain?",
      options: [
        "June 12, 1898",
        "July 4, 1946",
        "August 21, 1983",
        "November 30, 1896",
      ],
      correctAnswer: "June 12, 1898",
    },
    {
      question: "What group did Andres Bonifacio start to fight for freedom?",
      options: [
        "La Liga Filipina",
        "Katipunan",
        "Propaganda Movement",
        "New Society Movement",
      ],
      correctAnswer: "Katipunan",
    },
    {
      question:
        "Where was the peace deal called the Pact of Biak-na-Bato signed?",
      options: ["Cavite", "Bulacan", "Laguna", "Manila"],
      correctAnswer: "Bulacan",
    },
    {
      question: "When did the Spanish come to the Philippines?",
      options: ["1521", "1565", "1898", "1942"],
      correctAnswer: "1521",
    },
    {
      question: "What government did Emilio Aguinaldo lead?",
      options: [
        "Revolutionary Government",
        "Commonwealth",
        "Republic",
        "Kingdom",
      ],
      correctAnswer: "Revolutionary Government",
    },
    {
      question: "Who was the first Filipino to become governor-general?",
      options: [
        "Diego Silang",
        "Manuel Quezon",
        "Carlos Garcia",
        "Rafael Palma",
      ],
      correctAnswer: "Rafael Palma",
    },
    {
      question:
        "What country did the Philippines fight in the Philippine-American War?",
      options: ["Spain", "America", "Japan", "China"],
      correctAnswer: "America",
    },
    {
      question: "Which country controlled the Philippines in World War II?",
      options: ["Japan", "Spain", "America", "Germany"],
      correctAnswer: "Japan",
    },
    {
      question: "What secret group wanted to free the Philippines from Spain?",
      options: ["Katipunan", "Kabataan", "Kalayaan", "Kalibapi"],
      correctAnswer: "Katipunan",
    },
    {
      question: "Where did Ferdinand Magellan arrive in 1521?",
      options: ["Cebu", "Luzon", "Mindanao", "Palawan"],
      correctAnswer: "Cebu",
    },
  ],
  Heroes: [
    {
      question: "Who wrote the book Noli Me Tangere?",
      options: [
        "Andres Bonifacio",
        "Jose Rizal",
        "Emilio Aguinaldo",
        "Apolinario Mabini",
      ],
      correctAnswer: "Jose Rizal",
    },
    {
      question: "Who was called the 'Brains of the Revolution'?",
      options: [
        "Apolinario Mabini",
        "Andres Bonifacio",
        "Gregorio del Pilar",
        "Jose Rizal",
      ],
      correctAnswer: "Apolinario Mabini",
    },
    {
      question: "Who led the Katipunan group?",
      options: [
        "Jose Rizal",
        "Andres Bonifacio",
        "Emilio Jacinto",
        "Antonio Luna",
      ],
      correctAnswer: "Andres Bonifacio",
    },
    {
      question: "Who was the youngest Filipino general?",
      options: [
        "Jose Abad Santos",
        "Gregorio del Pilar",
        "Emilio Aguinaldo",
        "Miguel Malvar",
      ],
      correctAnswer: "Gregorio del Pilar",
    },
    {
      question: "Who became the first president of the Philippines?",
      options: [
        "Jose Rizal",
        "Andres Bonifacio",
        "Emilio Aguinaldo",
        "Manuel Quezon",
      ],
      correctAnswer: "Emilio Aguinaldo",
    },
    {
      question: "Who is the national hero of the Philippines?",
      options: ["Jose Rizal", "Manuel Quezon", "Andres Bonifacio", "Lapu-Lapu"],
      correctAnswer: "Jose Rizal",
    },
    {
      question: "Who fought against Magellan in Mactan?",
      options: ["Lapu-Lapu", "Rajah Sulayman", "Diego Silang", "Carlos Garcia"],
      correctAnswer: "Lapu-Lapu",
    },
    {
      question: "Who was the wife of Diego Silang and became a hero too?",
      options: [
        "Melchora Aquino",
        "Gabriela Silang",
        "Josefa Llanes Escoda",
        "Maria Clara",
      ],
      correctAnswer: "Gabriela Silang",
    },
    {
      question: "Who helped take care of wounded Filipino soldiers?",
      options: [
        "Melchora Aquino",
        "Gabriela Silang",
        "Leona Florentino",
        "Corazon Aquino",
      ],
      correctAnswer: "Melchora Aquino",
    },
    {
      question: "Who helped make the Philippine flag?",
      options: [
        "Marcela Agoncillo",
        "Jose Rizal",
        "Emilio Aguinaldo",
        "Gabriela Silang",
      ],
      correctAnswer: "Marcela Agoncillo",
    },
  ],
  Presidents: [
    {
      question: "Who was the first President of the Philippines?",
      options: [
        "Manuel Quezon",
        "Emilio Aguinaldo",
        "Jose Laurel",
        "Fidel Ramos",
      ],
      correctAnswer: "Emilio Aguinaldo",
    },
    {
      question: "Who was the first President of the Commonwealth?",
      options: [
        "Manuel Quezon",
        "Ramon Magsaysay",
        "Carlos Garcia",
        "Diosdado Macapagal",
      ],
      correctAnswer: "Manuel Quezon",
    },
    {
      question: "Who was the President during Martial Law?",
      options: [
        "Ferdinand Marcos",
        "Corazon Aquino",
        "Gloria Arroyo",
        "Joseph Estrada",
      ],
      correctAnswer: "Ferdinand Marcos",
    },
    {
      question: "Who was the first female President of the Philippines?",
      options: [
        "Gloria Arroyo",
        "Imelda Marcos",
        "Cory Aquino",
        "Miriam Santiago",
      ],
      correctAnswer: "Cory Aquino",
    },
    {
      question: "Who became President after Marcos left?",
      options: [
        "Joseph Estrada",
        "Fidel Ramos",
        "Corazon Aquino",
        "Ninoy Aquino",
      ],
      correctAnswer: "Corazon Aquino",
    },
    {
      question: "Who was the President before Bongbong Marcos?",
      options: [
        "Rodrigo Duterte",
        "Benigno Aquino III",
        "Joseph Estrada",
        "Fidel Ramos",
      ],
      correctAnswer: "Rodrigo Duterte",
    },
    {
      question: "Who was the President during the EDSA People Power in 1986?",
      options: [
        "Ferdinand Marcos",
        "Corazon Aquino",
        "Gloria Arroyo",
        "Manuel Roxas",
      ],
      correctAnswer: "Ferdinand Marcos",
    },
    {
      question: "Who is known as the 'Champion of the Common Man'?",
      options: [
        "Ramon Magsaysay",
        "Carlos Garcia",
        "Elpidio Quirino",
        "Diosdado Macapagal",
      ],
      correctAnswer: "Ramon Magsaysay",
    },
    {
      question: "Who made Filipino the national language?",
      options: ["Manuel Quezon", "Jose Laurel", "Fidel Ramos", "Gloria Arroyo"],
      correctAnswer: "Manuel Quezon",
    },
    {
      question: "Who is the current President of the Philippines (2025)?",
      options: [
        "Rodrigo Duterte",
        "Bongbong Marcos",
        "Leni Robredo",
        "Manny Pacquiao",
      ],
      correctAnswer: "Bongbong Marcos",
    },
  ],
  Grammar: [
    {
      question: "What is a pangngalan?",
      options: [
        "An action word",
        "A name of a person, place, or thing",
        "A describing word",
        "A sound",
      ],
      correctAnswer: "A name of a person, place, or thing",
    },
    {
      question: "Which one is a pandiwa (verb)?",
      options: ["Takbo", "Mesa", "Aso", "Ganda"],
      correctAnswer: "Takbo",
    },
    {
      question: "Which one is a pang-uri (adjective)?",
      options: ["Maganda", "Kumain", "Lamesa", "Bata"],
      correctAnswer: "Maganda",
    },
    {
      question: "What is the plural of 'bata' in Filipino?",
      options: ["Batang", "Batain", "Mga bata", "Batas"],
      correctAnswer: "Mga bata",
    },
    {
      question: "Which sentence is correct?",
      options: [
        "Ako ay masaya.",
        "Masaya ako ay.",
        "Ay ako masaya.",
        "Masaya ay ako.",
      ],
      correctAnswer: "Ako ay masaya.",
    },
    {
      question: "Which one is a panghalip (pronoun)?",
      options: ["Ako", "Takbo", "Ganda", "Mesa"],
      correctAnswer: "Ako",
    },
    {
      question: "What is the opposite of 'malaki'?",
      options: ["Matangkad", "Maliit", "Masaya", "Maingay"],
      correctAnswer: "Maliit",
    },
    {
      question: "Which word is spelled correctly?",
      options: ["Magnda", "Maganda", "Magadah", "Magganda"],
      correctAnswer: "Maganda",
    },
    {
      question: "What punctuation mark ends a question?",
      options: [".", "!", ",", "?"],
      correctAnswer: "?",
    },
    {
      question: "Which one is a complete sentence?",
      options: ["Ang aso.", "Tumakbo ang aso.", "Tumakbo.", "Aso tumakbo."],
      correctAnswer: "Tumakbo ang aso.",
    },
  ],
};

window.quizData = {
  Math: generateMathQuestions(),
  Science: scienceQuestions,
  Vocabulary: vocabularyQuestions,
  Filipino: filipinoQuestions,
};
