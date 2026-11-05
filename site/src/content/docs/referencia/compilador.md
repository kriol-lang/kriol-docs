---
title: Compilador
description: As opções do compilador kriol e como compilá-lo de origem.
---

O `kriol` é o programa que traduz um ficheiro `.kriol` para um executável. Para o instalar e compilar o primeiro programa, vê [Primeiros Passos](/introducao/primeiros-passos/).

## Opções do compilador

Estas são as opções que o `kriol --help` lista. As três primeiras são as mais usadas no dia a dia:

| Opção                   | Para que serve |
|-------------------------|----------------|
| `-o`, `--output FICH`   | Onde escrever o resultado (por omissão `./a.out`, ou `./a.wasm` para `wasm32-wasi`) |
| `--opt-lvl N`           | Nível de otimização, de `0` (nenhuma) a `3`; por omissão `2` |
| `--strict`              | Trata os avisos como erros de compilação; vê [Erros](/linguagem/erros/#avisos-e---strict) |
| `--text CÓDIGO`         | Compila o código indicado em vez de um ficheiro |
| `--target ALVO`         | `native` (por omissão) ou `wasm32-wasi`, para WebAssembly |
| `--emit-ir`             | Escreve o IR do LLVM em vez do executável, no ecrã ou no ficheiro de `-o` |
| `--ignore-extension`    | Aceita ficheiros sem a extensão `.kriol` ou `.kr` |
| `-h`, `--help`          | Mostra a ajuda |
| `-v`, `--version`       | Mostra a versão do compilador |

Para testar uma ideia sem criar ficheiro nenhum, usa `--text`:

```bash
kriol --text 'fn inisiu() { mostran(1 + 2); }' -o soma && ./soma
```

O alvo `wasm32-wasi` produz um módulo WebAssembly em vez de um executável do sistema. É assim que o [playground](https://play.kriol.dev) corre Kriol dentro do navegador:

```bash
kriol programa.kriol --target wasm32-wasi -o programa.wasm
```

Um módulo que use `spia` precisa de um ambiente com tratamento de exceções de WebAssembly, que as versões atuais dos navegadores e do Node.js já têm.

## Compilar de origem

Se quiseres compilar o compilador de origem, precisas de:

- Clang, LLVM e LLD 20
- bison e flex
- cmake

No Debian/Ubuntu:

```bash
apt install make flex bison clang-20 llvm-20 llvm-20-dev llvm-20-tools lld-20 zlib1g-dev libzstd-dev cmake wasi-libc libclang-rt-20-dev-wasm32
```

Obtém o código, incluindo o submódulo do coletor de lixo, e compila:

```bash
git clone --recursive https://github.com/kriol-lang/kriol
cd kriol
cmake -B build && cmake --build build
```

Executa:

```bash
./build/kriol --help
```

Para compilar no Windows, segue as instruções do `README.md` do [repositório](https://github.com/kriol-lang/kriol). Para mais exemplos, vê a pasta `examples/`.
