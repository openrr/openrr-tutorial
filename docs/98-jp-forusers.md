# 98-jp ユーザーへのすすめ

## [EvenBetterTOML](/##-Schemas-for-config-files)

### Schemas for config files

`schema`ディレクトリには、openrrが使用する設定ファイルのJSONスキーマが格納されており、JSONスキーマを使った補完をサポートするエディタの拡張機能と組み合わせることで、補完を有効にすることができます。

### Example (Visual Studio Code)

VS Codeでは、拡張機能である[Even Better TOML](https://marketplace.visualstudio.com/items?itemName=tamasfe.even-better-toml)をインストールし、`settings.json` で `evenBetterToml.schema.associations`オブジェクトを使用することで補完と検証を有効にすることができます。

```json
{
  "evenBetterToml.schema.associations": {
    ".*robot_client_config.*\\.toml": "https://raw.githubusercontent.com/openrr/openrr/main/openrr-apps/schema/robot_config.json",
    ".*teleop_config.*\\.toml": "https://raw.githubusercontent.com/openrr/openrr/main/openrr-apps/schema/robot_teleop_config.json",
  },
}
```

<img width="581" alt="" src="https://user-images.githubusercontent.com/43724913/116380268-c458c700-a84e-11eb-83d2-3fd33b74183c.png">

[Even Better TOML]: https://marketplace.visualstudio.com/items?itemName=tamasfe.even-better-toml
