const mongoose = require('mongoose')
const Puzzle = require('./models/puzzleModel')
require('dotenv').config()

const puzzles = [
  // EASY
  {
    description: "A billionaire beats up the mentally ill while wearing a rubber suit.",
    answer: "the dark knight",
    hint: "Christopher Nolan directed this superhero film.",
    difficulty: "easy"
  },
  {
    description: "A woman falls in love with a fish man.",
    answer: "the shape of water",
    hint: "Guillermo del Toro won Best Picture for this.",
    difficulty: "easy"
  },
  {
    description: "A toy fears being replaced by a newer toy.",
    answer: "toy story",
    hint: "Pixar's first ever feature film.",
    difficulty: "easy"
  },
  {
    description: "A lion cub is blamed for his father's death and runs away to eat bugs with a warthog.",
    answer: "the lion king",
    hint: "Disney classic based loosely on Hamlet.",
    difficulty: "easy"
  },
  {
    description: "A clownfish crosses the entire ocean to find his son who got caught by a diver.",
    answer: "finding nemo",
    hint: "Just keep swimming.",
    difficulty: "easy"
  },
  {
    description: "A boy discovers he is a wizard and goes to a school for wizards.",
    answer: "harry potter and the sorcerer's stone",
    hint: "The first film in an eight-part series.",
    difficulty: "easy"
  },
  {
    description: "Two people fall in love on a sinking boat.",
    answer: "titanic",
    hint: "James Cameron's 1997 epic romance.",
    difficulty: "easy"
  },
  {
    description: "A man builds a theme park with real dinosaurs and is shocked when things go wrong.",
    answer: "jurassic park",
    hint: "Directed by Spielberg. Life finds a way.",
    difficulty: "easy"
  },
  {
    description: "Superheroes argue about whether superheroes should be regulated by the government.",
    answer: "captain america civil war",
    hint: "Team Cap vs Team Iron Man.",
    difficulty: "easy"
  },
  {
    description: "A rat controls a chef by hiding in his hat.",
    answer: "ratatouille",
    hint: "Anyone can cook, according to Pixar.",
    difficulty: "easy"
  },

  // MEDIUM
  {
    description: "A man hallucinates that his imaginary friend is a soap salesman and blows up buildings.",
    answer: "fight club",
    hint: "The first rule is you do not talk about it.",
    difficulty: "medium"
  },
  {
    description: "A hobbit walks really far to throw some jewelry into a volcano.",
    answer: "the lord of the rings the return of the king",
    hint: "The final chapter of Tolkien's trilogy.",
    difficulty: "medium"
  },
  {
    description: "A woman escapes her boring life by helping solve a murder at a rich family's mansion.",
    answer: "knives out",
    hint: "A whodunit with Daniel Craig playing detective.",
    difficulty: "medium"
  },
  {
    description: "A guy builds a website to impress a girl and accidentally becomes a billionaire.",
    answer: "the social network",
    hint: "The story behind Facebook.",
    difficulty: "medium"
  },
  {
    description: "A man wakes up every day and relives the same day until he becomes a better person.",
    answer: "groundhog day",
    hint: "Bill Murray is stuck in Punxsutawney, Pennsylvania.",
    difficulty: "medium"
  },
  {
    description: "A trash robot falls in love and follows a girl robot across the galaxy.",
    answer: "wall-e",
    hint: "Pixar film set in a future where Earth is abandoned.",
    difficulty: "medium"
  },
  {
    description: "A con artist teaches his son to con people and they con each other.",
    answer: "catch me if you can",
    hint: "Leonardo DiCaprio and Tom Hanks. Directed by Spielberg.",
    difficulty: "medium"
  },
  {
    description: "A man survives alone on Mars by growing potatoes in his own feces.",
    answer: "the martian",
    hint: "Matt Damon is left behind on Mars.",
    difficulty: "medium"
  },
  {
    description: "An ogre is annoyed that fairy tale creatures have moved into his swamp.",
    answer: "shrek",
    hint: "Dreamworks animated film. Some of you may die.",
    difficulty: "medium"
  },
  {
    description: "A woman slowly realizes her entire neighborhood is a cult trying to use her baby for Satan.",
    answer: "rosemary's baby",
    hint: "Roman Polanski's 1968 horror classic.",
    difficulty: "medium"
  },

  // HARD
  {
    description: "A man spends years in prison and gets revenge by slowly making his enemy's life miserable using accounting.",
    answer: "the shawshank redemption",
    hint: "Consistently rated the best movie ever on IMDb.",
    difficulty: "hard"
  },
  {
    description: "A spinning top may or may not fall over and nobody is sure what is real.",
    answer: "inception",
    hint: "Leonardo DiCaprio enters people's dreams.",
    difficulty: "hard"
  },
  {
    description: "An Italian-American slowly becomes a monster because everyone keeps asking him for favors at his daughter's wedding.",
    answer: "the godfather",
    hint: "An offer you can't refuse.",
    difficulty: "hard"
  },
  {
    description: "A depressed insurance salesman starts seeing a therapist who turns out to be a ghost that doesn't know he's a ghost.",
    answer: "the sixth sense",
    hint: "I see dead people.",
    difficulty: "hard"
  },
  {
    description: "A Korean family pretends to be qualified professionals to freeload off a rich family until someone from the basement complicates things.",
    answer: "parasite",
    hint: "First non-English film to win Best Picture.",
    difficulty: "hard"
  },
  {
    description: "A cowboy and a rancher fall in love on a mountain and spend twenty years being sad about it.",
    answer: "brokeback mountain",
    hint: "Ang Lee directed this 2005 film.",
    difficulty: "hard"
  },
  {
    description: "A woman goes to a foreign country and eats a lot of food and writes about eating a lot of food.",
    answer: "eat pray love",
    hint: "Julia Roberts stars in this 2010 film.",
    difficulty: "hard"
  },
  {
    description: "Two soldiers wander through World War One trying to deliver a message without dying, and the camera pretends it never cut.",
    answer: "1917",
    hint: "Sam Mendes directed this to look like one continuous shot.",
    difficulty: "hard"
  },
  {
    description: "A jazz musician makes a deal with the universe to be born and then immediately tries to get out of being alive.",
    answer: "soul",
    hint: "Pixar film about what happens before you're born.",
    difficulty: "hard"
  },
  {
    description: "A hitman and his partner have a deeply philosophical conversation about fast food before murdering people.",
    answer: "pulp fiction",
    hint: "Quentin Tarantino's 1994 nonlinear crime film.",
    difficulty: "hard"
  },
]

mongoose.connect(process.env.MONGO_URI).then(async () => {
  await Puzzle.deleteMany()
  await Puzzle.insertMany(puzzles)
  console.log(`Puzzles Loaded`)
}).catch((err) => {console.log(err)})