---
title: Sobre o Kriol
description: O que é o KriolLang e porquê existe.
---

## O que é o Kriol?

**KriolLang** (ou **Kriol**) é uma linguagem de programação imperativa, de tipagem estática e compilada. Foi criada usando palavras-chave do **Criolo cabo-verdiano**, a língua materna de Cabo Verde.

A sintaxe inspira-se em linguagens como C, Go e Rust, mas distingue-se pelo uso da língua criola para tornar a programação mais acessível aos cabo-verdianos e falantes de criolo.

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

## Porque usar Criolo?

O Criolo é naturalmente adequado para programação. Tal como o inglês, tem baixa dependência de acentos e caracteres especiais. Exemplo:

- Em português: `se/senão` precisa de ser escrito `se/senao` (sem acento)
- Em Criolo: `si/sinon` já é naturalmente ASCII e soa relativamente mais natural

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

## Objectivo

O Kriol serve como porta de entrada à programação para falantes de Criolo cabo-verdiano. Permite ensinar lógica e programação numa língua próxima do quotidiano.

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
- Conversão de texto para número com `tipo::konverti`
- Conversões de tipos implícitas e explícitas, com *casts* no estilo do C
- Operadores aritméticos, lógicos, relacionais e de bits (`&`, `|`, `^`, `~`)
- Input/output (`mostra`, `mostran`, `toma`)
- Compilação para executável nativo (Linux e Windows) e para WebAssembly (`wasm32-wasi`), que é o que faz o [playground](https://play.kriol.dev) funcionar

## Planos futuros

- Suporte para macOS
- Métodos e funções associadas a um tipo (`fazi`, `Tipo::funson()`, `valor.metodu()`)
- Referências explícitas (`ref`), para alterar um valor sem o copiar
- Módulos e imports (`inpristan`, já reconhecido pela gramática)
- Colecções de tamanho variável, a par dos arrays de tamanho fixo
- Interoperabilidade com C, para reutilizar bibliotecas existentes
- Biblioteca padrão mais completa, incluindo gestão de ficheiros e funções de texto
- Melhorias no sistema de tipos

O projecto é **Open Source** sob licença MIT. Contribuições são bem-vindas no [GitHub](https://github.com/kriol-lang).
