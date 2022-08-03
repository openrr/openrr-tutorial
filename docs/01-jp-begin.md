# 01-jp OpenRRをはじめよう！

## Introduction

OpenRRはRustで書かれたロボット開発用のフレームワークです。

## Installation

### 対応プラットフォーム

| OS             | Core | GUI | ROS | ROS2 |
| -------------- | ---- | --- | --- | ---- |
| Linux (Ubuntu) | ✔    | ✔   | ✔   | ✔    |
| MacOS          | ✔    | ✔   | ✔   |      |
| Windows        | ✔    | ✔   |     |      |

LinuxとしてサポートしているのはUbuntuになります。MacOSやWindowsであってもおおよその機能は使用可能です。

LinuxやMacOSを使う場合でもROSのインストールなしに使用できます。

### Rustのインストール

Rustが初めてという方は[こちら](https://www.rust-lang.org/tools/install)の公式サイトに従ってRustのインストールを行ってください。

### 最新のOpenRRのインストール

[GitHub](https://github.com/openrr/openrr)からクローンできます。

```bash
git clone https://github.com/openrr/openrr
```

### 依存関係

依存関係にあるソフトウェアをインストールします。

```bash: Linux
sudo apt install cmake build-essential libudev-dev xorg-dev libglu1-mesa-dev libasound2-dev libxkbcommon-dev
```

### \[オプション\]　ROSのインストール

arci-ros

* ROS [Noetic](http://wiki.ros.org/noetic/Installation)

arci-ros2

* ROS2 [Foxy](https://docs.ros.org/en/foxy/Installation.html) or [Galactic](https://docs.ros.org/en/galactic/Installation.html)

## 補足

### Tutorial上の表記の注記

このチュートリアルではカレントディレクトリがクローンしたOpenRRディレクトリ上であることを前提にしています。

### OpenRRの開発をする方

[OpenRR](https://docs.rs/openrr/latest/openrr/)、[arci](https://docs.rs/arci/latest/arci/)のDocsも併せてご覧ください。

### OpenRRを利用する方

[次のページ](./02-jp-apps.md)へどうぞ。
