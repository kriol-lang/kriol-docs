---
title: Especificação Formal
description: Gramática formal da linguagem KriolLang em forma BNF modificada.
---

Esta especificação descreve a gramática da linguagem KriolLang usando uma forma modificada de **Backus-Naur Form (BNF)**.

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
                   | T_TYPE_NTER
                   | T_TYPE_BOOL
                   | T_TYPE_TEXTU
                   | T_TYPE_IDENT

<constant> ::= T_INT_LIT
             | T_FLOAT_LIT
             | T_BOOL_LIT
             | T_STR_LIT
             | T_FSTR_LIT

<identifier>      ::= T_IDENT
<declarator>      ::= <identifier>
<array_declarator>::= '[' T_INT_LIT ']' <declarator>

<declaration> ::= <type_specifier> <declarator> '=' <initializer> ';'
                | <type_specifier> <array_declarator> '=' <initializer> ';'
                | T_DIPOZ <type_specifier> <declarator> ';'
                | T_DIPOZ <type_specifier> <array_declarator> ';'

<initializer> ::= <expression>
                | <array_initializer>
                | <array_initializer> T_MUL T_INT_LIT

<typed_array_initializer>   ::= '<' <type_specifier> '>' <array_initializer>
<array_initializer>         ::= '[' <array_initializer_elements> ']'
<array_initializer_elements>::= <value_expression>
                               | <array_initializer_elements> ',' <value_expression>
<value_expression>          ::= <constant_expression>
```

**Notas:**
- Declarações sem inicializador são inválidas salvo se prefixadas com `dipoz`.
- A sintaxe de repetição `[valor] * N` requer um literal inteiro `N`.
- A sintaxe `<tipo>[...]` cria um literal de array com tipo explícito.
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

<relational_expression>  ::= <additive_expression>
                           | <relational_expression> T_LT <additive_expression>
                           | <relational_expression> T_GT <additive_expression>
                           | <relational_expression> T_LE <additive_expression>
                           | <relational_expression> T_GE <additive_expression>

<additive_expression>    ::= <multiplicative_expression>
                           | <additive_expression> T_PLUS <multiplicative_expression>
                           | <additive_expression> T_MINUS <multiplicative_expression>

<multiplicative_expression> ::= <unary_expression>
                              | <multiplicative_expression> T_MUL <primary_expression>
                              | <multiplicative_expression> T_DIV <primary_expression>
```

## Outras expressões

```bnf
<expression>            ::= <assignment_expression>
<constant_expression>   ::= <logical_or_expression>

<unary_expression>      ::= <primary_expression>
                          | T_NOT <unary_expression>
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

<record_literal>        ::= T_TYPE_IDENT '::' '{' <record_field_initializers> '}'
                          | T_TYPE_IDENT '::' '{' '}'

<record_field_initializers> ::= T_IDENT ':' <initializer>
                              | <record_field_initializers> ',' T_IDENT ':' <initializer>

<assignment_expression> ::= <constant_expression>
                          | <primary_expression> <assignment_operator> <assignment_expression>

<assignment_operator>   ::= '=' | '+=' | '-=' | '*=' | '/='
```

## Moldes (`molda`)

```bnf
<molda_declaration> ::= T_MOLDA T_TYPE_IDENT '{' <molda_field_declarations> '}'

<molda_field_declarations> ::= <molda_field_declaration>
                             | <molda_field_declarations> <molda_field_declaration>

<molda_field_declaration> ::= <type_specifier> <declarator> ';'
                            | <type_specifier> <array_declarator> ';'
```

**Notas:**
- Um molde declarado com `molda` deve declarar pelo menos um campo.
- Atribuição a campos usa a mesma regra de assignment de outros alvos
  atribuíveis, como `valor.campo = expr`.
- Campos podem ser arrays de tamanho fixo.
- Acesso e atribuição podem encadear campos e índices, como
  `pessoa.enderesus[0].rua = "medio"`.

## Funções

```bnf
<function_declaration> ::= T_FN <declarator> '(' <parameter_optional_list> ')' <type_specifier> <compound_statement>
                         | T_FN <declarator> '(' <parameter_optional_list> ')' <compound_statement>

<parameter_optional_list> ::= <parameter_list> | λ

<parameter_list>      ::= <parameter_declaration>
                        | <parameter_list> ',' <parameter_declaration>

<parameter_declaration> ::= <type_specifier> <declarator>

<argument_list>       ::= <argument_list> ',' <expression> | <expression>

<function_call>       ::= <identifier> '(' <argument_list> ')'
                        | <identifier> '(' ')'
                        | <mostra_func_call>

<mostra_func_call>    ::= T_MOSTRA '(' <argument_list> ')'
                        | T_MOSTRA '(' ')'
                        | T_MOSTRAN '(' <argument_list> ')'
                        | T_MOSTRAN '(' ')'

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
```

## Salto

```bnf
<jump_statement> ::= T_PARA ';'
                   | T_KONTINUA ';'
                   | T_DIVOLVI <expression> ';'
                   | T_DIVOLVI ';'
                   | T_SAI '(' <expression> ')' ';'
                   | T_KONFIRMA '(' <expression> ')' ';'
```

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
