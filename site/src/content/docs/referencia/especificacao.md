---
title: Especificação Formal
description: Gramática formal da linguagem KriolLang em forma BNF modificada.
---

Esta especificação descreve a gramática da linguagem KriolLang usando uma forma modificada de **Backus-Naur Form (BNF)**.

É a referência exacta da sintaxe, e pressupõe que já conheces as páginas de [A Linguagem](/linguagem/tipos/). Se estás a aprender, lê-as primeiro: aqui não há explicações, só regras.

Na notação, `<regra>` é um símbolo não terminal, `T_NOME` é um token produzido pelo analisador léxico, os caracteres entre `'` são literais, `|` separa alternativas e `λ` representa a ausência de conteúdo.

## Léxico

Antes de a gramática ser aplicada, o analisador léxico corta o ficheiro em tokens e descarta o que não conta.

### Espaços e comentários

Espaços, tabulações e mudanças de linha separam tokens e não têm outro significado: a indentação é livre. Estas duas formas de comentário são descartadas por completo:

| Forma       | Alcance |
|-------------|---------|
| `// ...`    | Até ao fim da linha |
| `/* ... */` | Até ao primeiro `*/`, atravessando linhas |

Como termina no primeiro `*/`, um `/* ... */` não se encaixa dentro de outro. Um `/*` sem fecho é um erro: *o comentário não foi fechado; falta '\*/'*.

### Identificadores

```bnf
IDENT      ::= [a-z_][a-zA-Z0-9_]*
TYPE_IDENT ::= [A-Z][a-zA-Z0-9_]*
```

A primeira letra decide o papel do nome: `IDENT` (minúscula ou `_`) para variáveis, funções, parâmetros e campos, e `TYPE_IDENT` (maiúscula) para nomes de moldes. Os identificadores distinguem maiúsculas de minúsculas.

### Literais numéricos

```bnf
INT   ::= [0-9]+
FLOAT ::= INT '.' [0-9]+
```

Um literal real precisa de dígitos nos dois lados do ponto, por isso `4.` e `.5` não são válidos, e não há notação de expoente nem separadores de dígitos. Também não há literais hexadecimais, octais ou binários. O maior literal inteiro aceito é `9223372036854775807`; acima disso o compilador recusa com *o número inteiro é demasiado grande*.

Um literal inteiro adapta-se ao tipo do destino quando o valor cabe nele; caso contrário mantém-se `int`, e o erro aparece na atribuição.

### Literais de texto

Um `T_STR_LIT` é delimitado por `"` ou `'`, e um `T_FSTR_LIT` começa por `f"` ou `f'`. Numa f-string, cada `{ ... }` contém uma expressão, e as chavetas do literal de um molde dentro dela não fecham a interpolação. Os escapes reconhecidos são `\n`, `\t`, `\r`, `\\`, `\"`, `\'`, `\0`, `\{` e `\}`; uma barra invertida seguida de outro carácter fica no texto tal como está.

## Programa

```bnf
<program> ::= <statements>

<statements> ::= <statements> <statement>
               | <statement>

<statement> ::= <expression_statement>
              | <compound_statement>
              | <selection_statement>
              | <iteration_statement>
              | <jump_statement>
              | <function_declaration>
              | <molda_declaration>
              | <declaration>
              | <import_statement>
```

## Importação

```bnf
<import_statement> ::= T_INPRISTAN <single_import>
<single_import>    ::= T_STR_LIT
```

:::caution
`inpristan` já é reconhecido pela gramática, mas importação de módulos ainda
não está implementada na versão atual.
:::

## Declaração de variáveis

```bnf
<type_specifier> ::= T_TYPE_NUM
                   | T_TYPE_INT
                   | T_TYPE_BOOL
                   | T_TYPE_TEXTU
                   | T_TYPE_PRIMITIVE
                   | T_TYPE_IDENT

<constant> ::= T_INT_LIT
             | T_FLOAT_LIT
             | T_BOOL_LIT
             | T_STR_LIT
             | T_FSTR_LIT

<identifier>      ::= T_IDENT
<declarator>      ::= <identifier>
<array_dims>      ::= '[' T_INT_LIT ']'
                    | <array_dims> '[' T_INT_LIT ']'

<declaration> ::= <type_specifier> <declarator> '=' <initializer> ';'
                | <type_specifier> <array_dims> <declarator> '=' <initializer> ';'

<initializer> ::= <expression>
                | <array_value>

<array_value>               ::= <array_initializer> | <repeat_initializer>
<typed_array_initializer>   ::= '(' <type_specifier> '[' ']' ')' <array_initializer>
<array_initializer>         ::= '[' <array_initializer_elements> ']'
<repeat_initializer>        ::= '[' <element_initializer> ';' T_INT_LIT ']'
<array_initializer_elements>::= <element_initializer>
                               | <array_initializer_elements> ',' <element_initializer>
<element_initializer>       ::= <value_expression> | <array_value>
<value_expression>          ::= <constant_expression>
```

