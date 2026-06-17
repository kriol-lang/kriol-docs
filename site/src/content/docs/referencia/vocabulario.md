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
| `sin`        | `true` / `1`     | Verdadeiro             |
| `nau`        | `false` / `0`    | Falso                  |
| `si`         | `if`             | Se (condicional)       |
| `sinon`      | `else`           | Senão                  |
| `pa`         | `for`            | Ciclo for              |
| `nkuantu`    | `while`          | Ciclo while            |
| `para`       | `break`          | Interromper ciclo      |
| `kontinua`   | `continue`       | Continuar ciclo        |
| `divolvi`    | `return`         | Retornar valor         |
| `mostra`     | `printf`         | Imprimir sem newline   |
| `mostran`    | `printf + \n`    | Imprimir com newline   |
| `dipoz`      | —                | Declaração diferida    |
| `molda`      | `struct`         | Declara um molde       |
| `sai`        | `exit()`         | Terminar programa      |
| `konfirma`   | `assert()`       | Verificar condição     |
| `inpristan`  | `#include`       | Importar módulo (reservado; ainda não implementado) |

## Palavras-chave planeadas

| KriolLang  | Equivalente  | Significado                  | Estado          |
|------------|--------------|------------------------------|-----------------|
| `fazi`     | —              | Implementação de métodos       | 🔄 Planeado |
| `mim/Ami`  | `self`/`this`  | Referência à própria instância | 🔄 Planeado |
| `toma`     | `scanf`/`input`| Leitura de input               | 🔄 Planeado |

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
