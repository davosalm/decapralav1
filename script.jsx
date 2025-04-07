import * as React from "react";
import { createRoot } from "react-dom/client";
import { Trophy, ArrowRight, BookOpen, Brain, Lightning, Timer, CaretRight, Question, Play, House, Sun, Moon } from "@phosphor-icons/react";

const GAME_PAIRS = [
  // Pares originais (corrigidos)
  { start: "Neymar", end: "Albert_Einstein", difficulty: "medium" },
  { start: "Açaí", end: "Revolução_Industrial", difficulty: "medium" },
  { start: "Futebol", end: "Filosofia", difficulty: "easy" },
  { start: "Carnaval", end: "Física_Quântica", difficulty: "medium" },
  { start: "Samba", end: "Inteligência_Artificial", difficulty: "medium" },
  { start: "Pelé", end: "Segunda_Guerra_Mundial", difficulty: "medium" },
  { start: "Rio_Amazonas", end: "Teoria_da_Relatividade", difficulty: "hard" },
  { start: "Bossa_Nova", end: "Napoleão_Bonaparte", difficulty: "hard" },
  { start: "Feijoada", end: "Revolução_Francesa", difficulty: "medium" },
  { start: "Copacabana", end: "Leonardo_da_Vinci", difficulty: "medium" },
  { start: "Capoeira", end: "Revolução_Russa", difficulty: "medium" },
  { start: "Ipanema", end: "Charles_Darwin", difficulty: "medium" },
  { start: "Saci-Pererê", end: "William_Shakespeare", difficulty: "hard" },
  { start: "Guaraná", end: "Pablo_Picasso", difficulty: "hard" },
  { start: "Cristo_Redentor", end: "Stephen_Hawking", difficulty: "medium" },
  { start: "São_Paulo", end: "Platão", difficulty: "easy" },
  { start: "Rio_de_Janeiro", end: "Isaac_Newton", difficulty: "medium" },
  { start: "Santos_Dumont", end: "Teoria_da_Evolução", difficulty: "medium" },
  { start: "Pantanal", end: "Vincent_van_Gogh", difficulty: "hard" },
  { start: "Estádio_do_Maracanã", end: "Marie_Curie", difficulty: "hard" },
  { start: "Carmen_Miranda", end: "Sigmund_Freud", difficulty: "hard" },
  { start: "Tom_Jobim", end: "Galileu_Galilei", difficulty: "hard" },
  { start: "Anitta", end: "Aristóteles", difficulty: "hard" },
  { start: "Machado_de_Assis", end: "Revolução_Chinesa", difficulty: "medium" },
  { start: "Cachaça", end: "Guerra_Fria", difficulty: "medium" },
  { start: "Brigadeiro", end: "Revolução_Industrial", difficulty: "hard" },
  { start: "Povos_indígenas_do_Brasil", end: "Primeira_Guerra_Mundial", difficulty: "medium" },
  { start: "Xuxa", end: "Nikola_Tesla", difficulty: "hard" },
  { start: "Roberto_Carlos", end: "Ludwig_van_Beethoven", difficulty: "medium" },
  { start: "Chico_Buarque", end: "Karl_Marx", difficulty: "medium" },
  { start: "Zico", end: "Thomas_Edison", difficulty: "hard" },
  { start: "Ayrton_Senna", end: "René_Descartes", difficulty: "hard" },
  { start: "Oscar_Niemeyer", end: "Michelangelo", difficulty: "medium" },
  { start: "Tarsila_do_Amaral", end: "Salvador_Dalí", difficulty: "medium" },
  { start: "Garrincha", end: "Johannes_Gutenberg", difficulty: "hard" },
  { start: "Embraer", end: "Revolução_Digital", difficulty: "medium" },
  { start: "Petrobras", end: "Bill_Gates", difficulty: "medium" },
  { start: "Vale_(empresa)", end: "Steve_Jobs", difficulty: "medium" },
  { start: "Banco_do_Brasil", end: "Mark_Zuckerberg", difficulty: "medium" },
  { start: "Itaú_Unibanco", end: "Jeff_Bezos", difficulty: "medium" },
  { start: "Bradesco", end: "Elon_Musk", difficulty: "medium" },
  { start: "Casas_Bahia", end: "Tim_Berners-Lee", difficulty: "hard" },
  { start: "Magazine_Luiza", end: "Ada_Lovelace", difficulty: "hard" },
  { start: "Natura", end: "Charles_Babbage", difficulty: "hard" },
  { start: "O_Boticário", end: "Alan_Turing", difficulty: "hard" },
  { start: "Havaianas", end: "Revolução_Industrial", difficulty: "medium" },
  { start: "TV_Globo", end: "Guerra_do_Vietnã", difficulty: "medium" },
  { start: "RecordTV", end: "Guerra_da_Coreia", difficulty: "medium" },
  { start: "SBT", end: "Guerra_Fria", difficulty: "medium" },
  { start: "Silvio_Santos", end: "Winston_Churchill", difficulty: "medium" },
  { start: "Fausto_Silva", end: "Franklin_D._Roosevelt", difficulty: "hard" },
  { start: "Gugu_Liberato", end: "John_F._Kennedy", difficulty: "hard" },
  { start: "Ana_Maria_Braga", end: "Margaret_Thatcher", difficulty: "hard" },
  { start: "Hebe_Camargo", end: "Rainha_Elizabeth_II", difficulty: "hard" },
  { start: "Chacrinha", end: "Mahatma_Gandhi", difficulty: "hard" },
  { start: "Jô_Soares", end: "Nelson_Mandela", difficulty: "medium" },
  { start: "Paulo_Coelho", end: "Jorge_Luis_Borges", difficulty: "medium" },
  { start: "Clarice_Lispector", end: "Virginia_Woolf", difficulty: "medium" },
  { start: "Jorge_Amado", end: "Gabriel_García_Márquez", difficulty: "medium" },
  { start: "Graciliano_Ramos", end: "Ernest_Hemingway", difficulty: "medium" },
  { start: "Carlos_Drummond_de_Andrade", end: "Pablo_Neruda", difficulty: "medium" },
  { start: "Vinícius_de_Moraes", end: "Federico_García_Lorca", difficulty: "medium" },
  { start: "Cecília_Meireles", end: "Emily_Dickinson", difficulty: "hard" },
  { start: "Manuel_Bandeira", end: "Fernando_Pessoa", difficulty: "medium" },
  { start: "João_Cabral_de_Melo_Neto", end: "T._S._Eliot", difficulty: "hard" },
  { start: "Mário_de_Andrade", end: "James_Joyce", difficulty: "medium" },
  { start: "Oswald_de_Andrade", end: "Marcel_Proust", difficulty: "hard" },
  { start: "Lima_Barreto", end: "Charles_Dickens", difficulty: "medium" },
  { start: "Euclides_da_Cunha", end: "Victor_Hugo", difficulty: "medium" },
  { start: "Guimarães_Rosa", end: "Fiódor_Dostoiévski", difficulty: "medium" },
  { start: "José_de_Alencar", end: "Miguel_de_Cervantes", difficulty: "medium" },
  { start: "Joaquim_Nabuco", end: "Jean-Jacques_Rousseau", difficulty: "hard" },
  { start: "Rui_Barbosa", end: "Voltaire", difficulty: "medium" },
  { start: "Pedro_II_do_Brasil", end: "Napoleão_Bonaparte", difficulty: "medium" },
  { start: "Coreia_do_Sul", end: "Constituição_brasileira_de_1937", difficulty: "hard" },
  { start: "Junji_Ito", end: "Igreja_Católica", difficulty: "hard" },
  { start: "Batismo", end: "René_Descartes", difficulty: "medium" },
  { start: "Geometria_Analítica", end: "Nova_Iorque", difficulty: "hard" },
  { start: "Oceano_Atlântico", end: "Comunismo", difficulty: "medium" },
  { start: "Café", end: "Revolução_Francesa", difficulty: "medium" },
  { start: "Pizza", end: "Segunda_Guerra_Mundial", difficulty: "medium" },
  { start: "Chocolate", end: "Primeira_Guerra_Mundial", difficulty: "easy" },
  { start: "Vodca", end: "Revolução_Russa", difficulty: "easy" },
  { start: "Sushi", end: "Culinária_Japonesa", difficulty: "easy" },
  { start: "Croissant", end: "Napoleão_Bonaparte", difficulty: "medium" },
  { start: "Tacos", end: "Cristóvão_Colombo", difficulty: "medium" },
  { start: "Hambúrguer", end: "Guerra_Fria", difficulty: "medium" },
  { start: "Caril", end: "Mahatma_Gandhi", difficulty: "medium" },
  { start: "Paella", end: "Pablo_Picasso", difficulty: "medium" },
  { start: "Churrasco", end: "Charles_Darwin", difficulty: "hard" },
  { start: "Lasanha", end: "Leonardo_da_Vinci", difficulty: "medium" },
  { start: "Kimchi", end: "Guerra_da_Coreia", difficulty: "easy" },
  { start: "Cuscuz", end: "Cleópatra", difficulty: "medium" },
  { start: "Sopa", end: "Revolução_Industrial", difficulty: "medium" },
  { start: "PlayStation", end: "Albert_Einstein", difficulty: "hard" },
  { start: "Nintendo", end: "Segunda_Guerra_Mundial", difficulty: "medium" },
  { start: "Xbox", end: "Bill_Gates", difficulty: "easy" },
  { start: "Among_Us", end: "Guerra_Fria", difficulty: "hard" },
  { start: "Minecraft", end: "Revolução_Industrial", difficulty: "medium" },
  { start: "Tetris", end: "União_Soviética", difficulty: "easy" },
  { start: "Pac-Man", end: "Teoria_da_Relatividade", difficulty: "hard" },
  { start: "The_Legend_of_Zelda", end: "Mitologia_Grega", difficulty: "medium" },
  { start: "Super_Mario", end: "Revolução_Italiana", difficulty: "medium" },
  { start: "Fortnite", end: "Primeira_Guerra_Mundial", difficulty: "hard" },
  { start: "Bicicleta", end: "Albert_Einstein", difficulty: "medium" },
  { start: "Skate", end: "Revolução_Cultural", difficulty: "hard" },
  { start: "Furacão", end: "Mudanças_Climáticas", difficulty: "easy" },
  { start: "Aurora_Boreal", end: "Nikola_Tesla", difficulty: "medium" },
  { start: "Tsunami", end: "Teoria_da_Relatividade", difficulty: "hard" },
  { start: "Vulcão", end: "Pompeia", difficulty: "easy" },
  { start: "Terremoto", end: "Teoria_das_Placas_Tectônicas", difficulty: "easy" },
  { start: "Eclipse", end: "Isaac_Newton", difficulty: "medium" },
  { start: "Cometa", end: "Stephen_Hawking", difficulty: "medium" },
  { start: "Arco-íris", end: "Isaac_Newton", difficulty: "medium" },
  { start: "TikTok", end: "Guerra_Fria", difficulty: "hard" },
  { start: "Instagram", end: "Mark_Zuckerberg", difficulty: "easy" },
  { start: "Twitter", end: "Revolução_Árabe", difficulty: "medium" },
  { start: "WhatsApp", end: "Privacidade_Digital", difficulty: "easy" },
  { start: "Facebook", end: "Eleições_Americanas", difficulty: "medium" },
  { start: "YouTube", end: "Revolução_Digital", difficulty: "easy" },
  { start: "Netflix", end: "Hollywood", difficulty: "easy" },
  { start: "Spotify", end: "Ludwig_van_Beethoven", difficulty: "medium" },
  { start: "Tinder", end: "Revolução_Sexual", difficulty: "medium" },
  { start: "LinkedIn", end: "Revolução_Industrial", difficulty: "medium" },
  { start: "Basquete", end: "Guerra_Fria", difficulty: "medium" },
  { start: "Voleibol", end: "Segunda_Guerra_Mundial", difficulty: "medium" },
  { start: "Tênis", end: "Revolução_Francesa", difficulty: "medium" },
  { start: "Surfe", end: "James_Cook", difficulty: "medium" },
  { start: "Golfe", end: "Escocia", difficulty: "medium" },
  { start: "Rugby", end: "Império_Britânico", difficulty: "medium" },
  { start: "Ciclismo", end: "Revolução_Industrial", difficulty: "medium" },
  { start: "Natação", end: "Jogos_Olímpicos_da_Antiguidade", difficulty: "medium" },
  { start: "Kung_Fu", end: "Revolução_Chinesa", difficulty: "medium" },
  { start: "Boxe", end: "Muhammad_Ali", difficulty: "easy" },
  { start: "Samba_de_Gafieira", end: "Segunda_Guerra_Mundial", difficulty: "hard" },
  { start: "Tango", end: "Grande_Depressão", difficulty: "medium" },
  { start: "Balé", end: "Revolução_Russa", difficulty: "medium" },
  { start: "Hip_Hop", end: "Movimento_pelos_direitos_civis_nos_Estados_Unidos", difficulty: "medium" },
  { start: "Flamenco", end: "Pablo_Picasso", difficulty: "medium" },
  { start: "Salsa_(dança)", end: "Revolução_Cubana", difficulty: "medium" },
  { start: "Break_Dance", end: "Guerra_Fria", difficulty: "medium" },
  { start: "K-pop", end: "Guerra_da_Coreia", difficulty: "medium" },
  { start: "Valsa", end: "Congresso_de_Viena", difficulty: "medium" },
  { start: "Pole_Dance", end: "Revolução_Sexual", difficulty: "medium" },
  { start: "Pokémon", end: "Charles_Darwin", difficulty: "hard" },
  { start: "Hello_Kitty", end: "Segunda_Guerra_Mundial", difficulty: "hard" },
  { start: "Naruto", end: "História_do_Japão", difficulty: "medium" },
  { start: "Dragon_Ball", end: "Mitologia_Chinesa", difficulty: "medium" },
  { start: "One_Piece", end: "Era_dos_Descobrimentos", difficulty: "medium" },
  { start: "Sailor_Moon", end: "Feminismo", difficulty: "medium" },
  { start: "Attack_on_Titan", end: "Segunda_Guerra_Mundial", difficulty: "medium" },
  { start: "Death_Note", end: "Ética", difficulty: "medium" },
  { start: "My_Hero_Academia", end: "Friedrich_Nietzsche", difficulty: "hard" },
  { start: "JoJo's_Bizarre_Adventure", end: "Egito_Antigo", difficulty: "medium" },
  { start: "Bolo_de_Chocolate", end: "Revolução_Industrial", difficulty: "hard" },
  { start: "Brigadeiro", end: "Segunda_Guerra_Mundial", difficulty: "medium" },
  { start: "Paçoca", end: "Povos_indígenas_do_Brasil", difficulty: "easy" },
  { start: "Mousse", end: "Revolução_Francesa", difficulty: "medium" },
  { start: "Pudim", end: "Colonização_Portuguesa", difficulty: "medium" },
  { start: "Cheesecake", end: "Grécia_Antiga", difficulty: "hard" },
  { start: "Tiramisù", end: "Renascimento_Italiano", difficulty: "medium" },
  { start: "Churros", end: "Cristóvão_Colombo", difficulty: "medium" },
  { start: "Brownie", end: "Chicago", difficulty: "medium" },
  { start: "Sorvete", end: "Marco_Polo", difficulty: "medium" },
  { start: "Lady_Gaga", end: "Andy_Warhol", difficulty: "medium" },
  { start: "Michael_Jackson", end: "Guerra_Fria", difficulty: "medium" },
  { start: "Madonna", end: "Revolução_Sexual", difficulty: "medium" },
  { start: "BTS", end: "Guerra_da_Coreia", difficulty: "medium" },
  { start: "The_Beatles", end: "Guerra_Fria", difficulty: "medium" },
  { start: "Elvis_Presley", end: "Guerra_Fria", difficulty: "medium" },
  { start: "Beyoncé", end: "Feminismo", difficulty: "medium" },
  { start: "Queen_(banda)", end: "AIDS", difficulty: "medium" },
  { start: "Taylor_Swift", end: "Feminismo", difficulty: "medium" },
  { start: "Bob_Marley", end: "Colonialismo", difficulty: "medium" },
  { start: "Harry_Potter", end: "Segunda_Guerra_Mundial", difficulty: "medium" },
  { start: "O_Senhor_dos_Anéis", end: "Primeira_Guerra_Mundial", difficulty: "medium" },
  { start: "Game_of_Thrones", end: "Guerra_das_Duas_Rosas", difficulty: "medium" },
  { start: "Matrix", end: "Filosofia_Grega", difficulty: "medium" },
  { start: "Star_Wars", end: "Mitologia_Comparada", difficulty: "medium" },
  { start: "Vingadores_(filme)", end: "Guerra_Fria", difficulty: "medium" },
  { start: "Titanic_(filme_de_1997)", end: "Primeira_Guerra_Mundial", difficulty: "medium" },
  { start: "Jurassic_Park", end: "Charles_Darwin", difficulty: "medium" },
  { start: "O_Poderoso_Chefão", end: "Grande_Depressão", difficulty: "medium" },
  { start: "Frozen", end: "Hans_Christian_Andersen", difficulty: "medium" },
  { start: "Abacate", end: "Civilização_Asteca", difficulty: "medium" },
  { start: "Tomate", end: "Revolução_Agrícola", difficulty: "medium" },
  { start: "Batata", end: "Grande_Fome_Irlandesa", difficulty: "easy" },
  { start: "Milho", end: "Civilização_Maia", difficulty: "easy" },
  { start: "Trigo", end: "Revolução_Agrícola", difficulty: "easy" },
  { start: "Arroz", end: "Mao_Tsé-Tung", difficulty: "medium" },
  { start: "Manga_(fruta)", end: "Império_Britânico", difficulty: "medium" },
  { start: "Banana", end: "United_Fruit_Company", difficulty: "medium" },
  { start: "Coco", end: "Grandes_Navegações", difficulty: "medium" },
  { start: "Pimenta", end: "Vasco_da_Gama", difficulty: "medium" },
  { start: "Havaianas", end: "Japão", difficulty: "medium" },
  { start: "Volkswagen_Fusca", end: "História_da_Alemanha", difficulty: "medium" },
  { start: "IPhone", end: "Revolução_Digital", difficulty: "easy" },
  { start: "Lego", end: "Segunda_Guerra_Mundial", difficulty: "medium" },
  { start: "Coca-Cola", end: "Guerra_Fria", difficulty: "medium" },
  { start: "McDonald's", end: "Guerra_Fria", difficulty: "medium" },
  { start: "IKEA", end: "Segunda_Guerra_Mundial", difficulty: "medium" },
  { start: "Nike", end: "Jogos_Olímpicos", difficulty: "medium" },
  { start: "Barbie", end: "Feminismo", difficulty: "medium" },
  { start: "Rolex", end: "Primeira_Guerra_Mundial", difficulty: "medium" },
  
  // Novos pares (400 adicionais)
  // Pares fáceis (100)
  { start: "Lasanha", end: "Italia", difficulty: "easy" },
  { start: "Teatro", end: "Grecia_Antiga", difficulty: "easy" },
  { start: "Arquitetura", end: "Leonardo_da_Vinci", difficulty: "easy" },
  { start: "Gioconda", end: "Louvre", difficulty: "easy" },
  { start: "Telescopio", end: "Galileu_Galilei", difficulty: "easy" },
  { start: "Piano", end: "Mozart", difficulty: "easy" },
  { start: "Violino", end: "Antonio_Vivaldi", difficulty: "easy" },
  { start: "Guitar", end: "Rock", difficulty: "easy" },
  { start: "Saxofone", end: "Jazz", difficulty: "easy" },
  { start: "Opera", end: "Italia", difficulty: "easy" },
  { start: "Ballet", end: "Russia", difficulty: "easy" },
  { start: "Cinema", end: "Hollywood", difficulty: "easy" },
  { start: "Fotografia", end: "Daguerreotipo", difficulty: "easy" },
  { start: "Internet", end: "ARPANET", difficulty: "easy" },
  { start: "Espresso", end: "Italia", difficulty: "easy" },
  { start: "Cerveja", end: "Alemanha", difficulty: "easy" },
  { start: "Whisky", end: "Escocia", difficulty: "easy" },
  { start: "Tequila", end: "Mexico", difficulty: "easy" },
  { start: "Caipirinha", end: "Brasil", difficulty: "easy" },
  { start: "Bicicleta", end: "Tour_de_France", difficulty: "easy" },
  { start: "Telefone", end: "Alexander_Graham_Bell", difficulty: "easy" },
  { start: "Aviao", end: "Irmãos_Wright", difficulty: "easy" },
  { start: "Trem", end: "Revolução_Industrial", difficulty: "easy" },
  { start: "Locomotiva", end: "Stephenson", difficulty: "easy" },
  { start: "Carro", end: "Henry_Ford", difficulty: "easy" },
  { start: "Roda", end: "Mesopotamia", difficulty: "easy" },
  { start: "Fogo", end: "Idade_da_Pedra", difficulty: "easy" },
  { start: "Papel", end: "China", difficulty: "easy" },
  { start: "Plastico", end: "Petroleo", difficulty: "easy" },
  { start: "Vidro", end: "Areia", difficulty: "easy" },
  { start: "Aco", end: "Siderurgia", difficulty: "easy" },
  { start: "Madeira", end: "Floresta", difficulty: "easy" },
  { start: "Ouro", end: "Corrida_do_ouro", difficulty: "easy" },
  { start: "Prata", end: "Mexico", difficulty: "easy" },
  { start: "Diamante", end: "Africa", difficulty: "easy" },
  { start: "Rubis", end: "Joalheria", difficulty: "easy" },
  { start: "Titanio", end: "Aeronautica", difficulty: "easy" },
  { start: "Cobre", end: "Eletricidade", difficulty: "easy" },
  { start: "Aluminio", end: "Latas", difficulty: "easy" },
  { start: "Carbono", end: "Diamante", difficulty: "easy" },
  { start: "Oxigenio", end: "Respiracao", difficulty: "easy" },
  { start: "Hidrogenio", end: "Agua", difficulty: "easy" },
  { start: "Helio", end: "Baloes", difficulty: "easy" },
  { start: "Uranio", end: "Energia_nuclear", difficulty: "easy" },
  { start: "Mercurio", end: "Termometro", difficulty: "easy" },
  { start: "Plutonio", end: "Bomba_atomica", difficulty: "easy" },
  { start: "Sal", end: "Conservacao_de_alimentos", difficulty: "easy" },
  { start: "Levedura", end: "Pao", difficulty: "easy" },
  { start: "Bacterias", end: "Antibioticos", difficulty: "easy" },
  { start: "Virus", end: "Vacina", difficulty: "easy" },
  { start: "Antibioticos", end: "Alexander_Fleming", difficulty: "easy" },
  { start: "Insulina", end: "Diabetes", difficulty: "easy" },
  { start: "Aspirina", end: "Felix_Hoffmann", difficulty: "easy" },
  { start: "Vitamina_C", end: "Escorbuto", difficulty: "easy" },
  { start: "Proteina", end: "Musculo", difficulty: "easy" },
  { start: "Carboidrato", end: "Energia", difficulty: "easy" },
  { start: "Gordura", end: "Colesterol", difficulty: "easy" },
  { start: "Fibra", end: "Digestao", difficulty: "easy" },
  { start: "Acucar", end: "Cana-de-acucar", difficulty: "easy" },
  { start: "Cafe", end: "Brasil", difficulty: "easy" },
  { start: "Cha", end: "China", difficulty: "easy" },
  { start: "Coca_Cola", end: "Atlanta", difficulty: "easy" },
  { start: "Computador", end: "Alan_Turing", difficulty: "easy" },
  { start: "Teclado", end: "QWERTY", difficulty: "easy" },
  { start: "Mouse", end: "Douglas_Engelbart", difficulty: "easy" },
  { start: "Monitor", end: "Tubo_de_raios_catodicos", difficulty: "easy" },
  { start: "Impressora", end: "Imprensa", difficulty: "easy" },
  { start: "Camera", end: "Fotografia", difficulty: "easy" },
  { start: "Radio", end: "Ondas_eletromagneticas", difficulty: "easy" },
  { start: "Televisao", end: "John_Logie_Baird", difficulty: "easy" },
  { start: "Satelite", end: "Sputnik_1", difficulty: "easy" },
  { start: "Foguete", end: "NASA", difficulty: "easy" },
  { start: "Astronauta", end: "Neil_Armstrong", difficulty: "easy" },
  { start: "Lua", end: "Apollo_11", difficulty: "easy" },
  { start: "Marte", end: "Curiosity", difficulty: "easy" },
  { start: "Jupiter", end: "Sistema_Solar", difficulty: "easy" },
  { start: "Plutao", end: "Planeta_anao", difficulty: "easy" },
  { start: "Constelacao", end: "Astronomia", difficulty: "easy" },
  { start: "Supernova", end: "Estrela", difficulty: "easy" },
  { start: "Buraco_negro", end: "Stephen_Hawking", difficulty: "easy" },
  { start: "Galaxia", end: "Via_Lactea", difficulty: "easy" },
  { start: "Dinosauros", end: "Extincao_K-Pg", difficulty: "easy" },
  { start: "Tigre_dentes_de_sabre", end: "Era_do_gelo", difficulty: "easy" },
  { start: "Mamute", end: "Siberia", difficulty: "easy" },
  { start: "Darwin", end: "Origem_das_Especies", difficulty: "easy" },
  { start: "Cromossomo", end: "DNA", difficulty: "easy" },
  { start: "Cerebro", end: "Neurociencia", difficulty: "easy" },
  { start: "Coracao", end: "William_Harvey", difficulty: "easy" },
  { start: "Pulmao", end: "Oxigenio", difficulty: "easy" },
  { start: "Figado", end: "Digestao", difficulty: "easy" },
  { start: "Rim", end: "Filtracao", difficulty: "easy" },
  { start: "Sangue", end: "Hemoglobina", difficulty: "easy" },
  { start: "Vacina", end: "Edward_Jenner", difficulty: "easy" },
  { start: "Microscopio", end: "Anton_van_Leeuwenhoek", difficulty: "easy" },
  { start: "Estetoscopio", end: "René_Laennec", difficulty: "easy" },
  { start: "Termometro", end: "Galileu_Galilei", difficulty: "easy" },
  { start: "Bisturi", end: "Cirurgia", difficulty: "easy" },

  // Pares médios (150)
  { start: "Queijo", end: "Revolução_Neolítica", difficulty: "medium" },
  { start: "Pão", end: "Antiga_Mesopotâmia", difficulty: "medium" },
  { start: "Cerveja", end: "Código_de_Hamurabi", difficulty: "medium" },
  { start: "Calendário", end: "Egito_Antigo", difficulty: "medium" },
  { start: "Alfabeto", end: "Fenícios", difficulty: "medium" },
  { start: "Democracia", end: "Péricles", difficulty: "medium" },
  { start: "Aqueduto", end: "Engenharia_romana", difficulty: "medium" },
  { start: "Catapulta", end: "Arquimedes", difficulty: "medium" },
  { start: "Pergaminho", end: "Biblioteca_de_Alexandria", difficulty: "medium" },
  { start: "Bússola", end: "Navegação_marítima", difficulty: "medium" },
  { start: "Pólvora", end: "Mongóis", difficulty: "medium" },
  { start: "Escrita", end: "Suméria", difficulty: "medium" },
  { start: "Vinho", end: "Dionísio", difficulty: "medium" },
  { start: "Tempero", end: "Marco_Polo", difficulty: "medium" },
  { start: "Batata", end: "Império_Inca", difficulty: "medium" },
  { start: "Chocolate", end: "Astecas", difficulty: "medium" },
  { start: "Tabaco", end: "Walter_Raleigh", difficulty: "medium" },
  { start: "Imprensa", end: "Martinho_Lutero", difficulty: "medium" },
  { start: "Telescópio", end: "Júpiter", difficulty: "medium" },
  { start: "Microscópio", end: "Microbiologia", difficulty: "medium" },
  { start: "Máquina_a_vapor", end: "Mineração_de_carvão", difficulty: "medium" },
  { start: "Telégrafo", end: "Código_Morse", difficulty: "medium" },
  { start: "Fotografia", end: "Louis_Daguerre", difficulty: "medium" },
  { start: "Anestesia", end: "Guerra_da_Crimeia", difficulty: "medium" },
  { start: "Radio", end: "Nikola_Tesla", difficulty: "medium" },
  { start: "Penicilina", end: "Segunda_Guerra_Mundial", difficulty: "medium" },
  { start: "Aspirina", end: "Bayer", difficulty: "medium" },
  { start: "Cinematografia", end: "Irmãos_Lumière", difficulty: "medium" },
  { start: "Avião", end: "Santos_Dumont", difficulty: "medium" },
  { start: "Foguete", end: "Guerra_Fria", difficulty: "medium" },
  { start: "Internet", end: "DARPA", difficulty: "medium" },
  { start: "Transistor", end: "Bell_Labs", difficulty: "medium" },
  { start: "Petróleos_Brasileiros", end: "Itamar_Franco", difficulty: "medium" },
  { start: "Malária", end: "Cinchona", difficulty: "medium" },
  { start: "Vacina_contra_COVID-19", end: "Pandemia_de_COVID-19", difficulty: "medium" },
  { start: "Titanic", end: "RMS_Olympic", difficulty: "medium" },
  { start: "Bomba_atômica", end: "Projeto_Manhattan", difficulty: "medium" },
  { start: "Antibióticos", end: "Paul_Ehrlich", difficulty: "medium" },
  { start: "Televisão", end: "Philo_Farnsworth", difficulty: "medium" },
  { start: "Internet", end: "Tim_Berners-Lee", difficulty: "medium" },
  { start: "Computador", end: "ENIAC", difficulty: "medium" },
  { start: "Smartphone", end: "IBM_Simon", difficulty: "medium" },
  { start: "GPS", end: "Sputnik", difficulty: "medium" },
  { start: "Barco_a_vapor", end: "Robert_Fulton", difficulty: "medium" },
  { start: "Submarino", end: "Primeira_Guerra_Mundial", difficulty: "medium" },
  { start: "Paraquedas", end: "Leonardo_da_Vinci", difficulty: "medium" },
  { start: "Amazon_EC2", end: "Virtualização", difficulty: "medium" },
  { start: "Hércules_(Disney)", end: "Monte_Olimpo", difficulty: "medium" },
  { start: "Clorofila", end: "Fotossíntese", difficulty: "medium" },
  { start: "Mochila", end: "Exército_Suíço", difficulty: "medium" },
  { start: "Lixeira", end: "Eugène_Poubelle", difficulty: "medium" },
  { start: "Martelo", end: "Thor", difficulty: "medium" },
  { start: "Foice", end: "Deméter", difficulty: "medium" },
  { start: "Salame", end: "Hungria", difficulty: "medium" },
  { start: "Alquimia", end: "Tabela_periódica", difficulty: "medium" },
  { start: "Batom", end: "Elizabeth_Arden", difficulty: "medium" },
  { start: "Jalapeño", end: "Capsaicina", difficulty: "medium" },
  { start: "Clarinete", end: "Mozart", difficulty: "medium" },
  { start: "Arpão", end: "Moby_Dick", difficulty: "medium" },
  { start: "Fóssil", end: "Mary_Anning", difficulty: "medium" },
  { start: "Mirtilo", end: "Antioxidante", difficulty: "medium" },
  { start: "Alho", end: "Drácula", difficulty: "medium" },
  { start: "Chiclete", end: "Látex", difficulty: "medium" },
  { start: "Pastilha_elástica", end: "Thomas_Adams", difficulty: "medium" },
  { start: "Linho", end: "Antigo_Egito", difficulty: "medium" },
  { start: "Algodão", end: "Eli_Whitney", difficulty: "medium" },
  { start: "Lã", end: "Ovelha_Dolly", difficulty: "medium" },
  { start: "Nylon", end: "Wallace_Carothers", difficulty: "medium" },
  { start: "Poliéster", end: "DuPont", difficulty: "medium" },
  { start: "Seda", end: "Rota_da_Seda", difficulty: "medium" },
  { start: "Pintura_rupestre", end: "Lascaux", difficulty: "medium" },
  { start: "Escultura", end: "Vênus_de_Willendorf", difficulty: "medium" },
  { start: "Arquitetura", end: "Vitrúvio", difficulty: "medium" },
  { start: "Cerâmica", end: "Jomon", difficulty: "medium" },
  { start: "Metal", end: "Idade_dos_Metais", difficulty: "medium" },
  { start: "Vidro", end: "Fenícios", difficulty: "medium" },
  { start: "Papel", end: "Cai_Lun", difficulty: "medium" },
  { start: "Tinta", end: "Índigo", difficulty: "medium" },
  { start: "Borracha", end: "Charles_Goodyear", difficulty: "medium" },
  { start: "Plástico", end: "Bakelite", difficulty: "medium" },
  { start: "Aço", end: "Henry_Bessemer", difficulty: "medium" },
  { start: "Petróleo", end: "Standard_Oil", difficulty: "medium" },
  { start: "Dinamite", end: "Alfred_Nobel", difficulty: "medium" },
  { start: "Têxtil", end: "Revolução_Industrial", difficulty: "medium" },
  { start: "Máquina_de_costura", end: "Isaac_Singer", difficulty: "medium" },
  { start: "Refrigeração", end: "Willis_Carrier", difficulty: "medium" },
  { start: "Laser", end: "Theodore_Maiman", difficulty: "medium" },
  { start: "LED", end: "Nick_Holonyak", difficulty: "medium" },
  { start: "Fibra_óptica", end: "Charles_Kao", difficulty: "medium" },
  { start: "Relógio", end: "John_Harrison", difficulty: "medium" },
  { start: "Energia_nuclear", end: "Enrico_Fermi", difficulty: "medium" },
  { start: "Energia_solar", end: "Alexandre_Edmond_Becquerel", difficulty: "medium" },
  { start: "Energia_eólica", end: "Dom_Quixote", difficulty: "medium" },
  { start: "Hidroelétrica", end: "Nikola_Tesla", difficulty: "medium" },
  { start: "Bitcoin", end: "Satoshi_Nakamoto", difficulty: "medium" },
  { start: "Blockchain", end: "Ethereum", difficulty: "medium" },
  { start: "Inteligência_artificial", end: "Alan_Turing", difficulty: "medium" },
  { start: "Realidade_virtual", end: "Morton_Heilig", difficulty: "medium" },
  { start: "Drone", end: "Nikola_Tesla", difficulty: "medium" },
  { start: "Robótica", end: "Isaac_Asimov", difficulty: "medium" },
  { start: "Nanotecnologia", end: "Richard_Feynman", difficulty: "medium" },
  { start: "Biotecnologia", end: "Herbert_Boyer", difficulty: "medium" },
  { start: "Genética", end: "Gregor_Mendel", difficulty: "medium" },
  { start: "DNA", end: "Rosalind_Franklin", difficulty: "medium" },
  { start: "Clonagem", end: "Dolly_(ovelha)", difficulty: "medium" },
  { start: "Transgênicos", end: "Norman_Borlaug", difficulty: "medium" },
  { start: "Células-tronco", end: "James_Thomson", difficulty: "medium" },
  { start: "Antibiótico", end: "Alexander_Fleming", difficulty: "medium" },
  { start: "Vacina", end: "Edward_Jenner", difficulty: "medium" },
  { start: "Raio-X", end: "Wilhelm_Röntgen", difficulty: "medium" },
  { start: "Tomografia", end: "Godfrey_Hounsfield", difficulty: "medium" },
  { start: "Ressonância_magnética", end: "Raymond_Damadian", difficulty: "medium" },
  { start: "Ultrassom", end: "Ian_Donald", difficulty: "medium" },
  { start: "Endoscopia", end: "Philipp_Bozzini", difficulty: "medium" },
  { start: "Marca-passo", end: "Wilson_Greatbatch", difficulty: "medium" },
  { start: "Prótese", end: "Ambroise_Paré", difficulty: "medium" },
  { start: "Transplante", end: "Christiaan_Barnard", difficulty: "medium" },
  { start: "Hemodiálise", end: "Willem_Kolff", difficulty: "medium" },
  { start: "Insulina", end: "Frederick_Banting", difficulty: "medium" },
  { start: "Aspirina", end: "Felix_Hoffmann", difficulty: "medium" },
  { start: "Pílula_anticoncepcional", end: "Gregory_Pincus", difficulty: "medium" },
  { start: "Viagra", end: "Sildenafil", difficulty: "medium" },
  { start: "Cocaína", end: "Sigmund_Freud", difficulty: "medium" },
  { start: "LSD", end: "Albert_Hofmann", difficulty: "medium" },
  { start: "Penicilina", end: "Howard_Florey", difficulty: "medium" },
  { start: "Morfina", end: "Friedrich_Sertürner", difficulty: "medium" },
  { start: "Quimioterapia", end: "Mustarda_nitrogenada", difficulty: "medium" },
  { start: "Anestesia", end: "Crawford_Long", difficulty: "medium" },
  { start: "Transfusão_de_sangue", end: "Karl_Landsteiner", difficulty: "medium" },
  { start: "Preservativo", end: "Charles_Goodyear", difficulty: "medium" },
  { start: "Óculos", end: "Roger_Bacon", difficulty: "medium" },
  { start: "Lentes_de_contato", end: "Adolf_Fick", difficulty: "medium" },
  { start: "Câmara_de_vídeo", end: "John_Logie_Baird", difficulty: "medium" },
  { start: "MP3", end: "Karlheinz_Brandenburg", difficulty: "medium" },
  { start: "DVD", end: "Toshiba", difficulty: "medium" },
  { start: "Blu-ray", end: "Sony", difficulty: "medium" },
  { start: "Flash_memory", end: "Fujio_Masuoka", difficulty: "medium" },
  { start: "Wi-Fi", end: "NCR_Corporation", difficulty: "medium" },
  { start: "Bluetooth", end: "Harald_Bluetooth", difficulty: "medium" },
  { start: "QR_code", end: "Denso_Wave", difficulty: "medium" },
  { start: "Código_de_barras", end: "Joseph_Woodland", difficulty: "medium" },
  { start: "Cartão_de_crédito", end: "Frank_McNamara", difficulty: "medium" },
  { start: "Caixa_eletrônico", end: "John_Shepherd-Barron", difficulty: "medium" },
  
  // Pares difíceis (150)
  { start: "Origami", end: "Teorema_de_Pitágoras", difficulty: "hard" },
  { start: "Xadrez", end: "Máquina_de_Turing", difficulty: "hard" },
  { start: "Palito_de_dente", end: "Leonardo_da_Vinci", difficulty: "hard" },
  { start: "Forno_de_microondas", end: "Radar", difficulty: "hard" },
  { start: "Post-it", end: "Acupuntura", difficulty: "hard" },
  { start: "Quebra-cabeça", end: "Aristóteles", difficulty: "hard" },
  { start: "Bolha_de_sabão", end: "Geometria_não_euclidiana", difficulty: "hard" },
  { start: "Lego", end: "Arquitetura_Gótica", difficulty: "hard" },
  { start: "Aspirador_de_pó", end: "Tuberculose", difficulty: "hard" },
  { start: "Panela_de_pressão", end: "Motor_a_vapor", difficulty: "hard" },
  { start: "Sushi", end: "Conservação_de_alimentos", difficulty: "hard" },
  { start: "Manteiga", end: "Mongólia", difficulty: "hard" },
  { start: "Sorvete", end: "Medicina_Chinesa", difficulty: "hard" },
  { start: "Lápis", end: "Grafite_(mineral)", difficulty: "hard" },
  { start: "Bateria_(música)", end: "Guerra_dos_Trinta_Anos", difficulty: "hard" },
  { start: "Máquina_de_lavar", end: "Revolução_Francesa", difficulty: "hard" },
  { start: "Bola_de_futebol", end: "Alexandre_o_Grande", difficulty: "hard" },
  { start: "Relógio_de_pulso", end: "Guerra_dos_Bôeres", difficulty: "hard" },
  { start: "Escova_de_dentes", end: "Islã", difficulty: "hard" },
  { start: "Palito_de_fósforo", end: "Charles_Darwin", difficulty: "hard" },
  { start: "Fralda_descartável", end: "Segunda_Guerra_Mundial", difficulty: "hard" },
  { start: "Lâmpada_incandescente", end: "Filosofia_grega", difficulty: "hard" },
  { start: "Spray_aerossol", end: "Camada_de_ozônio", difficulty: "hard" },
  { start: "Ar-condicionado", end: "Mummificação", difficulty: "hard" },
  { start: "Saco_plástico", end: "Naufrágio_do_Titanic", difficulty: "hard" },
  { start: "Bicicleta", end: "Vulcanização", difficulty: "hard" },
  { start: "Asa_delta", end: "Botânica", difficulty: "hard" },
  { start: "Escada_rolante", end: "Coney_Island", difficulty: "hard" },
  { start: "Elevador", end: "Exposição_Mundial_de_1889", difficulty: "hard" },
  { start: "Fechadura", end: "Algebra", difficulty: "hard" },
  { start: "Câmera_descartável", end: "Tuberculose", difficulty: "hard" },
  { start: "Pilha_alcalina", end: "Apollo_11", difficulty: "hard" },
  { start: "Roda_gigante", end: "Revolução_Industrial", difficulty: "hard" },
  { start: "Piano", end: "Cristóvão_Colombo", difficulty: "hard" },
  { start: "Guarda-chuva", end: "Samuel_Fox", difficulty: "hard" },
  { start: "Moto-serra", end: "Obstetrícia", difficulty: "hard" },
  { start: "Vaso_sanitário", end: "Thomas_Crapper", difficulty: "hard" },
  { start: "Cubo_mágico", end: "Arquitetura", difficulty: "hard" },
  { start: "Boomerang", end: "Aerodinâmica", difficulty: "hard" },
  { start: "Estalactite", end: "Urbanização", difficulty: "hard" },
  { start: "Escavadeira", end: "Paleontologia", difficulty: "hard" },
  { start: "Lente_de_contato", end: "René_Descartes", difficulty: "hard" },
  { start: "Tobogã", end: "Império_Russo", difficulty: "hard" },
  { start: "Castelo_de_areia", end: "Engenharia_Civil", difficulty: "hard" },
  { start: "Pão_de_forma", end: "Primeira_Guerra_Mundial", difficulty: "hard" },
  { start: "Guarda-sol", end: "Medicina_chinesa", difficulty: "hard" },
  { start: "Sapatilha_de_balé", end: "Revolução_Francesa", difficulty: "hard" },
  { start: "Sauna", end: "Xamanismo", difficulty: "hard" },
  { start: "Caixa_registradora", end: "Proibição", difficulty: "hard" },
  { start: "Alfinete", end: "Revolução_Industrial", difficulty: "hard" },
  { start: "Grampeador", end: "Luís_XIV_de_França", difficulty: "hard" },
  { start: "Tesoura", end: "Leonardo_da_Vinci", difficulty: "hard" },
  { start: "Geladeira", end: "Michael_Faraday", difficulty: "hard" },
  { start: "Mata-moscas", end: "Doença_do_Sono", difficulty: "hard" },
  { start: "Anzol", end: "Idade_da_Pedra", difficulty: "hard" },
  { start: "Papel_alumínio", end: "Napoleão_III_de_França", difficulty: "hard" },
  { start: "Rolha", end: "Dom_Pérignon", difficulty: "hard" },
  { start: "Colher", end: "Etruscos", difficulty: "hard" },
  { start: "Garfo", end: "Catarina_de_Médici", difficulty: "hard" },
  { start: "Palito_de_dente", end: "Higiene_oral", difficulty: "hard" },
  { start: "Interruptor_de_luz", end: "John_Henry_Holmes", difficulty: "hard" },
  { start: "Salto_alto", end: "Luís_XIV_de_França", difficulty: "hard" },
  { start: "Mola", end: "Robert_Hooke", difficulty: "hard" },
  { start: "Clipe_de_papel", end: "Johan_Vaaler", difficulty: "hard" },
  { start: "Sabonete", end: "Azeite_de_oliva", difficulty: "hard" },
  { start: "Cotonete", end: "Leo_Gerstenzang", difficulty: "hard" },
  { start: "Pasta_de_dente", end: "Washington_Sheffield", difficulty: "hard" },
  { start: "Escova_de_cabelo", end: "Hugh_Rock", difficulty: "hard" },
  { start: "Pente", end: "Cleópatra", difficulty: "hard" },
  { start: "Moeda", end: "Rei_Creso", difficulty: "hard" },
  { start: "Bússola", end: "Dinastia_Han", difficulty: "hard" },
  { start: "Óculos_de_sol", end: "Esquimós", difficulty: "hard" },
  { start: "Lâmina_de_barbear", end: "King_Camp_Gillette", difficulty: "hard" },
  { start: "Canudinho", end: "Marvin_Stone", difficulty: "hard" },
  { start: "Porta-copos", end: "Cervejaria_Alemã", difficulty: "hard" },
  { start: "Sacola_de_compras", end: "Margaret_Thatcher", difficulty: "hard" },
  { start: "Balão", end: "Irmãos_Montgolfier", difficulty: "hard" },
  { start: "Chupeta", end: "Christian_Meinecke", difficulty: "hard" },
  { start: "Liquidificador", end: "Stephen_Poplawski", difficulty: "hard" },
  { start: "Chave_de_fenda", end: "Egito_Antigo", difficulty: "hard" },
  { start: "Martelo", end: "Idade_do_Bronze", difficulty: "hard" },
  { start: "Prego", end: "Império_Romano", difficulty: "hard" },
  { start: "Serra", end: "Egito_Antigo", difficulty: "hard" },
  { start: "Furadeira", end: "Egito_Antigo", difficulty: "hard" },
  { start: "Alicate", end: "Bronze", difficulty: "hard" },
  { start: "Enxada", end: "Neolítico", difficulty: "hard" },
  { start: "Arado", end: "Mesopotâmia", difficulty: "hard" },
  { start: "Foice", end: "Neolítico", difficulty: "hard" },
  { start: "Machado", end: "Idade_da_Pedra", difficulty: "hard" },
  { start: "Roda_d'água", end: "Vitrúvio", difficulty: "hard" },
  { start: "Moinho_de_vento", end: "Pérsia", difficulty: "hard" },
  { start: "Catapulta", end: "Dionísio_I_de_Siracusa", difficulty: "hard" },
  { start: "Arco_e_flecha", end: "Paleolítico_Superior", difficulty: "hard" },
  { start: "Lança", end: "Paleolítico", difficulty: "hard" },
  { start: "Espada", end: "Idade_do_Bronze", difficulty: "hard" },
  { start: "Escudo", end: "Idade_do_Bronze", difficulty: "hard" },
  { start: "Armadura", end: "Idade_Média", difficulty: "hard" },
  { start: "Canhão", end: "Pólvora", difficulty: "hard" },
  { start: "Mosquete", end: "Guerra_dos_Cem_Anos", difficulty: "hard" },
  { start: "Revólver", end: "Samuel_Colt", difficulty: "hard" },
  { start: "Metralhadora", end: "Richard_Gatling", difficulty: "hard" },
  { start: "Tanque_de_guerra", end: "Leonardo_da_Vinci", difficulty: "hard" },
  { start: "Submarino", end: "Leonardo_da_Vinci", difficulty: "hard" },
  { start: "Navio_de_guerra", end: "Fenícios", difficulty: "hard" },
  { start: "Porta-aviões", end: "Primeira_Guerra_Mundial", difficulty: "hard" },
  { start: "Bombardeiro", end: "Primeira_Guerra_Mundial", difficulty: "hard" },
  { start: "Míssil", end: "V-2_(míssil)", difficulty: "hard" },
  { start: "Bomba_nuclear", end: "Robert_Oppenheimer", difficulty: "hard" },
  { start: "GPS", end: "Guerra_Fria", difficulty: "hard" },
  { start: "Radar", end: "Robert_Watson-Watt", difficulty: "hard" },
  { start: "Sonar", end: "Paul_Langevin", difficulty: "hard" },
  { start: "Satélite_artificial", end: "Sputnik_1", difficulty: "hard" },
  { start: "Foguete", end: "Robert_Goddard", difficulty: "hard" },
  { start: "Estação_Espacial", end: "Salyut_1", difficulty: "hard" },
  { start: "Telescópio_espacial", end: "Edwin_Hubble", difficulty: "hard" },
  { start: "Sonda_espacial", end: "Luna_1", difficulty: "hard" },
  { start: "Rover_lunar", end: "Apollo_15", difficulty: "hard" },
  { start: "Traje_espacial", end: "Alexei_Leonov", difficulty: "hard" },
  { start: "Módulo_lunar", end: "Neil_Armstrong", difficulty: "hard" },
  { start: "Ônibus_espacial", end: "Richard_Nixon", difficulty: "hard" },
  { start: "Cinto_de_segurança", end: "Volvo", difficulty: "hard" },
  { start: "Airbag", end: "John_W._Hetrick", difficulty: "hard" },
  { start: "ABS_(freio)", end: "Aeronáutica", difficulty: "hard" },
  { start: "GPS_automotivo", end: "Etak", difficulty: "hard" },
  { start: "Motor_elétrico", end: "Michael_Faraday", difficulty: "hard" },
  { start: "Bateria_(eletricidade)", end: "Alessandro_Volta", difficulty: "hard" },
  { start: "Pilha_recarregável", end: "Waldemar_Jungner", difficulty: "hard" },
  { start: "Controle_remoto", end: "Nikola_Tesla", difficulty: "hard" },
  { start: "Mouse_(informática)", end: "Douglas_Engelbart", difficulty: "hard" },
  { start: "Teclado_(informática)", end: "Christopher_Sholes", difficulty: "hard" },
  { start: "Monitor", end: "Braun_tube", difficulty: "hard" },
  { start: "Impressora", end: "Charles_Babbage", difficulty: "hard" },
  { start: "Scanner", end: "Russell_Kirsch", difficulty: "hard" },
  { start: "Disco_rígido", end: "IBM_305_RAMAC", difficulty: "hard" },
  { start: "Disquete", end: "IBM", difficulty: "hard" },
  { start: "CD-ROM", end: "James_Russell", difficulty: "hard" },
  { start: "DVD", end: "Philips", difficulty: "hard" },
  { start: "Blu-ray", end: "Sony", difficulty: "hard" },
  { start: "Pen_drive", end: "IBM", difficulty: "hard" },
  { start: "SSD", end: "StorageTek", difficulty: "hard" },
  { start: "Wi-Fi", end: "CSIRO", difficulty: "hard" },
  { start: "Bluetooth", end: "Ericsson", difficulty: "hard" },
  { start: "NFC", end: "Sony", difficulty: "hard" },
  { start: "RFID", end: "Segunda_Guerra_Mundial", difficulty: "hard" },
  { start: "QR_Code", end: "Toyota", difficulty: "hard" },
  { start: "Código_de_barras", end: "Bernard_Silver", difficulty: "hard" },
  { start: "Cartão_de_crédito", end: "Diners_Club", difficulty: "hard" },
  { start: "Caixa_eletrônico", end: "Barclays", difficulty: "hard" },
  { start: "Bitcoin", end: "Criptografia", difficulty: "hard" },
  { start: "Motocicleta", end: "Gottlieb_Daimler", difficulty: "hard" },
  { start: "Helicóptero", end: "Igor_Sikorsky", difficulty: "hard" }
];