**Notas:**
- Toda a declaração de variável exige um inicializador, que não pode referir a variável declarada.
- Em `int[2][3]`, o primeiro tamanho é a dimensão de fora (2 linhas de 3), como em C e em Go. Cada linha de um inicializador aninhado é validada contra o tamanho da sua dimensão.
- A sintaxe de repetição `[valor; N]` requer um literal inteiro `N`, igual ao tamanho do array.
- A sintaxe `(tipo[]) [...]` cria um literal de array com tipo explícito.
- Um literal `[ ... ]` sem tipo explícito precisa de contexto, como uma variável
  ou campo de array.
- Nomes de tipos de moldes declarados com `molda` usam `T_TYPE_IDENT`, isto é, começam com
  letra maiúscula.

## Expressões binárias

```bnf
<logical_or_expression>  ::= <logical_and_expression>
                           | <logical_or_expression> T_OR <logical_and_expression>

<logical_and_expression> ::= <equality_expression>
                           | <logical_and_expression> T_AND <equality_expression>

<equality_expression>    ::= <relational_expression>
                           | <equality_expression> T_EQ <relational_expression>
                           | <equality_expression> T_NE <relational_expression>

<relational_expression>  ::= <bit_or_expression>
                           | <relational_expression> T_LT <bit_or_expression>
                           | <relational_expression> T_GT <bit_or_expression>
                           | <relational_expression> T_LE <bit_or_expression>
                           | <relational_expression> T_GE <bit_or_expression>

<bit_or_expression>      ::= <bit_xor_expression>
                           | <bit_or_expression> T_BIT_OR <bit_xor_expression>

<bit_xor_expression>     ::= <bit_and_expression>
                           | <bit_xor_expression> T_BIT_XOR <bit_and_expression>

<bit_and_expression>     ::= <additive_expression>
                           | <bit_and_expression> T_BIT_AND <additive_expression>

<additive_expression>    ::= <multiplicative_expression>
                           | <additive_expression> T_PLUS <multiplicative_expression>
                           | <additive_expression> T_MINUS <multiplicative_expression>

<multiplicative_expression> ::= <unary_expression>
                              | <multiplicative_expression> T_MUL <unary_expression>
                              | <multiplicative_expression> T_DIV <unary_expression>
                              | <multiplicative_expression> T_MOD <unary_expression>
```

## Outras expressões

```bnf
<expression>            ::= <assignment_expression>
<constant_expression>   ::= <logical_or_expression>

<unary_expression>      ::= <primary_expression>
                          | T_NOT <unary_expression>
                          | T_BIT_NOT <unary_expression>
                          | '(' <type_specifier> ')' <unary_expression>
                          | T_TENTA <unary_expression>
                          | T_MINUS <unary_expression>

<primary_expression>    ::= <postfix_expression>

<postfix_expression>    ::= <primary_atom>
                          | <postfix_expression> '(' <argument_list> ')'
                          | <postfix_expression> '(' ')'
                          | <postfix_expression> '[' <expression> ']'
                          | <postfix_expression> '.' T_IDENT
                          | <postfix_expression> '::' T_IDENT

<primary_atom>          ::= <identifier>
                          | <constant>
                          | <record_literal>
                          | <typed_array_initializer>
                          | '(' <expression> ')'

<record_literal>        ::= T_TYPE_IDENT '{' <record_field_initializers> '}'
                          | T_TYPE_IDENT '{' '}'

<record_field_initializers> ::= T_IDENT '=' <initializer>
                              | <record_field_initializers> ',' T_IDENT '=' <initializer>

<assignment_expression> ::= <constant_expression>
                          | <constant_expression> T_SINON <constant_expression>
                          | <constant_expression> T_SINON <array_value>
                          | <primary_expression> <assignment_operator> <assignment_expression>
                          | <primary_expression> <assignment_operator> <array_value>

<assignment_operator>   ::= '=' | '+=' | '-=' | '*=' | '/=' | '%=' | '&=' | '|=' | '^='
```

## Moldes (`molda`)

```bnf
<molda_declaration> ::= T_MOLDA T_TYPE_IDENT '{' <molda_field_declarations> '}'

<molda_field_declarations> ::= <molda_field_declaration>
                             | <molda_field_declarations> <molda_field_declaration>

<molda_field_declaration> ::= <type_specifier> <declarator> ';'
                            | <type_specifier> <array_dims> <declarator> ';'
```

**Notas:**
- Um molde declarado com `molda` deve declarar pelo menos um campo.
- A gramática aceita `molda` como instrução em qualquer sítio, mas só um `molda`
  no topo do ficheiro registra um tipo novo. Dentro de uma função é ignorado, e
  o tipo não passa a existir.
- Todos os campos são obrigatórios no literal; campos em falta, repetidos ou
  desconhecidos são erros de análise semântica.
- Atribuição a campos usa a mesma regra de assignment de outros alvos
  atribuíveis, como `valor.campo = expr`.
- Campos podem ser arrays de tamanho fixo.
- Acesso e atribuição podem encadear campos e índices, como
  `pessoa.enderesus[0].rua = "medio"`.

