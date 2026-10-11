---
title: Vocabulário
description: Mapeamento completo das palavras-chave do Kriol para os seus equivalentes.
---

Esta página é a tradução de tudo o que o Kriol reserva para si. A coluna *Vem de* dá a palavra portuguesa correspondente, que é muitas vezes a forma mais rápida de fixar o termo.

## Palavras-chave e tipos

| KriolLang    | C / Equivalente  | Significado            | Vem de     |
|--------------|------------------|------------------------|------------|
| `fn`         | função           | Declara uma função     | *funson*   |
| `inisiu`     | `main`           | Ponto de entrada       | *inísiu*, início |
| `int`        | `int64_t`        | Inteiro de 64 bits     | *interu*   |
| `num`        | `double`         | Número real            | *numeru*   |
| `textu`      | `char*`          | Cadeia de caracteres   | *textu*    |
| `bool`       | `bool`           | Booleano               | booleano   |
| `i8`         | `int8_t`         | Inteiro assinado de 8 bits | |
| `i16`        | `int16_t`        | Inteiro assinado de 16 bits | |
| `i32`        | `int32_t`        | Inteiro assinado de 32 bits | |
| `i64`        | `int64_t`        | Inteiro assinado de 64 bits | |
| `u8`         | `uint8_t`        | Inteiro sem sinal de 8 bits | |
| `u16`        | `uint16_t`       | Inteiro sem sinal de 16 bits | |
| `u32`        | `uint32_t`       | Inteiro sem sinal de 32 bits | |
| `u64`        | `uint64_t`       | Inteiro sem sinal de 64 bits | |
| `f32`        | `float`          | Número real de 32 bits | |
| `f64`        | `double`         | Número real de 64 bits | |
| `isize`      | `intptr_t`       | Inteiro assinado do tamanho de ponteiro | |
| `usize`      | `uintptr_t`      | Inteiro sem sinal do tamanho de ponteiro | |
| `sin`        | `true` / `1`     | Verdadeiro             | *sin*, sim |
| `nau`        | `false` / `0`    | Falso                  | *nau*, não |
| `si`         | `if`             | Se (condicional)       | *si*, se   |
| `sinon`      | `else`           | Senão                  | *sinon*, senão |
| `pa`         | `for`            | Ciclo for              | *pa*, para |
| `nkuantu`    | `while`          | Ciclo while            | *nkuantu*, enquanto |
| `kebra`      | `break`          | Interromper ciclo      | *kebra*, quebra |
| `kontinua`   | `continue`       | Continuar ciclo        | *kontinua*, continua |
| `divolvi`    | `return`         | Retornar valor         | *divolvi*, devolve |
| `lansa`      | `throw`          | Falhar a função com um `Erru` | *lansa*, lança |
| `tenta`      | `try` / `?`      | Passar adiante o erro de uma chamada | *tenta*, tenta |
| `molda`      | `struct`         | Declara um molde       | *molda*, molde |
| `inpristan`  | `#include`       | Importar módulo (reservado; ainda não implementado) | *inpristan*, empresta |

:::note
`sinon` tem dois papéis: é o `else` de um `si`, e é o valor por omissão de uma chamada que pode falhar (`f() sinon 0`). O compilador distingue-os pelo sítio onde aparecem.
:::

## Funções embutidas do prelúdio

| KriolLang    | C / Equivalente  | Significado            | Vem de     |
|--------------|------------------|------------------------|------------|
| `mostra`     | `printf`         | Imprimir sem newline, com um ou mais valores | *mostra* |
| `mostran`    | `printf + \n`    | Imprimir com newline, com zero ou mais valores | *mostra* + *n* de nova linha |
| `toma`       | `stdin`          | Ler uma linha como `textu` (pode falhar com `Erru`) | *toma*, recebe |
| `sai`        | `exit()`         | Terminar programa (sem argumento, com código 0) | *sai* |
| `konfirma`   | `assert()`       | Verificar condição (com mensagem opcional) | *konfirma* |
| `paniku`     | `panic()`        | Terminar com uma mensagem de erro | *pâniku*, pânico |

Estas funções são chamadas com sintaxe normal de função, mas os nomes são reservados e não podem ser redefinidos.

## Tipos e operações já existentes na linguagem

| KriolLang          | Significado |
|--------------------|-------------|
| `Erru`             | O molde de erro embutido, `molda Erru { textu mensage; }`; o nome está reservado |
| `mensage`          | O único campo de `Erru`, com a mensagem do erro |
| `tipo::konverti(t)` | Converte um `textu` num número ou `bool`; falha com `Erru` se o texto não servir |