// Componentes básicos para substituir os do Spark
const Button = ({ children, variant = "default", icon, onClick, className = "", ...props }) => {
  const variants = {
    default: "btn btn-secondary",
    primary: "btn btn-primary",
    plain: "btn btn-plain"
  };

  return (
    <button 
      className={`${variants[variant] || variants.default} ${className}`}
      onClick={onClick}
      {...props}
    >
      {icon && <span className="text-lg">{icon}</span>}
      {children}
    </button>
  );
};

const Card = ({ children, className = "", ...props }) => (
  <div className={`card ${className}`} {...props}>
    {children}
  </div>
);

const Dialog = ({ open, onOpenChange, children }) => {
  if (!open) return null;
  
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-body">
          {children}
        </div>
        <div className="modal-footer">
          <button 
            onClick={() => onOpenChange(false)} 
            className="btn btn-secondary"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

const DialogContent = ({ children }) => <div>{children}</div>;
const DialogHeader = ({ children }) => <div className="modal-header">{children}</div>;
const DialogTitle = ({ children }) => <h2 className="modal-title">{children}</h2>;
const DialogDescription = ({ children }) => <div>{children}</div>;
const PageContainer = ({ children, maxWidth = "large" }) => {
  const maxWidths = {
    small: "container max-w-md",
    medium: "container max-w-2xl",
    large: "container max-w-5xl"
  };
  
  return (
    <div className={maxWidths[maxWidth]}>
      {children}
    </div>
  );
};

// Componente de animação para celebração
const Celebration = () => {
  const [confetti, setConfetti] = React.useState([]);
  const confettiColors = ['#4361ee', '#4895ef', '#7209b7', '#f72585', '#4cc9f0', '#f9c74f'];
  
  React.useEffect(() => {
    // Criar 50 confetes com posições e cores aleatórias
    const newConfetti = [...Array(50)].map((_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: -20 - Math.random() * 100,
      color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
      size: 5 + Math.random() * 10,
      animationDuration: 2 + Math.random() * 2
    }));
    
    setConfetti(newConfetti);
    
    return () => {
      // Limpar áudio se necessário
    };
  }, []);

  return (
    <div className="celebration-container">
      {confetti.map((c) => (
        <div
          key={c.id}
          className="confetti"
          style={{
            left: c.x + 'px',
            top: c.y + 'px',
            width: c.size + 'px',
            height: c.size + 'px',
            backgroundColor: c.color,
            animationDuration: c.animationDuration + 's'
          }}
        />
      ))}
      
      {/* Sparkles em torno do troféu */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="sparkle"
          style={{
            top: `${50 + Math.sin(i / 5 * Math.PI * 2) * 30}%`,
            left: `${50 + Math.cos(i / 5 * Math.PI * 2) * 30}%`,
            animationDelay: `${i * 0.3}s`
          }}
        />
      ))}
    </div>
  );
};

