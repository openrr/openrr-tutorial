# Installation

`openrr-apps` allows you to operate a basic robot. It is one of the applications using OpenRR, a framework implemented in Rust.

## `urdf-viz`

[`urdf-viz`](https://github.com/openrr/urdf-viz.git) is a URDF visualization application.

```bash
cargo install urdf-viz
```

## `openrr-apps`

`openrr-apps` is an application that implements GUI, gamepad-based operations, etc. It can send commands, topics to ROS. Robots and real machines visualized by `urdf-viz` and `gazebo` can be operated in the same way.

For Linux and MacOS users.

```bash
cargo install --path openrr-apps
```

For Windows users.

```bash
cargo install --path openrr-apps --no-default-features --features gui,assimp
```
