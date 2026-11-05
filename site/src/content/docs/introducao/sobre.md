---
title: Sobre o Kriol
description: O que é o KriolLang e porquê existe.
---

## O que é o Kriol?

O **Kriol** (ou **KriolLang**) é uma linguagem de programação cujas palavras-chave vêm do **Criolo cabo-verdiano**, a língua materna de Cabo Verde.

Serve de porta de entrada à programação para quem fala Criolo: permite aprender e ensinar lógica e programação numa língua próxima do dia a dia.

### Em termos técnicos

O Kriol é uma linguagem imperativa, de tipagem estática e compilada, com uma sintaxe inspirada no C, no Go e no Rust. Em palavras simples:

- **Imperativa**: escreves os passos que o computador deve dar, um a um e pela ordem em que acontecem.
- **Tipagem estática**: cada variável tem um tipo fixo e o compilador verifica-o *antes* de o programa correr, por isso muitos erros aparecem enquanto escreves.
- **Compilada**: o `kriol` traduz o teu ficheiro para um executável, que depois corre sozinho.

## Porque usar Criolo?

O Criolo adapta-se bem à programação porque, tal como o inglês, se escreve quase sem acentos, e as palavras-chave de uma linguagem não podem ter acentos. Por exemplo:

- Em português, `se/senão` teria de ser escrito `se/senao`, sem o acento
- Em Criolo, `si/sinon` já se escreve assim, sem perder nada

## As palavras lado a lado

Se já viste código noutra linguagem, esta tabela dá-te a tradução imediata. A página [Vocabulário](/referencia/vocabulario/) tem a lista completa.

| Kriol      | C / Go          | Python     | O que faz                      |
|------------|-----------------|------------|--------------------------------|
| `fn`       | `func`          | `def`      | Declara uma função             |
| `inisiu`   | `main`          | *não tem*  | Onde o programa começa         |
| `si`       | `if`            | `if`       | Decide                         |
| `sinon`    | `else`          | `else`     | O caso contrário               |
| `pa`       | `for`           | `for`      | Repete um número de vezes      |
| `nkuantu`  | `while`         | `while`    | Repete enquanto for verdade    |
| `divolvi`  | `return`        | `return`   | Devolve um valor               |
| `mostran`  | `printf`        | `print`    | Escreve no ecrã                |
| `toma`     | `scanf`/`gets`  | `input`    | Lê uma linha escrita por quem usa |
| `sin`/`nau`| `true`/`false`  | `True`/`False` | Verdadeiro e falso         |
| `molda`    | `struct`        | `class`    | Agrupa campos num tipo novo    |

## Um programa maior

Este programa junta quase tudo o que o Kriol já tem: moldes, arrays, ciclos e leitura do que quem usa o programa escreve. Não precisas de o perceber já; cada parte é explicada nas páginas de *A Linguagem*.

```kriol
molda Pessoa {
  textu nomi;
  textu apelidu;
  int idadi;
}

fn novu_pessoa(textu nomi, textu apelidu, int idadi) Pessoa {
  divolvi Pessoa{nomi = nomi, apelidu = apelidu, idadi = idadi};
}

fn mostra_pessoa(Pessoa p) {
  mostran(f"{p.nomi} {p.apelidu} tem {p.idadi} anos de idade.");
}

fn compara_idadi(Pessoa a, Pessoa b) {
  int diferensa = a.idadi - b.idadi;

  si diferensa == 0 {
    mostran(f"{a.nomi} {a.apelidu} tem a mesma idade que {b.nomi} {b.apelidu}.");
  } sinon si diferensa > 0 {
    mostran(f"{a.nomi} {a.apelidu} é maior que {b.nomi} {b.apelidu} por {diferensa} anos.");
  } sinon {
    mostran(f"{a.nomi} {a.apelidu} é menor que {b.nomi} {b.apelidu} por {-diferensa} anos.");
  }
}

fn inisiu() {
  Pessoa[3] pessoas = [
    novu_pessoa('José', 'Tavares', 40),
    novu_pessoa('Yara', 'Coelho', 16),
    novu_pessoa('Clara', 'Sanchez', 71)
  ];

  pa int i = 0 ; i < 3 ; i += 1 {
    mostra_pessoa(pessoas[i]);
  }

  mostran("-----------------");
  mostran("[[ E tu? ]]");

  textu nomi = toma("-> Nome: ");
  textu apelidu = toma("-> Apelido: ");
  textu entrada_idadi = toma("-> Idade: ");
  int idadi = int::konverti(entrada_idadi);

  mostran("-----------------");

  Pessoa abo = novu_pessoa(nomi, apelidu, idadi);

  mostra_pessoa(abo);

  mostran("-----------------");

  pa int i = 0 ; i < 3 ; i += 1 {
    compara_idadi(abo, pessoas[i]);
  }
}
```

## Estado atual

A linguagem já suporta:

- Variáveis tipadas (`int`, `num`, `textu`, `bool` e tipos primitivos explícitos como `i32`, `u64`, `f32`)
- Variáveis no topo do ficheiro, partilhadas por todas as funções
- Funções com retorno tipado, recursão e recursão mútua
- Estruturas de controlo (`si/sinon`, `nkuantu`, `pa`)
- Arrays de tamanho fixo, incluindo multidimensionais, passados e devolvidos por valor
- Strings e interpolação com f-strings
- Moldes (`molda`), com campos, literais, acesso com `.` e semântica de valor
- Erros recuperáveis com `Erru`, `lansa`, `tenta` e `sinon`
- Erros apanhados com `spia`, `oops` e `sempri`, incluindo os erros de execução
- Conversão de texto para número com `tipo::konverti`
- Conversões de tipos implícitas e explícitas, com *casts* no estilo do C
- Operadores aritméticos, lógicos, relacionais e de bits (`&`, `|`, `^`, `~`)
- Input/output (`mostra`, `mostran`, `toma`)
- Compilação para executável nativo (Linux, Windows e macOS) e para WebAssembly (`wasm32-wasi`), que é o que faz o [playground](https://play.kriol.dev) funcionar

## Planos futuros

- Métodos e funções associadas a um tipo (`fazi`, `Tipo::funson()`, `valor.metodu()`)
- Referências explícitas (`ref`), para alterar um valor sem o copiar
- Módulos e imports (`inpristan`, já reconhecido pela gramática)
- Colecções de tamanho variável, a par dos arrays de tamanho fixo
- Interoperabilidade com C, para reutilizar bibliotecas existentes
- Biblioteca padrão mais completa, incluindo gestão de ficheiros e funções de texto
- Melhorias no sistema de tipos

O projeto é **Open Source** sob licença MIT. Contribuições são bem-vindas no [GitHub](https://github.com/kriol-lang).