function App() {
  const [showMenu, setShowMenu] = React.useState(true);
  const [showTutorial, setShowTutorial] = React.useState(false);
  const [currentArticle, setCurrentArticle] = React.useState("");
  const [darkMode, setDarkMode] = React.useState(false);
  const [gameState, setGameState] = React.useState({
    startArticle: "",
    endArticle: "",
    clicksLeft: 5,
    path: [],
    isComplete: false,
    showCelebration: false
  });
  const [loading, setLoading] = React.useState(false);
  const [animationVisible, setAnimationVisible] = React.useState(false);
  const [showDebug, setShowDebug] = React.useState(false);
  const [debugMessage, setDebugMessage] = React.useState("");

  // Aplica o tema escuro ao documento
  React.useEffect(() => {
    // Verificar se há preferência salva no localStorage
    const savedTheme = localStorage.getItem('decaprala-theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.body.classList.add('dark-theme');
    }
    
    // Verificar preferência do sistema se não houver tema salvo
    if (!savedTheme) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(prefersDark);
      if (prefersDark) document.body.classList.add('dark-theme');
    }

    // Ativar as animações após um breve delay para permitir que a página carregue
    setTimeout(() => {
      setAnimationVisible(true);
    }, 300);

    // Verificar a validez de todos os pares quando está em modo de desenvolvimento
    if (process.env.NODE_ENV === 'development') {
      const queryParams = new URLSearchParams(window.location.search);
      if (queryParams.get('validatePairs') === 'true') {
        validateAllPairs();
      }
    }
  }, []);

  // Função para validar a existência de um artigo na Wikipedia
  const validateWikipediaArticle = async (title) => {
    try {
      const encodedTitle = encodeURIComponent(title);
      const response = await fetch(
        `https://pt.wikipedia.org/w/api.php?action=query&titles=${encodedTitle}&format=json&origin=*`
      );
      const data = await response.json();
      
      // Se a API retornar "missing" para a página, o artigo não existe
      const pages = data.query.pages;
      const pageId = Object.keys(pages)[0];
      
      return !('missing' in pages[pageId]);
    } catch (error) {
      console.error(`Erro ao validar artigo "${title}":`, error);
      return false;
    }
  };

  // Função para validar um par específico
  const validatePair = async (pair) => {
    const startExists = await validateWikipediaArticle(pair.start);
    const endExists = await validateWikipediaArticle(pair.end);
    
    return {
      pair,
      startExists,
      endExists,
      isValid: startExists && endExists
    };
  };
  
  // Função para validar todos os pares (útil para desenvolvimento)
  const validateAllPairs = async () => {
    setDebugMessage("Iniciando validação de pares...");
    setShowDebug(true);
    
    const results = {
      valid: [],
      invalid: []
    };
    
    // Limitar a validação para não sobrecarregar a API
    const pairsToValidate = GAME_PAIRS.slice(0, 50); // valida apenas 50 de cada vez
    
    for (const pair of pairsToValidate) {
      const result = await validatePair(pair);
      if (result.isValid) {
        results.valid.push(pair);
      } else {
        results.invalid.push({
          pair: pair,
          startExists: result.startExists,
          endExists: result.endExists
        });
      }
      
      setDebugMessage(prev => `${prev}\nValidando: ${pair.start} -> ${pair.end} (${result.isValid ? 'Válido' : 'Inválido'})`);
    }
    
    console.log('Resultado da validação:', results);
    setDebugMessage(prev => `${prev}\n\nValidação concluída!\nPares válidos: ${results.valid.length}\nPares inválidos: ${results.invalid.length}\nVeja detalhes no console.`);
    
    return results;
  };

  // Toggle tema escuro/claro
  const toggleDarkMode = () => {
    setDarkMode(prevMode => {
      const newMode = !prevMode;
      if (newMode) {
        document.body.classList.add('dark-theme');
        localStorage.setItem('decaprala-theme', 'dark');
      } else {
        document.body.classList.remove('dark-theme');
        localStorage.setItem('decaprala-theme', 'light');
      }
      return newMode;
    });
  };

  // Initialize game with random pair
  const startGame = () => {
    const randomPair = GAME_PAIRS[Math.floor(Math.random() * GAME_PAIRS.length)];
    setGameState({
      startArticle: randomPair.start,
      endArticle: randomPair.end,
      clicksLeft: 5,
      path: [randomPair.start],
      isComplete: false,
      showCelebration: false
    });
    loadArticle(randomPair.start);
    setShowMenu(false);
  };

  // Function to load Wikipedia article content
  const loadArticle = async (title) => {
    setLoading(true);
    try {
      // Usando encodeURIComponent para codificar corretamente o título do artigo
      const encodedTitle = encodeURIComponent(title);
      const response = await fetch(
        `https://pt.wikipedia.org/w/api.php?action=parse&page=${encodedTitle}&format=json&origin=*&prop=text|categories|sections`
      );
      const data = await response.json();
      
      if (data.error) {
        throw new Error(`Erro da API Wikipedia: ${data.error.info}`);
      }
      
      if (data.parse && data.parse.text) {
        const content = data.parse.text["*"];
        setCurrentArticle(processWikiContent(content));
      } else {
        // Artigo não encontrado, mostrar erro
        setCurrentArticle(`<div class="wiki-error">
          <h2>Artigo não encontrado</h2>
          <p>O artigo "${title}" não foi encontrado na Wikipedia em português.</p>
          <p>Isso pode ser um erro no par de artigos. Tente iniciar um novo jogo.</p>
        </div>`);
      }
    } catch (error) {
      console.error("Error loading article:", error);
      setCurrentArticle(`<div class="wiki-error">
        <h2>Erro ao carregar artigo</h2>
        <p>Ocorreu um erro ao carregar "${title}".</p>
        <p>Detalhes: ${error.message}</p>
      </div>`);
    }
    setLoading(false);
  };

  // Process Wikipedia content to make links clickable and improve layout
  const processWikiContent = (content) => {
    const div = document.createElement("div");
    div.innerHTML = content;
    
    // Remove unwanted elements
    const unwanted = div.querySelectorAll('.mw-editsection, .reference, .noprint, .mw-empty-elt');
    unwanted.forEach(el => el.remove());
    
    // Convert relative links to absolute and add click handlers
    div.querySelectorAll('a').forEach(link => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('/wiki/')) {
        const title = href.replace('/wiki/', '');
        // Skip files and special pages
        if (!title.includes('File:') && !title.includes('Special:')) {
          link.setAttribute('data-wiki-link', title);
          link.href = '#';
        } else {
          // Remove links to files and special pages
          link.replaceWith(...link.childNodes);
        }
      } else {
        // Remove external links
        link.replaceWith(...link.childNodes);
      }
    });
    
    return div.innerHTML;
  };

  // Handle link clicks in the article
  const handleLinkClick = (event) => {
    const link = event.target.closest('a[data-wiki-link]');
    if (!link) return;
    
    event.preventDefault();
    const title = link.getAttribute('data-wiki-link');
    
    if (gameState.clicksLeft > 0 && !gameState.isComplete) {
      const newPath = [...gameState.path, title];
      
      // Verifica se encontrou o artigo de destino de forma mais flexível
      const isComplete = checkArticleMatch(title, gameState.endArticle);
      
      setGameState(prev => ({
        ...prev,
        clicksLeft: prev.clicksLeft - 1,
        path: newPath,
        isComplete,
        showCelebration: isComplete // Ativar celebração se completar
      }));
      
      loadArticle(title);
    }
  };

  // Função para comparar títulos de artigos de forma flexível
  const checkArticleMatch = (currentArticle, targetArticle) => {
    // Verificação exata
    if (currentArticle === targetArticle) return true;
    
    // Decodificar URLs codificadas
    let currentDecoded = currentArticle;
    let targetDecoded = targetArticle;
    
    try {
      currentDecoded = decodeURIComponent(currentArticle);
      targetDecoded = decodeURIComponent(targetArticle);
    } catch (e) {
      // Ignora erros de decodificação
    }
    
    // Se após decodificar são iguais
    if (currentDecoded === targetDecoded) return true;
    
    // Normalizar ambos os títulos (remover acentos, underscores e transformar em minúsculas)
    const normalize = (str) => {
      try {
        // Primeiro tenta decodificar se for uma string codificada em URL
        let decodedStr = str;
        try {
          decodedStr = decodeURIComponent(str);
        } catch (e) {
          // Se não conseguir decodificar, ignora e usa a string original
        }
        
        return decodedStr
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')  // remove acentos
          .replace(/_/g, ' ')               // substitui underscores por espaços
          .toLowerCase()                    // converte para minúsculas
          .trim();                          // remove espaços extras
      } catch (e) {
        // Em caso de erro, retorna uma versão simplificada
        return str
          .replace(/_/g, ' ')
          .toLowerCase()
          .trim();
      }
    };
    
    const normalizedCurrent = normalize(currentArticle);
    const normalizedTarget = normalize(targetArticle);
    
    // Verificação normalizada
    if (normalizedCurrent === normalizedTarget) return true;
    
    // Lista de variações conhecidas para artigos específicos
    const articleVariations = {
      'harald_bluetooth': ['haroldo_i_bluetooth', 'haroldo_bluetooth', 'haroldo_i_da_dinamarca', 'harald_i_bluetooth'],
      'albert_einstein': ['einstein', 'albert_eintein'],
      'segunda_guerra_mundial': ['2ª_guerra_mundial', 'ii_guerra_mundial', 'segunda_guerra', '2a_guerra_mundial'],
      'primeira_guerra_mundial': ['1ª_guerra_mundial', 'i_guerra_mundial', 'primeira_guerra', '1a_guerra_mundial'],
      'revolução_industrial': ['industria', 'industrializacao', 'industrialização', 'revolucao_industrial'],
      'reino_unido': ['inglaterra', 'gra_bretanha', 'grã_bretanha', 'great_britain'],
      'mudanças_climáticas': ['aquecimento_global', 'mudanca_climatica', 'crise_climatica'],
      'escocia': ['escócia', 'scotland', 'reino_da_escócia'],
      'leonardo_da_vinci': ['da_vinci', 'leonardo'],
      'inteligência_artificial': ['ia', 'ai', 'inteligencia_artificial'],
      'estados_unidos': ['eua', 'america', 'américa', 'usa', 'united_states'],
      'jogos_olímpicos': ['jogos_olimpicos', 'olimpíadas', 'olimpiadas'],
      'filosofia_grega': ['filosofia_da_grecia_antiga', 'filosofos_gregos'],
      'egito_antigo': ['antigo_egito', 'civilização_egípcia', 'civilizacao_egipcia'],
      'grécia_antiga': ['grecia_antiga', 'antiga_grécia', 'antiga_grecia'],
      'revolução_francesa': ['revolucao_francesa', 'revolucao_francesa'],
      'máquina_de_lavar': ['maquina_de_lavar', 'maquina_de_lavar_roupa', 'máquina_de_lavar_roupa', 'lavadora']
    };
    
    // Verificar se há correspondência em variações conhecidas
    for (const [base, variations] of Object.entries(articleVariations)) {
      if (normalize(base) === normalizedTarget && variations.some(v => normalize(v) === normalizedCurrent)) {
        return true;
      }
      if (normalize(base) === normalizedCurrent && variations.some(v => normalize(v) === normalizedTarget)) {
        return true;
      }
    }
    
    // Verificar correspondência com caracteres codificados em URL
    const checkURLEncoded = (str1, str2) => {
      if (decodeURIComponent(str1).replace(/_/g, ' ').toLowerCase() === 
          decodeURIComponent(str2).replace(/_/g, ' ').toLowerCase()) {
        return true;
      }
      return false;
    };
    
    try {
      if (checkURLEncoded(currentArticle, targetArticle)) return true;
    } catch (e) {
      // Ignora erros de decodificação
    }
    
    // Verificar se um é parte significativa do outro (para casos como "Platão" vs "Filosofia_de_Platão")
    if ((normalizedCurrent.includes(normalizedTarget) && normalizedTarget.length > 5) || 
        (normalizedTarget.includes(normalizedCurrent) && normalizedCurrent.length > 5)) {
      return true;
    }
    
    return false;
  };

  // Reset game with a new random pair
  const resetGame = () => {
    setShowMenu(true);
  };

  // Função para normalizar strings (decodificar URLs e limpar Unicode)
  const normalizeString = (str) => {
    try {
      // Primeiro tenta decodificar se for uma string codificada em URL
      let decodedStr = decodeURIComponent(str);
      
      // Substituir caracteres Unicode codificados em forma %C3%xx
      decodedStr = decodedStr.replace(/%C3%A1/g, 'á')
                             .replace(/%C3%A0/g, 'à')
                             .replace(/%C3%A2/g, 'â')
                             .replace(/%C3%A3/g, 'ã')
                             .replace(/%C3%A9/g, 'é')
                             .replace(/%C3%A8/g, 'è')
                             .replace(/%C3%AA/g, 'ê')
                             .replace(/%C3%AD/g, 'í')
                             .replace(/%C3%AC/g, 'ì')
                             .replace(/%C3%B3/g, 'ó')
                             .replace(/%C3%B2/g, 'ò')
                             .replace(/%C3%B4/g, 'ô')
                             .replace(/%C3%B5/g, 'õ')
                             .replace(/%C3%BA/g, 'ú')
                             .replace(/%C3%B9/g, 'ù')
                             .replace(/%C3%A7/g, 'ç')
                             .replace(/%C3%87/g, 'Ç')
                             .replace(/%C3%81/g, 'Á')
                             .replace(/%C3%80/g, 'À')
                             .replace(/%C3%82/g, 'Â')
                             .replace(/%C3%83/g, 'Ã')
                             .replace(/%C3%89/g, 'É')
                             .replace(/%C3%88/g, 'È')
                             .replace(/%C3%8A/g, 'Ê')
                             .replace(/%C3%8D/g, 'Í')
                             .replace(/%C3%8C/g, 'Ì')
                             .replace(/%C3%93/g, 'Ó')
                             .replace(/%C3%92/g, 'Ò')
                             .replace(/%C3%94/g, 'Ô')
                             .replace(/%C3%95/g, 'Õ')
                             .replace(/%C3%9A/g, 'Ú')
                             .replace(/%C3%99/g, 'Ù');
      
      // Substitui underscores por espaços para melhor legibilidade
      return decodedStr.replace(/_/g, ' ');
    } catch (e) {
      // Se falhar a decodificação, tenta lidar com a string original diretamente
      let result = str.replace(/_/g, ' ');
      
      // Tenta substituir manualmente sequências de caracteres UTF-8 comuns
      result = result.replace(/%C3%A1/g, 'á')
                     .replace(/%C3%A0/g, 'à')
                     .replace(/%C3%A2/g, 'â')
                     .replace(/%C3%A3/g, 'ã')
                     .replace(/%C3%A9/g, 'é')
                     .replace(/%C3%A8/g, 'è')
                     .replace(/%C3%AA/g, 'ê')
                     .replace(/%C3%AD/g, 'í')
                     .replace(/%C3%AC/g, 'ì')
                     .replace(/%C3%B3/g, 'ó')
                     .replace(/%C3%B2/g, 'ò')
                     .replace(/%C3%B4/g, 'ô')
                     .replace(/%C3%B5/g, 'õ')
                     .replace(/%C3%BA/g, 'ú')
                     .replace(/%C3%B9/g, 'ù')
                     .replace(/%C3%A7/g, 'ç')
                     .replace(/%C3%87/g, 'Ç')
                     .replace(/%C3%81/g, 'Á')
                     .replace(/%C3%80/g, 'À')
                     .replace(/%C3%82/g, 'Â')
                     .replace(/%C3%83/g, 'Ã')
                     .replace(/%C3%89/g, 'É')
                     .replace(/%C3%88/g, 'È')
                     .replace(/%C3%8A/g, 'Ê')
                     .replace(/%C3%8D/g, 'Í')
                     .replace(/%C3%8C/g, 'Ì')
                     .replace(/%C3%93/g, 'Ó')
                     .replace(/%C3%92/g, 'Ò')
                     .replace(/%C3%94/g, 'Ô')
                     .replace(/%C3%95/g, 'Õ')
                     .replace(/%C3%9A/g, 'Ú')
                     .replace(/%C3%99/g, 'Ù');
      
      return result;
    }
  };

  // Componente para o botão de alternância de tema
  const ThemeToggle = () => (
    <div className="theme-switch">
      <button 
        className="theme-switch-button animate-wiggle" 
        onClick={toggleDarkMode} 
        aria-label={darkMode ? "Ativar modo claro" : "Ativar modo escuro"}
      >
        {darkMode ? <Sun size={24} weight="bold" /> : <Moon size={24} weight="bold" />}
      </button>
    </div>
  );

  if (showMenu) {
    return (
      <div className="app-container">
        <ThemeToggle />
        <PageContainer maxWidth="small">
          <div className="py-12">
            <Card className={`menu-card p-8 ${animationVisible ? 'animate-entrance' : ''}`}>
              <div className="flex flex-col items-center gap-8 text-center">
                <h1 className={`fancy-title ${animationVisible ? 'animate-title' : ''}`}>5CLIQUES</h1>
                <p className={`text-lg text-gray-700 ${animationVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{animationDelay: '0.3s'}}>
                  Conecte dois artigos da Wikipedia em 5 cliques ou menos!
                </p>
                
                {/* Contador de combinações disponíveis */}
                <div className={`combinations-counter ${animationVisible ? 'animate-scale-in animate-float' : 'opacity-0'}`} style={{animationDelay: '0.5s'}}>
                  <div className="counter-value">{GAME_PAIRS.length}</div>
                  <div className="counter-label">combinações disponíveis</div>
                </div>
                
                <div className="flex flex-col gap-4 w-full max-w-sm">
                  <Button
                    variant="primary"
                    icon={<Play />}
                    onClick={startGame}
                    className={`btn-large btn-block ${animationVisible ? 'animate-slide-up animate-wiggle' : 'opacity-0'}`}
                    style={{animationDelay: '0.7s'}}
                  >
                    Jogar
                  </Button>
                  <Button
                    icon={<Question />}
                    onClick={() => setShowTutorial(true)}
                    className={`btn-block ${animationVisible ? 'animate-slide-up' : 'opacity-0'}`}
                    style={{animationDelay: '0.9s'}}
                  >
                    Como Jogar
                  </Button>
                  <Button
                    icon={<Lightning />}
                    onClick={validateAllPairs}
                    className={`btn-block ${animationVisible ? 'animate-slide-up' : 'opacity-0'}`}
                    style={{animationDelay: '1.1s'}}
                  >
                    Validar Artigos
                  </Button>
                </div>
                
                {/* Informação do criador */}
                <div className={`creator-info ${animationVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{animationDelay: '1.3s'}}>
                  <p>Desenvolvido por David Silva</p>
                  <a href="mailto:davosalm@gmail.com" className="creator-email">
                    davosalm@gmail.com
                  </a>
                </div>
              </div>
            </Card>
          </div>
        </PageContainer>

        <Dialog open={showTutorial} onOpenChange={setShowTutorial}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Como Jogar</DialogTitle>
              <DialogDescription>
                <div className="space-y-4">
                  <p className="flex items-center gap-2 mb-3 animate-slide-in" style={{animationDelay: '0.1s'}}>
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary-100 text-primary-600 font-bold">1</span>
                    Você receberá dois artigos da Wikipedia: um inicial e um final
                  </p>
                  <p className="flex items-center gap-2 mb-3 animate-slide-in" style={{animationDelay: '0.2s'}}>
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary-100 text-primary-600 font-bold">2</span>
                    Navegue pelos links dentro dos artigos para chegar ao artigo final
                  </p>
                  <p className="flex items-center gap-2 mb-3 animate-slide-in" style={{animationDelay: '0.3s'}}>
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary-100 text-primary-600 font-bold">3</span>
                    Você tem apenas 5 cliques para completar o desafio
                  </p>
                  <p className="flex items-center gap-2 mb-3 animate-slide-in" style={{animationDelay: '0.4s'}}>
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary-100 text-primary-600 font-bold">4</span>
                    Escolha seus cliques com sabedoria para criar um caminho entre os artigos!
                  </p>
                  <p className="mt-4 text-center animate-fade-in" style={{animationDelay: '0.6s'}}>
                    <strong>Total de {GAME_PAIRS.length} combinações diferentes para testar suas habilidades!</strong>
                  </p>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <div className="app-container">
      <ThemeToggle />
      {gameState.showCelebration && <Celebration />}
      {showDebug && (
        <div className="debug-panel">
          <h3>Painel de Debug</h3>
          <pre>{debugMessage}</pre>
          <button onClick={() => setShowDebug(false)} className="btn btn-sm">Fechar</button>
        </div>
      )}
      <PageContainer maxWidth="large">
        <div className="py-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <Button
                  variant="plain"
                  icon={<House size={24} />}
                  onClick={resetGame}
                  aria-label="Voltar ao menu"
                />
                <h1 className="text-2xl font-bold">5CLIQUES</h1>
              </div>
              <div className="game-stats">
                <Timer size={20} weight="bold" className="text-primary" />
                <span className="font-medium">
                  Cliques restantes: <strong>{gameState.clicksLeft}</strong>
                </span>
              </div>
            </div>
            
            {/* Path visualization - com tratamento para URLs codificadas */}
            <div className="path-container">
              <div className="flex items-center gap-2 flex-nowrap min-w-max">
                {gameState.path.map((article, index) => (
                  <React.Fragment key={index}>
                    <span className="path-item" style={{animationDelay: `${index * 0.1}s`}}>
                      {normalizeString(article)}
                    </span>
                    {index < gameState.path.length - 1 && (
                      <CaretRight size={20} className="path-arrow" style={{animationDelay: `${index * 0.1 + 0.05}s`}} />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div className="game-info">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 badge">
                  <BookOpen size={20} weight="bold" className="text-primary" />
                  <span>De: <strong>{normalizeString(gameState.startArticle)}</strong></span>
                </div>
                <ArrowRight size={20} className="text-gray-700" />
                <div className="flex items-center gap-2 badge">
                  <Brain size={20} weight="bold" className="text-secondary" />
                  <span>Para: <strong>{normalizeString(gameState.endArticle)}</strong></span>
                </div>
              </div>
              
              <Button 
                variant="primary"
                icon={<Lightning size={20} weight="bold" />}
                onClick={startGame}
              >
                Novo Jogo
              </Button>
            </div>

            {gameState.isComplete && (
              <div className="game-alert game-alert-success">
                <div className="trophy-celebration">
                  <Trophy size={32} weight="fill" className="text-yellow-500" />
                </div>
                <span className="victory-text">
                  Parabéns! Você conseguiu chegar ao destino em <strong>{5 - gameState.clicksLeft}</strong> cliques!
                </span>
              </div>
            )}

            {gameState.clicksLeft === 0 && !gameState.isComplete && (
              <div className="game-alert game-alert-warning">
                <span className="text-warning font-medium">
                  Acabaram seus cliques! Tente novamente com um novo par de artigos.
                </span>
              </div>
            )}

            <Card className="wiki-content" onClick={handleLinkClick}>
              {loading ? (
                <div className="loader">
                  <div className="loader-dot"></div>
                  <div className="loader-dot"></div>
                  <div className="loader-dot"></div>
                </div>
              ) : (
                <div dangerouslySetInnerHTML={{ __html: currentArticle }} />
              )}
            </Card>
          </Card>
        </div>
      </PageContainer>
    </div>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<App />);
