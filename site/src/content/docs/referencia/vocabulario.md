---
title: Vocabulário
description: Mapeamento completo das palavras-chave do Kriol para os seus equivalentes.
---

## Palavras-chave e tipos

| KriolLang    | C / Equivalente  | Significado            |
|--------------|------------------|------------------------|
| `fn`         | função           | Declara uma função     |
| `inisiu`     | `main`           | Ponto de entrada       |
| `nter`       | `int64_t`        | Inteiro de 64 bits     |
| `num`        | `double`         | Número real            |
| `textu`      | `char*`          | Cadeia de caracteres   |
| `bool`       | `bool`           | Booleano               |
| `i8`         | `int8_t`         | Inteiro assinado de 8 bits |
| `i16`        | `int16_t`        | Inteiro assinado de 16 bits |
| `i32`        | `int32_t`        | Inteiro assinado de 32 bits |
| `i64`        | `int64_t`        | Inteiro assinado de 64 bits |
| `u8`         | `uint8_t`        | Inteiro sem sinal de 8 bits |
| `u16`        | `uint16_t`       | Inteiro sem sinal de 16 bits |
| `u32`        | `uint32_t`       | Inteiro sem sinal de 32 bits |
| `u64`        | `uint64_t`       | Inteiro sem sinal de 64 bits |
| `f32`        | `float`          | Número real de 32 bits |
| `f64`        | `double`         | Número real de 64 bits |
| `isize`      | `intptr_t`       | Inteiro assinado do tamanho de ponteiro |
| `usize`      | `uintptr_t`      | Inteiro sem sinal do tamanho de ponteiro |
| `sin`        | `true` / `1`     | Verdadeiro             |
| `nau`        | `false` / `0`    | Falso                  |
| `si`         | `if`             | Se (condicional)       |
| `sinon`      | `else`           | Senão                  |
| `pa`         | `for`            | Ciclo for              |
| `nkuantu`    | `while`          | Ciclo while            |
| `para`       | `break`          | Interromper ciclo      |
| `kontinua`   | `continue`       | Continuar ciclo        |
| `divolvi`    | `return`         | Retornar valor         |
| `dipoz`      | —                | Declaração diferida    |
| `molda`      | `struct`         | Declara um molde       |
| `inpristan`  | `#include`       | Importar módulo (reservado; ainda não implementado) |

## Funções embutidas do prelúdio

| KriolLang    | C / Equivalente  | Significado            |
|--------------|------------------|------------------------|
| `mostra`     | `printf`         | Imprimir sem newline   |
| `mostran`    | `printf + \n`    | Imprimir com newline   |
| `toma`       | `stdin`          | Ler uma linha como `textu` |
| `sai`        | `exit()`         | Terminar programa      |
| `konfirma`   | `assert()`       | Verificar condição     |

Estas funções são chamadas com sintaxe normal de função, mas os nomes são reservados e não podem ser redefinidos.

## Palavras-chave planeadas

| KriolLang  | Equivalente  | Significado                  | Estado          |
|------------|--------------|------------------------------|-----------------|
| `fazi`     | —              | Implementação de métodos       | 🔄 Planeado |
| `mim/Ami`  | `self`/`this`  | Referência à própria instância | 🔄 Planeado |

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
| `/`      | Aritmético      | Divisão               |
| `==`     | Relacional      | Igual                 |
| `!=`     | Relacional      | Diferente             |
| `<`      | Relacional      | Menor que             |
| `>`      | Relacional      | Maior que             |
| `<=`     | Relacional      | Menor ou igual        |
| `>=`     | Relacional      | Maior ou igual        |
| `&&`     | Lógico          | E lógico              |
| `\|\|`   | Lógico          | Ou lógico             |
| `!`      | Lógico          | Negação               |
| `=`      | Atribuição      | Atribuição simples    |
| `+=`     | Atribuição      | Adição e atribuição   |
| `-=`     | Atribuição      | Subtração e atribuição|
| `*=`     | Atribuição      | Multiplicação e atribuição |
| `/=`     | Atribuição      | Divisão e atribuição  |
