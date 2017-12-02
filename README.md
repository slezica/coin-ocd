# Coin OCD

An obssesive-compulsive tool to enhance your command-line prompt with the ability
to drive you insane.

![example](https://i.imgur.com/8F7Yoy7.png)

## Installation

```bash
$ npm install -g coin-ocd
```

## Basic Usage

You can type `coin-ocd` on your terminal, if you prefer to self-destruct manually.

```bash
$ coin-ocd
BTC ⭡ 10896
```

Coin OCD will tell you the latest Bitcoin price, and whether it's gone
up or down in the last hour. Other currencies are supported as well:

```bash
$ coin-ocd eth
ETH ⭣ 469
```

## Advanced Usage

The real power of `coin-ocd` shows when you place it in your prompt:

```bash
you@computer $ export PS1="[\$(coin-ocd --color btc)] $PS1"
[BTC ⭡ 10896] you@computer $ echo oh yes, yes you did
oh yes, yes you did
[BTC ⭡ 10898] you@computer $
```

Finally! You can pry your fingers off the refresh hotkey of your browser
and slowly destroy your sanity in a fully-automated fashion while you work.
