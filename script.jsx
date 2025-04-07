import * as React from "react";
import { createRoot } from "react-dom/client";
import { Trophy, ArrowRight, BookOpen, Brain, Lightning, Timer, CaretRight, Question, Play, House, Sun, Moon } from "@phosphor-icons/react";

const GAME_PAIRS = [
  { start: "Neymar", end: "Albert_Einstein" },
  { start: "Açaí", end: "Revolução_Industrial" },
  { start: "Futebol", end: "Filosofia" },
  { start: "Carnaval", end: "Física_Quântica" },
  { start: "Samba", end: "Inteligência_Artificial" },
  { start: "Pelé", end: "Segunda_Guerra_Mundial" },
  { start: "Amazonas", end: "Teoria_da_Relatividade" },
  { start: "Bossa_Nova", end: "Napoleão_Bonaparte" },
  { start: "Feijoada", end: "Revolução_Francesa" },
  { start: "Copacabana", end: "Leonardo_da_Vinci" },
  { start: "Capoeira", end: "Revolução_Russa" },
  { start: "Ipanema", end: "Charles_Darwin" },
  { start: "Saci_Pererê", end: "William_Shakespeare" },
  { start: "Guaraná", end: "Pablo_Picasso" },
  { start: "Cristo_Redentor", end: "Stephen_Hawking" },
  { start: "São_Paulo", end: "Platão" },
  { start: "Rio_de_Janeiro", end: "Isaac_Newton" },
  { start: "Santos_Dumont", end: "Teoria_da_Evolução" },
  { start: "Pantanal", end: "Vincent_van_Gogh" },
  { start: "Maracanaã", end: "Marie_Curie" },
  { start: "Carmen_Miranda", end: "Sigmund_Freud" },
  { start: "Tom_Jobim", end: "Galileu_Galilei" },
  { start: "Anitta", end: "Aristóteles" },
  { start: "Machado_de_Assis", end: "Revolução_Chinesa" },
  { start: "Cachaça", end: "Guerra_Fria" },
  { start: "Brigadeiro", end: "Revolução_Industrial" },
  { start: "Índios", end: "Primeira_Guerra_Mundial" },
  { start: "Xuxa", end: "Nikola_Tesla" },
  { start: "Roberto_Carlos", end: "Ludwig_van_Beethoven" },
  { start: "Chico_Buarque", end: "Karl_Marx" },
  { start: "Zico", end: "Thomas_Edison" },
  { start: "Ayrton_Senna", end: "René_Descartes" },
  { start: "Oscar_Niemeyer", end: "Michelangelo" },
  { start: "Tarsila_do_Amaral", end: "Salvador_Dalí" },
  { start: "Garrincha", end: "Johannes_Gutenberg" },
  { start: "Embraer", end: "Revolução_Digital" },
  { start: "Petrobras", end: "Bill_Gates" },
  { start: "Vale", end: "Steve_Jobs" },
  { start: "Banco_do_Brasil", end: "Mark_Zuckerberg" },
  { start: "Itaú", end: "Jeff_Bezos" },
  { start: "Bradesco", end: "Elon_Musk" },
  { start: "Casas_Bahia", end: "Tim_Berners-Lee" },
  { start: "Magazine_Luiza", end: "Ada_Lovelace" },
  { start: "Natura", end: "Charles_Babbage" },
  { start: "O_Boticário", end: "Alan_Turing" },
  { start: "Havaianas", end: "Revolução_Industrial" },
  { start: "Globo", end: "Guerra_do_Vietnã" },
  { start: "Record", end: "Guerra_da_Coreia" },
  { start: "SBT", end: "Guerra_Fria" },
  { start: "Silvio_Santos", end: "Winston_Churchill" },
  { start: "Faustão", end: "Franklin_D._Roosevelt" },
  { start: "Gugu", end: "John_F._Kennedy" },
  { start: "Ana_Maria_Braga", end: "Margaret_Thatcher" },
  { start: "Hebe_Camargo", end: "Rainha_Elizabeth_II" },
  { start: "Chacrinha", end: "Mahatma_Gandhi" },
  { start: "Jô_Soares", end: "Nelson_Mandela" },
  { start: "Paulo_Coelho", end: "Jorge_Luis_Borges" },
  { start: "Clarice_Lispector", end: "Virginia_Woolf" },
  { start: "Jorge_Amado", end: "Gabriel_García_Márquez" },
  { start: "Graciliano_Ramos", end: "Ernest_Hemingway" },
  { start: "Carlos_Drummond_de_Andrade", end: "Pablo_Neruda" },
  { start: "Vinícius_de_Moraes", end: "Federico_García_Lorca" },
  { start: "Cecília_Meireles", end: "Emily_Dickinson" },
  { start: "Manuel_Bandeira", end: "Fernando_Pessoa" },
  { start: "João_Cabral_de_Melo_Neto", end: "T._S._Eliot" },
  { start: "Mário_de_Andrade", end: "James_Joyce" },
  { start: "Oswald_de_Andrade", end: "Marcel_Proust" },
  { start: "Lima_Barreto", end: "Charles_Dickens" },
  { start: "Euclides_da_Cunha", end: "Victor_Hugo" },
  { start: "Guimarães_Rosa", end: "Fiódor_Dostoiévski" },
  { start: "José_de_Alencar", end: "Miguel_de_Cervantes" },
  { start: "Joaquim_Nabuco", end: "Jean-Jacques_Rousseau" },
  { start: "Rui_Barbosa", end: "Voltaire" },
  { start: "Dom_Pedro_II", end: "Napoleão_Bonaparte" },
  { start: "Coreia_do_Sul", end: "Constituição_brasileira_de_1937" },
  { start: "Junji_Ito", end: "Igreja_Católica" },
  { start: "Batismo", end: "René_Descartes" },
  { start: "Geometria_Analítica", end: "Nova_Iorque" },
  { start: "Oceano_Atlântico", end: "Comunismo" },
  { start: "Café", end: "Revolução_Francesa" },
  { start: "Pizza", end: "Segunda_Guerra_Mundial" },
  { start: "Chocolate", end: "Primeira_Guerra_Mundial" },
  { start: "Vodka", end: "Revolução_Russa" },
  { start: "Sushi", end: "Culinária_Japonesa" },
  { start: "Croissant", end: "Napoleão_Bonaparte" },
  { start: "Tacos", end: "Cristóvão_Colombo" },
  { start: "Hambúrguer", end: "Guerra_Fria" },
  { start: "Curry", end: "Mahatma_Gandhi" },
  { start: "Paella", end: "Pablo_Picasso" },
  { start: "Churrasco", end: "Charles_Darwin" },
  { start: "Lasanha", end: "Leonardo_da_Vinci" },
  { start: "Kimchi", end: "Guerra_da_Coreia" },
  { start: "Couscous", end: "Cleópatra" },
  { start: "Sopa", end: "Revolução_Industrial" },
  { start: "PlayStation", end: "Albert_Einstein" },
  { start: "Nintendo", end: "Segunda_Guerra_Mundial" },
  { start: "Xbox", end: "Bill_Gates" },
  { start: "Among_Us", end: "Guerra_Fria" },
  { start: "Minecraft", end: "Revolução_Industrial" },
  { start: "Tetris", end: "União_Soviética" },
  { start: "Pac-Man", end: "Teoria_da_Relatividade" },
  { start: "The_Legend_of_Zelda", end: "Mitologia_Grega" },
  { start: "Super_Mario", end: "Revolução_Italiana" },
  { start: "Fortnite", end: "Primeira_Guerra_Mundial" },
  { start: "Bicicleta", end: "Albert_Einstein" },
  { start: "Skate", end: "Revolução_Cultural" },
  { start: "Furacão", end: "Mudanças_Climáticas" },
  { start: "Aurora_Boreal", end: "Nikola_Tesla" },
  { start: "Tsunami", end: "Teoria_da_Relatividade" },
  { start: "Vulcão", end: "Pompeia" },
  { start: "Terremoto", end: "Teoria_das_Placas_Tectônicas" },
  { start: "Eclipse", end: "Isaac_Newton" },
  { start: "Cometa", end: "Stephen_Hawking" },
  { start: "Arco-íris", end: "Isaac_Newton" },
  { start: "TikTok", end: "Guerra_Fria" },
  { start: "Instagram", end: "Mark_Zuckerberg" },
  { start: "Twitter", end: "Revolução_Árabe" },
  { start: "WhatsApp", end: "Privacidade_Digital" },
  { start: "Facebook", end: "Eleições_Americanas" },
  { start: "YouTube", end: "Revolução_Digital" },
  { start: "Netflix", end: "Hollywood" },
  { start: "Spotify", end: "Ludwig_van_Beethoven" },
  { start: "Tinder", end: "Revolução_Sexual" },
  { start: "LinkedIn", end: "Revolução_Industrial" },
  { start: "Basquete", end: "Guerra_Fria" },
  { start: "Vôlei", end: "Segunda_Guerra_Mundial" },
  { start: "Tênis", end: "Revolução_Francesa" },
  { start: "Surfe", end: "Capitão_James_Cook" },
  { start: "Golfe", end: "Revolução_Escocesa" },
  { start: "Rugby", end: "Império_Britânico" },
  { start: "Ciclismo", end: "Revolução_Industrial" },
  { start: "Natação", end: "Jogos_Olímpicos_da_Antiguidade" },
  { start: "Kung_Fu", end: "Revolução_Chinesa" },
  { start: "Boxe", end: "Muhammad_Ali" },
  { start: "Samba_de_Gafieira", end: "Segunda_Guerra_Mundial" },
  { start: "Tango", end: "Crise_de_1929" },
  { start: "Ballet", end: "Revolução_Russa" },
  { start: "Hip_Hop", end: "Movimento_dos_Direitos_Civis" },
  { start: "Flamenco", end: "Pablo_Picasso" },
  { start: "Salsa", end: "Revolução_Cubana" },
  { start: "Break_Dance", end: "Guerra_Fria" },
  { start: "K-pop", end: "Guerra_da_Coreia" },
  { start: "Valsa", end: "Congresso_de_Viena" },
  { start: "Pole_Dance", end: "Revolução_Sexual" },
  { start: "Pokémon", end: "Charles_Darwin" },
  { start: "Hello_Kitty", end: "Segunda_Guerra_Mundial" },
  { start: "Naruto", end: "História_do_Japão" },
  { start: "Dragon_Ball", end: "Mitologia_Chinesa" },
  { start: "One_Piece", end: "Era_dos_Descobrimentos" },
  { start: "Sailor_Moon", end: "Movimento_Feminista" },
  { start: "Attack_on_Titan", end: "Segunda_Guerra_Mundial" },
  { start: "Death_Note", end: "Ética_Filosófica" },
  { start: "My_Hero_Academia", end: "Friedrich_Nietzsche" },
  { start: "JoJo's_Bizarre_Adventure", end: "Egito_Antigo" },
  { start: "Bolo_de_Chocolate", end: "Revolução_Industrial" },
  { start: "Brigadeiro", end: "Segunda_Guerra_Mundial" },
  { start: "Paçoca", end: "Povos_Indígenas" },
  { start: "Mousse", end: "Revolução_Francesa" },
  { start: "Pudim", end: "Colonização_Portuguesa" },
  { start: "Cheesecake", end: "Grécia_Antiga" },
  { start: "Tiramisu", end: "Renascimento_Italiano" },
  { start: "Churros", end: "Cristóvão_Colombo" },
  { start: "Brownie", end: "Chicago" },
  { start: "Sorvete", end: "Marco_Polo" },
  { start: "Lady_Gaga", end: "Andy_Warhol" },
  { start: "Michael_Jackson", end: "Guerra_Fria" },
  { start: "Madonna", end: "Revolução_Sexual" },
  { start: "BTS", end: "Guerra_da_Coreia" },
  { start: "Beatles", end: "Guerra_Fria" },
  { start: "Elvis_Presley", end: "Guerra_Fria" },
  { start: "Beyoncé", end: "Movimento_Feminista" },
  { start: "Queen", end: "AIDS" },
  { start: "Taylor_Swift", end: "Feminismo" },
  { start: "Bob_Marley", end: "Colonialismo" },
  { start: "Harry_Potter", end: "Segunda_Guerra_Mundial" },
  { start: "Senhor_dos_Anéis", end: "Primeira_Guerra_Mundial" },
  { start: "Game_of_Thrones", end: "Guerra_das_Rosas" },
  { start: "Matrix", end: "Filosofia_Grega" },
  { start: "Star_Wars", end: "Mitologia_Comparada" },
  { start: "Avengers", end: "Guerra_Fria" },
  { start: "Titanic", end: "Primeira_Guerra_Mundial" },
  { start: "Jurassic_Park", end: "Charles_Darwin" },
  { start: "O_Poderoso_Chefão", end: "Grande_Depressão" },
  { start: "Frozen", end: "Hans_Christian_Andersen" },
  { start: "Abacate", end: "Civilização_Asteca" },
  { start: "Tomate", end: "Revolução_Alimentar" },
  { start: "Batata", end: "Grande_Fome_Irlandesa" },
  { start: "Milho", end: "Civilização_Maia" },
  { start: "Trigo", end: "Revolução_Agrícola" },
  { start: "Arroz", end: "Mao_Tsé-Tung" },
  { start: "Manga", end: "Império_Britânico" },
  { start: "Banana", end: "Repúblicas_das_Bananas" },
  { start: "Coco", end: "Grandes_Navegações" },
  { start: "Pimenta", end: "Vasco_da_Gama" },
  { start: "Sandálias_Havaianas", end: "Japão" },
  { start: "Volkswagen_Fusca", end: "História_da_Alemanha" },
  { start: "iPhone", end: "Revolução_Digital" },
  { start: "Lego", end: "Segunda_Guerra_Mundial" },
  { start: "Coca-Cola", end: "Guerra_Fria" },
  { start: "McDonald's", end: "Guerra_Fria" },
  { start: "IKEA", end: "Segunda_Guerra_Mundial" },
  { start: "Nike", end: "Jogos_Olímpicos" },
  { start: "Barbie", end: "Movimento_Feminista" },
  { start: "Rolex", end: "Primeira_Guerra_Mundial" },
  { start: "Aspirina", end: "Química_Orgânica" },
  { start: "Telescópio", end: "Astronomia" },
  { start: "Estetoscópio", end: "Medicina" },
  { start: "Violino", end: "Música_Clássica" },
  { start: "Girassol", end: "Vincent_van_Gogh" },
  { start: "Microscópio", end: "Biologia" },
  { start: "Yoga", end: "Filosofia_Indiana" },
  { start: "Sopa_de_Letrinhas", end: "Alfabetização" },
  { start: "Origami", end: "Cultura_Japonesa" },
  { start: "Grafite", end: "Arte_Urbana" },
  { start: "Baralho", end: "Probabilidade" },
  { start: "Boliche", end: "Física_Mecânica" },
  { start: "Pandeiro", end: "Samba" },
  { start: "Papiro", end: "Egito_Antigo" },
  { start: "Óculos", end: "Ótica" },
  { start: "Cubo_de_Rubik", end: "Matemática_Combinatória" },
  { start: "Tênis_de_Mesa", end: "China" },
  { start: "Paraquedas", end: "Leonardo_da_Vinci" },
  { start: "Espinafre", end: "Popeye" },
  { start: "Algoritmo", end: "Al-Khwarizmi" },
  { start: "Bambu", end: "Panda_Gigante" },
  { start: "Saxofone", end: "Jazz" },
  { start: "Teia_de_Aranha", end: "Nanotecnologia" },
  { start: "Programação_Orientada_a_Objetos", end: "Simulação" },
  { start: "Pão_de_Forma", end: "Revolução_Industrial" },
  { start: "Relógio_de_Sol", end: "Astronomia_Antiga" },
  { start: "Sitar", end: "Beatles" },
  { start: "Navio_a_Vapor", end: "Revolução_Industrial" },
  { start: "Livro_de_Colorir", end: "Terapia" },
  { start: "Amarelinha", end: "Desenvolvimento_Infantil" },
  { start: "Maquiagem", end: "Antigo_Egito" },
  { start: "Calendário_Maia", end: "Astronomia" },
  { start: "Wikileaks", end: "Liberdade_de_Imprensa" },
  { start: "Carimbo", end: "Burocracia" },
  { start: "Aeróbica", end: "Jane_Fonda" },
  { start: "Quebra-Cabeça", end: "Psicologia_Cognitiva" },
  { start: "Biscoito_da_Sorte", end: "Estados_Unidos" },
  { start: "Circo", end: "Roma_Antiga" },
  { start: "Damas", end: "Inteligência_Artificial" },
  { start: "Fita_Cassete", end: "Revolução_Digital" },
  { start: "Escala_Richter", end: "Geologia" },
  { start: "Álbum_de_Figurinhas", end: "Economia_Comportamental" },
  { start: "Chá_Verde", end: "Medicina_Tradicional_Chinesa" },
  { start: "Criptografia", end: "Segunda_Guerra_Mundial" },
  { start: "Mochila", end: "Nomadismo" },
  { start: "Relógio_Cuco", end: "Floresta_Negra" },
  { start: "QR_Code", end: "Indústria_Automotiva" },
  { start: "Impressão_3D", end: "Medicina_Moderna" },
  { start: "Geleia_Real", end: "Apicultura" },
  { start: "Fantasia", end: "Psicologia_Junguiana" },
  { start: "Nebulosa_de_Órion", end: "Mitologia_Grega" },
  { start: "Arame_Farpado", end: "Colonização_do_Oeste_Americano" },
  { start: "Agulha_de_Crochê", end: "Revolução_Industrial" },
  { start: "Violão", end: "Arquitetura_Mudéjar" },
  { start: "Torta_de_Limão", end: "Escorbuto" },
  { start: "Açúcar_Mascavo", end: "Escravidão_Atlântica" },
  { start: "Foguete", end: "Física_Quântica" },
  { start: "Limonada", end: "Peste_Negra" },
  { start: "Sensor_de_Impressão_Digital", end: "Medicina_Forense" },
  { start: "Zelda_Ocarina_of_Time", end: "Música_Medieval" },
  { start: "Palavras-Cruzadas", end: "Linguística" },
  { start: "Aquarela", end: "Romantismo" },
  { start: "Óleo_de_Coco", end: "Colonialismo" },
  { start: "Partitura_Musical", end: "Matemática" },
  { start: "Sétima_Arte", end: "Revolução_Industrial" },
  { start: "Esgrima", end: "Renascimento" },
  { start: "Xilofone", end: "África_Ocidental" },
  { start: "Manteiga_de_Amendoim", end: "George_Washington_Carver" },
  { start: "Castelo_de_Cartas", end: "Arquitetura_Gótica" },
  { start: "Dominó", end: "Matemática_Combinatória" },
  { start: "Máquina_de_Escrever", end: "Literatura_Modernista" },
  { start: "Hashi", end: "Confucionismo" },
  { start: "Fondue", end: "Revolução_Industrial" },
  { start: "Graffiti", end: "Arqueologia_Urbana" },
  { start: "Candelabro", end: "Revolução_Francesa" },
  { start: "Baioneta", end: "Revolução_Americana" },
  { start: "Régua_de_Cálculo", end: "Exploração_Espacial" },
  { start: "Gaita_de_Fole", end: "Império_Romano" },
  { start: "Ábaco", end: "Revolução_Digital" },
  { start: "Fogão_a_Lenha", end: "Revolução_Industrial" },
  { start: "Método_Científico", end: "Renascimento" },
  { start: "Célula-Tronco", end: "Bioética" },
  { start: "Buraco_Negro", end: "Albert_Einstein" },
  { start: "DNA", end: "Filosofia_da_Ciência" },
  { start: "Tabela_Periódica", end: "Guerra_Fria" },
  { start: "Placa_de_Petri", end: "Microbiologia" },
  { start: "Pêndulo", end: "Galileu_Galilei" },
  { start: "Titânio", end: "Aeronáutica" },
  { start: "Dinossauro", end: "Cinema" },
  { start: "Neurônio", end: "Inteligência_Artificial" },
  { start: "Vitamina_C", end: "Grandes_Navegações" },
  { start: "Fóssil", end: "Paleontologia" },
  { start: "Efeito_Estufa", end: "Revolução_Industrial" },
  { start: "Mergulho_Autônomo", end: "Jacques_Cousteau" },
  { start: "Expedição_Científica", end: "Charles_Darwin" },
  { start: "Flauta_Doce", end: "Música_Barroca" },
  { start: "Fanfarra", end: "Militarismo" },
  { start: "Mosaico", end: "Império_Bizantino" },
  { start: "Cerâmica", end: "Arqueologia" },
  { start: "Pintura_a_Óleo", end: "Renascimento" },
  { start: "Fábula", end: "Grécia_Antiga" },
  { start: "Marionete", end: "Teatro_de_Sombras" },
  { start: "Tambor", end: "Comunicação_à_Distância" },
  { start: "Dança_do_Ventre", end: "Egito_Antigo" },
  { start: "Fotografia", end: "Química" },
  { start: "Podcast", end: "Rádio" },
  { start: "Carnaval_de_Veneza", end: "Peste_Negra" },
  { start: "Artesanato", end: "Revolução_Industrial" },
  { start: "Retratos", end: "Psicologia" },
  { start: "Cinema_Mudo", end: "Charles_Chaplin" },
  { start: "Pipoca", end: "Civilização_Maia" },
  { start: "Pão_Francês", end: "Áustria" },
  { start: "Sagu", end: "Palmeiras" },
  { start: "Quibe", end: "Imigração_Libanesa" },
  { start: "Panetone", end: "Primeira_Guerra_Mundial" },
  { start: "Cerveja", end: "Revolução_Agrícola" },
  { start: "Queijo", end: "Microbiologia" },
  { start: "Iogurte", end: "Império_Otomano" },
  { start: "Sopa", end: "Idade_Média" },
  { start: "Uísque", end: "Idade_Média" },
  { start: "Chá", end: "Revolução_Americana" },
  { start: "Alho", end: "Medicina_Medieval" },
  { start: "Canela", end: "Era_dos_Descobrimentos" },
  { start: "Pimenta_do_Reino", end: "Vasco_da_Gama" },
  { start: "Açafrão", end: "Rota_da_Seda" },
  { start: "Jogo_da_Velha", end: "Teoria_dos_Jogos" },
  { start: "Futebol_Americano", end: "Rugby" },
  { start: "Beisebol", end: "Diplomacia_Americana" },
  { start: "Rúgbi", end: "William_Webb_Ellis" },
  { start: "Handebol", end: "Dinamarca" },
  { start: "Badminton", end: "Índia_Colonial" },
  { start: "Squash", end: "Prisões_Inglesas" },
  { start: "Polo_Aquático", end: "Escócia" },
  { start: "Corrida_de_Obstáculos", end: "Treinamento_Militar" },
  { start: "Xadrez", end: "Guerra_Fria" },
  { start: "Cabo_de_Guerra", end: "Jogos_Olímpicos_Antigos" },
  { start: "Curling", end: "Escócia_Medieval" },
  { start: "Bilhar", end: "Física_Mecânica" },
  { start: "Amarelinha", end: "Roma_Antiga" },
  { start: "Estilingue", end: "David_e_Golias" },
  { start: "Lago_Titicaca", end: "Civilização_Inca" },
  { start: "Monte_Everest", end: "Império_Britânico" },
  { start: "Rio_Amazonas", end: "Francisco_de_Orellana" },
  { start: "Delta_do_Nilo", end: "Faraós" },
  { start: "Montanhas_Rochosas", end: "Corrida_do_Ouro" },
  { start: "Deserto_do_Saara", end: "Comércio_Transaariano" },
  { start: "Savana", end: "Evolução_Humana" },
  { start: "Floresta_Amazônica", end: "Farmacologia" },
  { start: "Recifes_de_Coral", end: "Charles_Darwin" },
  { start: "Manguezal", end: "Ecologia" },
  { start: "Beija-flor", end: "Evolução" },
  { start: "Tucano", end: "Sistema_Digestivo" },
  { start: "Borboleta", end: "Teoria_do_Caos" },
  { start: "Abelha", end: "Matemática" },
  { start: "Camaleão", end: "Evolução_Convergente" },
  { start: "Submarino", end: "Jules_Verne" },
  { start: "Dirigível", end: "Hindenburg" },
  { start: "Bicicleta", end: "Revolução_Industrial" },
  { start: "Mecânica_Quântica", end: "Computadores" },
  { start: "Forno_Micro-ondas", end: "Radar" },
  { start: "Realidade_Virtual", end: "Filosofia" },
  { start: "Velcro", end: "Biomimética" },
  { start: "Post-it", end: "Inovação_Empresarial" },
  { start: "Processador_de_Texto", end: "Literatura" },
  { start: "Arduino", end: "Design_Industrial" },
  { start: "Controle_Remoto", end: "Nikola_Tesla" },
  { start: "Fibra_Óptica", end: "Internet" },
  { start: "Isqueiro", end: "Revolução_Química" },
  { start: "Caneta_Esferográfica", end: "Segunda_Guerra_Mundial" },
  { start: "Relógio_de_Pulso", end: "Primeira_Guerra_Mundial" },
  { start: "Muralha_da_China", end: "Mongólia" },
  { start: "Catedral", end: "Matemática_Medieval" },
  { start: "Democracia", end: "Revolução_Francesa" },
  { start: "Pedra_de_Roseta", end: "Linguística" },
  { start: "Compasso", end: "Navegação_Marítima" },
  { start: "Pergaminho", end: "Idade_Média" },
  { start: "Toga", end: "Direito_Romano" },
  { start: "Roda", end: "Mesopotâmia" },
  { start: "Código_de_Hamurabi", end: "Direitos_Humanos" },
  { start: "Esfinge", end: "Napoleão_Bonaparte" },
  { start: "Papiro", end: "Biblioteca_de_Alexandria" },
  { start: "Cédula", end: "Marco_Polo" },
  { start: "Alfabeto", end: "Fenícia" },
  { start: "Telescópio", end: "Igreja_Católica" },
  { start: "Imprensa", end: "Reforma_Protestante" },
  { start: "Mjölnir", end: "Marvel_Comics" },
  { start: "Olimpo", end: "Jogos_Olímpicos" },
  { start: "Zodíaco", end: "Astronomia" },
  { start: "Valhalla", end: "Literatura_Nórdica" },
  { start: "Górgona", end: "Psicologia" },
  { start: "Odin", end: "Dias_da_Semana" },
  { start: "Ártemis", end: "Feminismo" },
  { start: "Ankh", end: "Cristianismo" },
  { start: "Ganesh", end: "Matemática" },
  { start: "Taoísmo", end: "Física_Moderna" },
  { start: "Meditação", end: "Neurociência" },
  { start: "Kumbh_Mela", end: "Rio_Ganges" },
  { start: "Mahabharata", end: "Guerra_Nuclear" },
  { start: "Mito_da_Caverna", end: "Cinema" },
  { start: "Mãe_Teresa_de_Calcutá", end: "Nobel_da_Paz" },
  { start: "Poesia_Concreta", end: "Design_Gráfico" },
  { start: "Esperanto", end: "Liga_das_Nações" },
  { start: "Escritura_Cuneiforme", end: "Contabilidade" },
  { start: "Cordel", end: "Xilogravura" },
  { start: "Haicai", end: "Minimalismo" },
  { start: "Contos_de_Fadas", end: "Psicologia_Infantil" },
  { start: "Língua_de_Sinais", end: "Neurociência" },
  { start: "Romance_Policial", end: "Edgar_Allan_Poe" },
  { start: "Gramática", end: "Inteligência_Artificial" },
  { start: "Tradução", end: "Colonialismo" },
  { start: "Caligrafia", end: "Neuroplasticidade" },
  { start: "Emojis", end: "Hieróglifos" },
  { start: "Alfabeto_Cirílico", end: "Guerra_Fria" },
  { start: "Pergaminho", end: "Livestock" },
  { start: "Biblioteca", end: "Alexandria" },
  { start: "Quimono", end: "Segunda_Guerra_Mundial" },
  { start: "Chapéu_Panamá", end: "Equador" },
  { start: "Jeans", end: "Corrida_do_Ouro" },
  { start: "Sutiã", end: "Primeira_Guerra_Mundial" },
  { start: "Salto_Alto", end: "Cavalaria" },
  { start: "Xadrez", end: "Escócia" },
  { start: "Kilt", end: "Império_Romano" },
  { start: "Batik", end: "Indonésia" },
  { start: "Sari", end: "Matemática" },
  { start: "Alpargatas", end: "Revolução_Industrial" },
  { start: "Óculos_de_Sol", end: "Juízes_Chineses" },
  { start: "Luvas", end: "Medicina" },
  { start: "Batom", end: "Cleópatra" },
  { start: "Perfume", end: "Química" },
  { start: "Abotoadura", end: "Revolução_Industrial" },
  { start: "Homeopatia", end: "Método_Científico" },
  { start: "Acupuntura", end: "Neurociência" },
  { start: "Meditação", end: "Psiquiatria" },
  { start: "Estetoscópio", end: "Revolução_Industrial" },
  { start: "Antibiótico", end: "Alexander_Fleming" },
  { start: "Vacina", end: "Edward_Jenner" },
  { start: "Tomografia", end: "Física_Nuclear" },
  { start: "Fisioterapia", end: "Primeira_Guerra_Mundial" },
  { start: "Transplante", end: "Imunologia" },
  { start: "Anestesia", end: "Guerra_Civil_Americana" },
  { start: "Dentista", end: "Arqueologia" },
  { start: "Óculos", end: "Revolução_Científica" },
  { start: "Aspirina", end: "Salgueiro" },
  { start: "Insulina", end: "Prêmio_Nobel" },
  { start: "Medicina_Tradicional", end: "Farmacologia_Moderna" },
  { start: "Pegador_de_Macarrão", end: "Revolução_Industrial" },
  { start: "Colher_de_Pau", end: "Etnobotânica" },
  { start: "Ventilador_de_Teto", end: "Colonialismo" },
  { start: "Pregador_de_Roupa", end: "Revolução_Industrial" },
  { start: "Prendedor_de_Cabelo", end: "Arqueologia" },
  { start: "Talher", end: "Etiqueta" },
  { start: "Guarda-Chuva", end: "China_Antiga" },
  { start: "Escova_de_Dentes", end: "Islamismo" },
  { start: "Espelho", end: "Neuropsicologia" },
  { start: "Sabonete", end: "Roma_Antiga" },
  { start: "Papel_Higiênico", end: "Dinastia_Han" },
  { start: "Vassoura", end: "Bruxaria" },
  { start: "Máquina_de_Lavar", end: "Movimento_Feminista" },
  { start: "Despertador", end: "Revolução_Industrial" },
  { start: "Xícara", end: "Dinastia_Ming" },
  { start: "Lego", end: "Arquitetura" },
  { start: "Karaokê", end: "Cultura_Empresarial_Japonesa" },
  { start: "Revista_em_Quadrinhos", end: "Propaganda_de_Guerra" },
  { start: "Mastro", end: "Navegação_Astronômica" },
  { start: "Guia_Turístico", end: "Grand_Tour" },
  { start: "Necessaire", end: "Tapeçaria_Medieval" },
  { start: "Pôster", end: "Revolução_Francesa" },
  { start: "Tatame", end: "Zen-Budismo" },
  { start: "Acampamento", end: "Escotismo" },
  { start: "Pipa", end: "Benjamin_Franklin" },
  { start: "Cartão_de_Crédito", end: "Era_Digital" },
  { start: "Videogame", end: "Guerra_Fria" },
  { start: "Bonsai", end: "Filosofia_Zen" },
  { start: "Maleta", end: "Diplomacia" },
  { start: "Pêndulo", end: "Psicologia_Junguiana" }
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
  const [animationVisible, setAnimationVisible] = React.useState(false); // Estado para controlar a visibilidade das animações

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
  }, []);

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
      const response = await fetch(
        `https://pt.wikipedia.org/w/api.php?action=parse&page=${title}&format=json&origin=*&prop=text|categories|sections`
      );
      const data = await response.json();
      if (data.parse && data.parse.text) {
        const content = data.parse.text["*"];
        setCurrentArticle(processWikiContent(content));
      }
    } catch (error) {
      console.error("Error loading article:", error);
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
      const isComplete = title === gameState.endArticle;
      
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

  // Reset game with a new random pair
  const resetGame = () => {
    setShowMenu(true);
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
                </div>
                
                {/* Informação do criador */}
                <div className={`creator-info ${animationVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{animationDelay: '1.1s'}}>
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
            
            {/* Path visualization */}
            <div className="path-container">
              <div className="flex items-center gap-2 flex-nowrap min-w-max">
                {gameState.path.map((article, index) => (
                  <React.Fragment key={index}>
                    <span className="path-item" style={{animationDelay: `${index * 0.1}s`}}>
                      {article.replace(/_/g, ' ')}
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
                  <span>De: <strong>{gameState.startArticle.replace(/_/g, ' ')}</strong></span>
                </div>
                <ArrowRight size={20} className="text-gray-700" />
                <div className="flex items-center gap-2 badge">
                  <Brain size={20} weight="bold" className="text-secondary" />
                  <span>Para: <strong>{gameState.endArticle.replace(/_/g, ' ')}</strong></span>
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