## Funções

```bnf
<function_declaration> ::= T_FN <declarator> '(' <parameter_optional_list> ')' <type_specifier> <compound_statement>
                         | T_FN <declarator> '(' <parameter_optional_list> ')' <compound_statement>
                         | T_FN <declarator> '(' <parameter_optional_list> ')' <type_specifier> ':' T_TYPE_IDENT <compound_statement>
                         | T_FN <declarator> '(' <parameter_optional_list> ')' ':' T_TYPE_IDENT <compound_statement>
                         | T_FN <declarator> '(' <parameter_optional_list> ')' <type_specifier> <array_dims> <compound_statement>
                         | T_FN <declarator> '(' <parameter_optional_list> ')' <type_specifier> <array_dims> ':' T_TYPE_IDENT <compound_statement>

<parameter_optional_list> ::= <parameter_list> | λ

<parameter_list>      ::= <parameter_declaration>
                        | <parameter_list> ',' <parameter_declaration>

<parameter_declaration> ::= <type_specifier> <declarator>
                          | <type_specifier> <array_dims> <declarator>

<argument_list>       ::= <argument_list> ',' <argument> | <argument>
<argument>            ::= <expression> | <array_value>

<function_call>       ::= <identifier> '(' <argument_list> ')'
                        | <identifier> '(' ')'

<expression_statement>::= <expression> ';' | ';'
<compound_statement>  ::= '{' <statements> '}' | '{' '}'
```

## Seleção

```bnf
<selection_statement> ::= T_SI <expression> <compound_statement>
                        | T_SI <expression> <compound_statement> T_SINON <else_then>

<else_then> ::= <compound_statement>
              | <selection_statement>
```

## Iteração

```bnf
<iteration_statement> ::= T_NKUANTU <expression> <compound_statement>
                        | T_PA <expression> ';' <expression> ';' <expression> <compound_statement>
                        | T_PA <expression> ';' <expression> <compound_statement>
```

## Salto

```bnf
<jump_statement> ::= T_KEBRA ';'
                   | T_KONTINUA ';'
                   | T_DIVOLVI <expression> ';'
                   | T_DIVOLVI <array_value> ';'
                   | T_DIVOLVI ';'
                   | T_LANSA <expression> ';'
```

**Notas sobre saltos:**
- `kebra` e `kontinua` só são válidos dentro de um `pa` ou de um `nkuantu`, e
  afetam o ciclo mais interior onde aparecem.
- `divolvi` sem expressão é válido numa função sem tipo de retorno, e também em
  `inisiu`, onde termina o programa com sucesso.
- `paniku` e `sai` nunca regressam, por isso uma função com tipo de retorno não
  precisa de `divolvi` depois deles.

**Notas sobre erros:**
- `Erru` é um molde predefinido (`molda Erru { textu mensage; }`) e é o único tipo aceite depois de `:` na assinatura de uma função. O nome é reservado e não pode ser redeclarado.
- `T_SINON` como operador de valor por omissão tem a precedência mais baixa das expressões (acima da atribuição). O operando esquerdo, e o de `tenta`, tem de ser uma chamada a uma função que pode falhar.
- A gramática aceita estas construções em qualquer sítio, e a análise semântica verifica onde são válidas: `tenta` e `lansa` só dentro de funções que declaram `: Erru`.

## Limites

O compilador impõe estes limites para que programas grandes falhem com uma mensagem clara, em vez de esgotarem a memória ou a pilha:

| Limite | Valor |
|---|---|
| Profundidade de uma expressão (operadores, chamadas, parênteses e inicializadores encadeados) | 256 níveis |
| Elementos de uma dimensão de um array | 1 048 576 |
| Tamanho de uma variável local ou parâmetro | 1 MiB |
| Aninhamento de blocos (`si`, `nkuantu`, `pa`, `{ }`) | cerca de 2 500 níveis |
| Pilha dos programas compilados (Linux, Windows e WebAssembly) | 8 MiB |

Uma soma como `1 + 1 + ... + 1` conta um nível por operador, por isso também está sujeita ao limite de profundidade.

# Referências

Este projeto é possível graças a (mas não apenas) essas referências:

* https://github.com/lsegal/my_toy_compiler
* https://llvm.org/docs/tutorial/MyFirstLanguageFrontend/index.html
* https://github.com/xkbeyer/liquid
* https://kuree.gitbooks.io/the-go-programming-language-report/content/18/text.html
* https://cs.wmich.edu/~gupta/teaching/cs4850/sumII06/The%20syntax%20of%20C%20in%20Backus-Naur%20form.htm
* S. Sarda, Mayur Pandey, TotalBoox, and TBX, LLVM Essentials. Packt Publishing, 2015.
* C. Donnelly and R. Stallman, Bison: the Yacc-comp. parser generator. 2015
* L. Segal, “Writing Your Own Toy Compiler Using Flex, Bison and LLVM,” Sep. 18, 2009. http://gnuu.org/2009/09/18/writing-your-own-toy-compiler/ (accessed Jun., 2022).
