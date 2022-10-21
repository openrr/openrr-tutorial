# 01-en Let's get started OpenRR

## Introduction

OpenRR is a framework for robot development written in the Rust language.

## Installation

### Supported Platforms

| OS             | Core | GUI | ROS | ROS2 |
| -------------- | ---- | --- | --- | ---- |
| Linux (Ubuntu) | ✔    | ✔   | ✔   | ✔    |
| MacOS          | ✔    | ✔   | ✔   |      |
| Windows        | ✔    | ✔   |     |      |

Ubuntu is supported as Linux. The approximate functionality is available even under MacOS and Windows.

It can be used without ROS installation even when using Linux or MacOS.

### Installation for Rust

If you are new to Rust, please follow [this](https://www.rust-lang.org/tools/install) official site to install Rust.

### Installation for latest OpenRR

You can clone from [GitHub](https://github.com/openrr/openrr).

```bash
git clone https://github.com/openrr/openrr
```

### Installation for dependency

Install software dependencies.

```bash: Linux
sudo apt install cmake build-essential libudev-dev xorg-dev libglu1-mesa-dev libasound2-dev libxkbcommon-dev
```

### \[Optional\] Installation for ROS

arci-ros

* ROS [Noetic](http://wiki.ros.org/noetic/Installation)

arci-ros2

* ROS2 [Foxy](https://docs.ros.org/en/foxy/Installation.html) or [Humble](https://docs.ros.org/en/humble/Installation.html)

## Supplementary explanation

### Notation note on Tutorial

This tutorial assumes that the current directory is on the cloned OpenRR directory.

### For those who develop OpenRR

Please also see [OpenRR](https://docs.rs/openrr/latest/openrr/) and [arci](https://docs.rs/arci/latest/arci/) Docs.

### For those who use OpenRR

Let's go to [next page](./02-en-apps.md)
