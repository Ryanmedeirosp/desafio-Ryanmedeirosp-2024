class RecintosZoo {
    constructor() {
        this.recintos = [
            { numero: 1, bioma: 'savana', tamanhoTotal: 10, animais: { macacos: 3 } },
            { numero: 2, bioma: 'floresta', tamanhoTotal: 5, animais: {} },
            { numero: 3, bioma: 'savana e rio', tamanhoTotal: 7, animais: { gazela: 1 } },
            { numero: 4, bioma: 'rio', tamanhoTotal: 8, animais: {} },
            { numero: 5, bioma: 'savana', tamanhoTotal: 9, animais: { leao: 1 } }
        ];

        this.animaisInfo = {
            LEAO: { tamanho: 3, bioma: 'savana' },
            LEOPARDO: { tamanho: 2, bioma: 'savana' },
            CROCODILO: { tamanho: 3, bioma: 'rio' },
            MACACO: { tamanho: 1, bioma: ['savana', 'floresta'] },
            GAZELA: { tamanho: 2, bioma: 'savana' },
            HIPOPOTAMO: { tamanho: 4, bioma: ['savana', 'rio'] }
        };
    }

    analisaRecintos(animal, quantidade) {
        let erro = null;
        let recintosViaveis = [];

        // Validação de entrada
        if (!this.animaisInfo[animal]) {
            erro = 'Animal inválido';
        } else if (isNaN(quantidade) || quantidade <= 0 || !Number.isInteger(quantidade)) {
            erro = 'Quantidade inválida';
        } else {
            // Pegando tamanho e bioma
            const animalInfo = this.animaisInfo[animal];
            const tamanhoNecessario = quantidade * animalInfo.tamanho;

           

            this.recintos.forEach(recinto => {
                if (animalInfo.bioma.length === 2) {
                    if (recinto.bioma.includes(animalInfo.bioma[0]) || recinto.bioma.includes(animalInfo.bioma[1]) ) {

                        const animaisNoRecinto = Object.keys(recinto.animais);
                        
                        let tamanhoTotalOcupado = 0
                        if (animaisNoRecinto.includes('gazela')) {
                            tamanhoTotalOcupado = Object.values(recinto.animais) * 2
                        }
                        if (animaisNoRecinto.includes('macacos')) {
                            tamanhoTotalOcupado = Object.values(recinto.animais) * 1
                        }
                        if (animaisNoRecinto.includes('leao')) {
                            tamanhoTotalOcupado = Object.values(recinto.animais) * 3
                        }


                        

                        
                        let espacoExtra = 0
                        // somente o macaco que tem mais de um bioma e pode entrar num mesmo espaço que outro animais e se for do mesmo não precisa
                        if ((animaisNoRecinto.includes('gazela') && animal != 'GAZELA') || 
                        (animaisNoRecinto.includes('macacos') && animal != 'MACACO') || 
                        (animaisNoRecinto.includes('leao') && animal != 'LEAO')) {
                          espacoExtra = 1
                        }
                       
                        
                        
                        const tamanhoDisponivel = recinto.tamanhoTotal - tamanhoTotalOcupado - espacoExtra;
    
                        // Regras de conforto e compatibilidade
                        let podeAdicionar = tamanhoDisponivel >= tamanhoNecessario;
    
    
                        // Adicionar verificação para animais específicos
                        if (animal === 'MACACO' ) {
                            
                            podeAdicionar = (animaisNoRecinto.length === 0 || animaisNoRecinto.includes('gazela') || animaisNoRecinto.includes('macacos'));
                           
                        }

                        if (animaisNoRecinto.includes('leao')) {
                            podeAdicionar = false
                        }
                        

                    
                        if (podeAdicionar) {
                            recintosViaveis.push({
                                numero: recinto.numero,
                                espacoLivre: tamanhoDisponivel - tamanhoNecessario,
                                tamanhoTotal: recinto.tamanhoTotal
                            });
                        }
                    }
                    
                }else if (recinto.bioma.includes(animalInfo.bioma)) {
                    const animaisNoRecinto = Object.keys(recinto.animais);
                    
                    let tamanhoTotalOcupado = 0
                        if (animaisNoRecinto.includes('gazela')) {
                            tamanhoTotalOcupado = Object.values(recinto.animais) * 2
                        }
                        if (animaisNoRecinto.includes('macacos')) {
                            tamanhoTotalOcupado = Object.values(recinto.animais) * 1
                        }
                        if (animaisNoRecinto.includes('leao')) {
                            tamanhoTotalOcupado = Object.values(recinto.animais) * 3
                        }
                    
                      
                        let espacoExtra = 0
                        // somente o macaco que tem mais de um bioma e pode entrar num mesmo espaço que outro animais e se for do mesmo não precisa
                        if ((animaisNoRecinto.includes('gazela') && animal != 'GAZELA') || 
                        (animaisNoRecinto.includes('macacos') && animal != 'MACACO') || 
                        (animaisNoRecinto.includes('leao') && animal != 'LEAO')) {
                          espacoExtra = 1
                        }

                    
                    const tamanhoDisponivel = recinto.tamanhoTotal - tamanhoTotalOcupado - espacoExtra;

                    // Regras de conforto e compatibilidade
                    let podeAdicionar = tamanhoDisponivel >= tamanhoNecessario;

                    // Adicionar verificação para animais específicos
                    if (['LEAO', 'CROCODILO', 'LEOPARDO'].includes(animal)) {
                        
                        podeAdicionar = (animaisNoRecinto.length === 0 || animaisNoRecinto.includes(animal.toLowerCase()));
                    }

                    if (Object.keys(recinto.animais).includes('leao')) {

                        if (animal === 'LEAO') {
                            podeAdicionar = true
                        }else{
                            podeAdicionar = false
                        }
                        
                    }


                    if (podeAdicionar) {
                        recintosViaveis.push({
                            numero: recinto.numero,
                            espacoLivre: tamanhoDisponivel - tamanhoNecessario,
                            tamanhoTotal: recinto.tamanhoTotal
                        });
                    }
                }
            });

            let bollean = true
            // ver espaço livre
            for (let index = 0; index < recintosViaveis.length; index++) {
              if (recintosViaveis[index].espacoLivre < 0) {
                bollean = false
              }else{
                bollean = true
                break
              }
                
            }

            console.log(recintosViaveis)
            // Verificar se há recintos viáveis
            if (recintosViaveis.length === 0 || !bollean) {
                erro = "Não há recinto viável";
                recintosViaveis = [];
            }

            // Ordenar recintos viáveis pelo número
            recintosViaveis.sort((a, b) => a.numero - b.numero);
        }

        // Formatando a saída
        return erro 
            ? { erro: erro } 
            : { recintosViaveis: recintosViaveis.length > 0
                ? recintosViaveis.map(r => `Recinto ${r.numero} (espaço livre: ${r.espacoLivre} total: ${r.tamanhoTotal})`)
                : [] 
            };
    }
}

export { RecintosZoo as RecintosZoo };
