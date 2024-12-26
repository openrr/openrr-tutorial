# Introduction

## Supported Platforms

| OS             | Core | GUI | ROS | ROS2 |
| -------------- | ---- | --- | --- | ---- |
| Linux (Ubuntu) | ✔    | ✔   | ✔   | ✔    |
| macOS          | ✔    | ✔   | ✔   |      |
| Windows        | ✔    | ✔   |     |      |

LinuxとしてUbuntuがサポートされています。macOSやWindowsであってもおおよその機能は利用できます。

LinuxやmacOSを使用している場合でも、ROSをインストールせずに使用することができます。

## Installation for Rust

もしRustを利用したことがなければ、[こちら](https://www.rust-lang.org/tools/install)からRustのインストールをしてください。

## Installation for latest OpenRR

[GitHub](https://github.com/openrr/openrr)からOpenRRをクローンします。

```bash
git clone https://github.com/openrr/openrr
```

## Installation for dependency

依存関係のソフトウェアをインストールします。

```bash
sudo apt install cmake build-essential libudev-dev xorg-dev libglu1-mesa-dev libasound2-dev libxkbcommon-dev
```

## \[Optional\] Installation for ROS

arci-ros

* ROS [Noetic](http://wiki.ros.org/noetic/Installation)

arci-ros2

* ROS2 [Foxy](https://docs.ros.org/en/foxy/Installation.html) or [Humble](https://docs.ros.org/en/humble/Installation.html)
