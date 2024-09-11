---

# Recintos do Zoológico

Este documento descreve a função principal da classe `RecintosZoo` e explica o funcionamento passo a passo.

## Função Principal: `analisaRecintos(animal, quantidade)`

A função `analisaRecintos` é o coração do sistema e realiza a análise dos recintos para determinar quais são viáveis para acomodar uma quantidade específica de um animal. Aqui está uma visão detalhada de como essa função opera:

### Passo a Passo

1. **Validação de Entrada:**
   - **Animal Inválido:**
     - Verifica se o tipo de animal fornecido existe na lista `animaisInfo`. Se não existir, define um erro: `"Animal inválido"`.
   - **Quantidade Inválida:**
     - Verifica se a quantidade é um número válido, positivo e inteiro. Se não for, define um erro: `"Quantidade inválida"`.

2. **Obtenção das Informações do Animal:**
   - Recupera as informações do animal fornecido da lista `animaisInfo`, incluindo o tamanho necessário por animal e os biomas onde ele pode viver.

3. **Análise de Recintos:**
   - **Iteração Sobre Cada Recinto:**
     - Percorre todos os recintos disponíveis na lista `recintos`.
   - **Verificação de Bioma:**
     - Se o animal pode viver em múltiplos biomas, verifica se o bioma do recinto é compatível com pelo menos um dos biomas do animal.
   - **Cálculo do Espaço Ocupado:**
     - Calcula o espaço total ocupado pelos animais existentes no recinto, multiplicando a quantidade de cada tipo de animal pelo seu tamanho.
   - **Consideração de Espaço Extra:**
     - Adiciona um espaço extra se o recinto já contém animais incompatíveis com o novo animal (por exemplo, animais que não podem coexistir).
   - **Verificação de Disponibilidade de Espaço:**
     - Calcula o espaço disponível no recinto subtraindo o espaço ocupado e o espaço extra do tamanho total do recinto.
   - **Regras de Conforto e Compatibilidade:**
     - Verifica se o recinto é adequado para o novo animal, considerando regras específicas, como a necessidade de compatibilidade com animais já presentes.

4. **Filtragem e Ordenação de Recintos Viáveis:**
   - **Adiciona Recintos Viáveis:**
     - Se o recinto tem espaço suficiente e atende a todas as regras de conforto e compatibilidade, é adicionado à lista de recintos viáveis.
   - **Verifica Espaço Livre:**
     - Garante que todos os recintos na lista de recintos viáveis têm espaço livre suficiente.
   - **Ordena os Recintos:**
     - Ordena a lista de recintos viáveis pelo número do recinto para garantir uma apresentação ordenada.

5. **Formatando a Saída:**
   - **Erro:**
     - Se não há recintos viáveis ou se houve erro, retorna um objeto com a mensagem de erro.
   - **Recintos Viáveis:**
     - Se houver recintos viáveis, retorna uma lista formatada com o número do recinto, espaço livre e tamanho total.

## Testes

Os testes são projetados para validar o funcionamento da função `analisaRecintos` e cobrem os seguintes casos:

1. **Animal Inválido:**
   - Verifica se um erro é retornado quando o animal não está na lista `animaisInfo`.

2. **Quantidade Inválida:**
   - Testa se um erro é retornado para quantidades que não são válidas.

3. **Recintos Viáveis:**
   - **Crocodilo:** Testa a capacidade de encontrar recintos adequados para 1 crocodilo.
   - **Macacos:** Verifica a capacidade de encontrar recintos para 2 macacos e considera a compatibilidade com outros animais.
   - **Hipopotamo:** Testa a capacidade de encontrar recintos adequados para 2 hipopótamos.
   - **Leão:** Verifica a capacidade de encontrar recintos para 1 leão e a impossibilidade para 2 leopardos.
   - **Gazela:** Testa a capacidade de encontrar recintos adequados para 1 gazela.

4. **Verificação de Espaço Livre:**
   - Confirma que o espaço livre é corretamente calculado e que recintos com espaço negativo não são incluídos.

### Executando os Testes

Para executar os testes, utilize o framework [Jest](https://jestjs.io/). Execute o seguinte comando:

```bash
npm test
```

Isso executará todos os testes definidos e verificará a precisão da função `analisaRecintos`.

---

Este README fornece uma visão detalhada da função `analisaRecintos` e dos testes realizados para garantir seu funcionamento correto.