## Palavras-chave planeadas

| KriolLang  | Equivalente  | Significado                  | Estado          |
|------------|--------------|------------------------------|-----------------|
| `fazi`     | *não tem*      | Implementação de métodos       | 🔄 Planeado |
| `mim/Ami`  | `self`/`this`  | Referência à própria instância | 🔄 Planeado |
| `ref`      | `&`            | Referência explícita a um valor | 🔄 Planeado |

## Comentários

| Forma         | Significado                     |
|---------------|---------------------------------|
| `// ...`      | Comentário até ao fim da linha  |
| `/* ... */`   | Comentário em várias linhas (não se encaixam um no outro) |

## Literais

| Forma               | Exemplo              | Tipo       |
|---------------------|----------------------|------------|
| Inteiro             | `42`, `-17`          | `int`, adaptado ao destino se couber |
| Real                | `3.14`, `-2.5`       | `num`; precisa de dígitos antes e depois do ponto, e não aceita expoente |
| Lógico              | `sin`, `nau`         | `bool`     |
| Texto               | `"oi"`, `'oi'`       | `textu`    |
| Texto interpolado   | `f"n = {n}"`         | `textu`    |
| Array               | `[1, 2, 3]`          | o tipo do destino |
| Array repetido      | `[0; 5]`             | o tipo do destino |
| Array tipado        | `(int[]) [1, 2, 3]`  | `int[3]`   |
| Valor de molde      | `Pessoa{nomi = "x", idadi = 1}` | `Pessoa` |

## Sequências de escape

| Sequência | Significado      |
|-----------|------------------|
| `\n`      | Nova linha       |
| `\t`      | Tabulação        |
| `\r`      | Retorno de carro |
| `\\`      | Barra invertida  |
| `\"`      | Aspas duplas     |
| `\'`      | Aspas simples    |
| `\0`      | Carácter nulo    |
| `\{`      | Chaveta `{` numa f-string |
| `\}`      | Chaveta `}` numa f-string |

Uma barra invertida seguida de outro carácter fica no texto tal como está.

## Extensões de ficheiro

| Extensão   | Uso        |
|------------|------------|
| `.kriol`   | Preferida  |
| `.kr`      | Alternativa|

## Operadores

| Operador | Categoria       | Descrição             |
|----------|-----------------|-----------------------|
| `+`      | Aritmético      | Adição                |
| `-`      | Aritmético      | Subtração / Negação   |
| `*`      | Aritmético      | Multiplicação         |
| `/`      | Aritmético      | Divisão (inteira entre inteiros, como em C) |
| `%`      | Aritmético      | Resto da divisão      |
| `==`     | Relacional      | Igual                 |
| `!=`     | Relacional      | Diferente             |
| `<`      | Relacional      | Menor que             |
| `>`      | Relacional      | Maior que             |
| `<=`     | Relacional      | Menor ou igual        |
| `>=`     | Relacional      | Maior ou igual        |
| `&&`     | Lógico          | E lógico              |
| `\|\|`   | Lógico          | Ou lógico             |
| `!`      | Lógico          | Negação               |
| `&`      | Bits            | E bit a bit           |
| `\|`     | Bits            | Ou bit a bit          |
| `^`      | Bits            | Ou exclusivo bit a bit |
| `~`      | Bits            | Complemento (unário)  |
| `=`      | Atribuição      | Atribuição simples    |
| `+=`     | Atribuição      | Adição e atribuição   |
| `-=`     | Atribuição      | Subtração e atribuição|
| `*=`     | Atribuição      | Multiplicação e atribuição |
| `/=`     | Atribuição      | Divisão e atribuição  |
| `%=`     | Atribuição      | Resto e atribuição    |
| `&=`     | Atribuição      | E bit a bit e atribuição |
| `\|=`    | Atribuição      | Ou bit a bit e atribuição |
| `^=`     | Atribuição      | Ou exclusivo e atribuição |
| `(tipo)` | Conversão       | *Cast* explícito para um tipo numérico ou `bool` |
| `.`      | Acesso          | Campo de um valor de molde |
| `[ ]`    | Acesso          | Elemento de um array  |
| `::`     | Qualificação    | Função associada a um tipo, como `int::konverti` |
| `sinon`  | Erros           | Valor por omissão de uma chamada que pode falhar |

Não existem `++`, `--`, `<<`, `>>`, nem operador ternário `? :`.

As opções do compilador estão em [Primeiros Passos](/introducao/primeiros-passos/#opções-do-compilador).
