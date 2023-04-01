# openrr-tutorial

[![crates.io](https://img.shields.io/crates/v/openrr.svg?logo=rust)](https://crates.io/crates/openrr) [![docs](https://docs.rs/openrr/badge.svg)](https://docs.rs/openrr) [![discord](https://dcbadge.vercel.app/api/server/8DAFFKc88B?style=flat)](https://discord.gg/8DAFFKc88B)

## Books

You can read the book at the following links.

- English: https://openrr.github.io/openrr-tutorial/en/html

- Japanese: https://openrr.github.io/openrr-tutorial/ja/html

## Requirements

Building the book requires [mdBook](https://github.com/rust-lang/mdBook), you can install it using cargo.

```bash
cargo install mdbook
```

## Building

To build the book:

```bash
mdbook build docs/en
```

## Development

While writing it can be handy to see your changes, `mdbook serve` will launch a local web
server to serve the book.

```bash
mdbook serve docs/en --open
```

## Spell check

Using cspell

### Installation of `cspell`

```bash
npm install -g cspell
```

### Spell checking

```bash
cspell -c ./cspell.json  "docs/{en,ja}/src/**"
```

### Extension

In VScode, You can use [`Code Spell Checker`](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker) to check spelling without executing the above command.
