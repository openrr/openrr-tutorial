# openrr-tutorial

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
