# Troubleshooting

基本的にはエラーログなどに従ってほしいですが、よくある例を以下にあげておきます。

## Featuring ROS2

```bash
cargo build --release --features ros2
cargo install --path ./openrr-apps
```

ROS2featureしてビルドしたか確認してみてください。

## GUI Troubleshooting

GUIまわりの場合は、GitHub上の[README](https://github.com/openrr/openrr/tree/main/openrr-gui#troubleshooting)を参考にしてください。

## Somthing

## それでもだめな場合

もしかするとOpenRRのバグかもしれないので、GitHubにあるリポジトリの[Issues](https://github.com/openrr/openrr/issues)にその問題を投稿してくださると助かります。
