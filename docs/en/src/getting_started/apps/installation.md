# Installation

`openrr-apps` allows you to operate a basic robot. It is one of the applications using OpenRR, a framework implemented in Rust.

## `urdf-viz`

[`urdf-viz`](https://github.com/openrr/urdf-viz.git) is a URDF visualization application.

Actually, `urdf-viz` is not part of OpenRR, but it is recommended to install because it is used frequently in this section.

```bash
cargo install urdf-viz
```

## `openrr-apps`

`openrr-apps` is an application that implements GUI, gamepad-based operations, etc. It can send commands, topics to ROS. Robots and real machines visualized by `urdf-viz` and `gazebo` can be operated in the same way.

```bash
git clone https://github.com/openrr/openrr
cd openrr
```

For Linux and macOS users.

```bash
cargo install --path openrr-apps
```

For Windows users.

```bash
cargo install --path openrr-apps --no-default-features --features gui,assimp
```
