# Installation

`openrr-apps`によってロボットの操作ができます。Rustによって実装されたOpenRRを用いたアプリケーションの一例です。

## `urdf-viz`

[`urdf-viz`](https://github.com/openrr/urdf-viz.git) is a URDF visualization application.

実際には`urdf-viz`はOpenRRの機能ではありませんが、この章ではよく用いるため合わせてインストールします。

```bash
cargo install urdf-viz
```

## `openrr-apps`

`openrr-apps`は、GUIやコントローラなどから操作するためのアプリケーションです。コマンドやROSのトピックを介した操作、実機や`urdf-viz`上、`gazebo`上に関わらず同じように操作できます。

```bash
git clone https://github.com/openrr/openrr
cd openrr
```

LinuxやmacOSユーザーの方はこちら。

```bash
cargo install --path openrr-apps
```

Windowsユーザーの方はこちら。

```bash
cargo install --path openrr-apps --no-default-features --features gui,assimp
```
