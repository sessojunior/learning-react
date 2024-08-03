interface Cite {
	author: string;
	description: string;
}

const citacoes: Cite[] = [
	{
		author: "São Francisco de Assis",
		description: "Comece fazendo o que é necessário, depois o que é possível, e de repente você estará fazendo o impossível.",
	},
	{
		author: "Santa Teresa de Ávila",
		description: "Nada te perturbe, nada te espante, tudo passa, Deus não muda. A paciência tudo alcança.",
	},
	{
		author: "Santo Agostinho",
		description: "A medida do amor é amar sem medida.",
	},
	{
		author: "São Tomás de Aquino",
		description: "Para aqueles que têm fé, nenhuma explicação é necessária. Para aqueles sem fé, nenhuma explicação é possível.",
	},
	{
		author: "São João da Cruz",
		description: "No fim da vida seremos julgados pelo amor.",
	},
	{
		author: "Santa Catarina de Sena",
		description: "Nada de grande se faz sem muito sofrimento.",
	},
	{
		author: "São Bento",
		description: "Ora et labora. (Reze e trabalhe.)",
	},
	{
		author: "São João Crisóstomo",
		description: "A misericórdia para com os pobres é um caminho que conduz ao céu.",
	},
	{
		author: "São Gregório Magno",
		description: "A oração é a respiração da alma.",
	},
	{
		author: "São Bernardo de Claraval",
		description: "Deus está em toda parte e em toda parte ele está inteiramente presente.",
	},
	{
		author: "São Francisco de Sales",
		description: "Faça tudo por amor, nada pela força.",
	},
	{
		author: "São Jerônimo",
		description: "Ignorar as Escrituras é ignorar Cristo.",
	},
	{
		author: "Santa Teresa de Lisieux",
		description: "Quero passar meu céu fazendo o bem na terra.",
	},
	{
		author: "São João Bosco",
		description: "A santidade consiste em estar sempre alegre.",
	},
	{
		author: "Santo Inácio de Loyola",
		description: "Tudo para a maior glória de Deus.",
	},
	{
		author: "São Luís de Montfort",
		description: "Quem não tem Maria por mãe, não tem Deus por pai.",
	},
	{
		author: "Santa Isabel de Hungria",
		description: "Distribuir o pão aos pobres é acumular tesouros no céu.",
	},
	{
		author: "São Martinho de Tours",
		description: "Senhor, se ainda preciso, não recuso o trabalho. Seja feita a tua vontade.",
	},
	{
		author: "Santa Clara de Assis",
		description: "Ame a Deus, sirva a Deus; tudo está nesse amor.",
	},
	{
		author: "Santo Afonso de Ligório",
		description: "Quem reza se salva. Quem não reza se condena.",
	},
	{
		author: "São Basílio Magno",
		description: "A amizade verdadeira é uma santa aliança.",
	},
	{
		author: "São Cirilo de Jerusalém",
		description: "A água do batismo é uma água viva, uma água que jorra para a vida eterna.",
	},
	{
		author: "Santa Mônica",
		description: "Nada está longe de Deus.",
	},
	{
		author: "Santo Atanásio",
		description: "Ele assumiu o que nós somos, para que pudéssemos ser o que Ele é.",
	},
	{
		author: "São Cipriano de Cartago",
		description: "Não pode ter Deus por pai quem não tem a Igreja por mãe.",
	},
	{
		author: "São João Maria Vianney",
		description: "A oração é para a nossa alma o que a chuva é para a terra.",
	},
	{
		author: "São Policarpo",
		description: "Servo de Cristo sou; cumpro o que Ele manda.",
	},
	{
		author: "São Lourenço",
		description: "Esta parte do meu corpo já está bem assada, pode virar.",
	},
	{
		author: "São Tomás More",
		description: "Prefiro ser pobre no céu do que ser rico no inferno.",
	},
	{
		author: "Santo Estêvão",
		description: "Senhor, não os consideres culpados deste pecado.",
	},
	{
		author: "São Gregório de Nazianzo",
		description: "Deus aceita nossa boa vontade.",
	},
	{
		author: "São Pedro Damião",
		description: "Os que não progridem, retrocedem.",
	},
	{
		author: "São João Clímaco",
		description: "O amor é a fonte de todas as virtudes.",
	},
	{
		author: "Santa Brígida da Suécia",
		description: "Rezar é a minha força e a minha alegria.",
	},
	{
		author: "São Vicente de Paulo",
		description: "A caridade é o caminho mais curto para Deus.",
	},
	{
		author: "Santa Teresa de Jesus",
		description: "A oração é um ato de amor, palavras não são necessárias.",
	},
	{
		author: "São Filipe Néri",
		description: "A alegria é o sinal de um coração que ama a Deus.",
	},
	{
		author: "Santo Ambrósio",
		description: "A cruz é um sinal de vitória, não de derrota.",
	},
	{
		author: "São Leão Magno",
		description: "A fé é um dom de Deus, não uma conquista humana.",
	},
	{
		author: "São Francisco Xavier",
		description: "Dai-me almas e ficai com o resto.",
	},
	{
		author: "São Carlos Borromeu",
		description: "A oração é o primeiro meio para salvar as almas.",
	},
	{
		author: "São Bento José Labre",
		description: "Deus é suficiente para mim.",
	},
	{
		author: "São Norberto",
		description: "Aquele que confia em Deus nunca será abandonado.",
	},
	{
		author: "Santa Escolástica",
		description: "Deixe-nos viver juntos no céu.",
	},
	{
		author: "São João de Capistrano",
		description: "A oração é a chave do céu.",
	},
	{
		author: "São Roque",
		description: "Aqueles que confiam no Senhor encontrarão novo vigor.",
	},
	{
		author: "São Carlos Lwanga",
		description: "O sangue dos mártires é a semente da Igreja.",
	},
	{
		author: "Santa Genoveva",
		description: "Deus é minha luz e minha salvação.",
	},
	{
		author: "São Francisco de Paula",
		description: "Paz e bem.",
	},
	{
		author: "Santa Rita de Cássia",
		description: "Nada é impossível para Deus.",
	},
	{
		author: "São José de Cupertino",
		description: "Quem a Deus tem, nada lhe falta.",
	},
	{
		author: "Santa Teresa Benedita da Cruz",
		description: "Aceite tudo como vindo das mãos de Deus.",
	},
	{
		author: "São João Eudes",
		description: "Jesus vive em mim.",
	},
	{
		author: "Santa Gertrudes",
		description: "Deus é amor.",
	},
	{
		author: "São João Gualberto",
		description: "Deus é minha força.",
	},
	{
		author: "Santa Margarida Maria Alacoque",
		description: "O Coração de Jesus é a fonte de todo o amor.",
	},
	{
		author: "São Nicolau de Tolentino",
		description: "Deus é minha esperança.",
	},
	{
		author: "São Pio V",
		description: "A oração é a melhor arma que temos.",
	},
	{
		author: "Santa Inês",
		description: "Meu Esposo me escolheu primeiro.",
	},
	{
		author: "São Rafael Arnáiz Barón",
		description: "Deus é meu tudo.",
	},
	{
		author: "São Bruno",
		description: "Deus nunca abandona aqueles que confiam Nele.",
	},
	{
		author: "Santa Verônica Giuliani",
		description: "O amor não é amado!",
	},
	{
		author: "São João de Deus",
		description: "Deus providenciará.",
	},
	{
		author: "São Camilo de Lellis",
		description: "Mais coração nas mãos, irmãos!",
	},
	{
		author: "Santa Francisca Romana",
		description: "Deus é meu refúgio.",
	},
	{
		author: "São Gregório de Tours",
		description: "A fé é o fundamento da nossa vida.",
	},
	{
		author: "São Guilherme de Vercelli",
		description: "Deus é minha força e meu escudo.",
	},
	{
		author: "Santa Eulália",
		description: "Cristo é minha vida.",
	},
	{
		author: "São Romualdo",
		description: "Deus é minha alegria.",
	},
	{
		author: "Santa Margarida da Escócia",
		description: "Deus é meu pastor.",
	},
	{
		author: "São Nuno de Santa Maria",
		description: "A esperança em Deus nunca decepciona.",
	},
	{
		author: "Santa Ângela de Mérici",
		description: "Deus é minha força e minha luz.",
	},
	{
		author: "São Vito",
		description: "Deus é minha salvação.",
	},
	{
		author: "Santa Zita",
		description: "Deus é meu conforto.",
	},
	{
		author: "São Roque González",
		description: "Deus é meu tudo.",
	},
	{
		author: "Santa Maria Goretti",
		description: "Deus me ama.",
	},
	{
		author: "São Simão Stock",
		description: "Deus é meu refúgio e minha fortaleza.",
	},
	{
		author: "Santa Lídia",
		description: "Deus é minha esperança.",
	},
	{
		author: "São Cristóvão",
		description: "Cristo é minha luz e minha salvação.",
	},
	{
		author: "Santa Helena",
		description: "Deus é meu auxílio.",
	},
	{
		author: "São Luís Gonzaga",
		description: "Deus é meu refúgio.",
	},
	{
		author: "Santa Joana d'Arc",
		description: "Deus é meu guia.",
	},
	{
		author: "São Pedro Julião Eymard",
		description: "Deus é minha paz.",
	},
	{
		author: "Santa Rosa de Lima",
		description: "Deus é minha alegria.",
	},
	{
		author: "São Leão de Catania",
		description: "Deus é meu conforto.",
	},
	{
		author: "Santa Inês de Montepulciano",
		description: "Deus é minha luz.",
	},
	{
		author: "São Francisco de Assis",
		description: "Senhor, fazei-me um instrumento de vossa paz.",
	},
	{
		author: "Santa Escolástica",
		description: "Deus é meu tudo.",
	},
	{
		author: "São João Evangelista",
		description: "Deus é amor.",
	},
	{
		author: "Santa Teresa de Ávila",
		description: "Nada te perturbe, nada te espante, tudo passa, Deus não muda. A paciência tudo alcança.",
	},
	{
		author: "Santo Antônio de Pádua",
		description: "A palavra é viva quando são as obras que falam.",
	},
	{
		author: "São Bento",
		description: "O amor de Cristo deve vir antes de tudo.",
	},
	{
		author: "Santa Inês",
		description: "Deus é minha força.",
	},
	{
		author: "Santo Agostinho",
		description: "Tu nos fizeste para Ti, e inquieto está nosso coração enquanto não repousar em Ti.",
	},
	{
		author: "Santa Cecília",
		description: "Canta ao Senhor uma canção nova.",
	},
	{
		author: "São Patrício",
		description: "Cristo comigo, Cristo diante de mim, Cristo atrás de mim.",
	},
	{
		author: "Santa Bárbara",
		description: "Deus é minha fortaleza.",
	},
	{
		author: "Santo Hilário de Poitiers",
		description: "Deus é minha luz e minha salvação.",
	},
	{
		author: "São Barnabé",
		description: "Cristo é minha vida.",
	},
	{
		author: "Santa Catarina de Alexandria",
		description: "Deus é minha sabedoria.",
	},
];

export default citacoes;
