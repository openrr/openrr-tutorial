# 98-en For users

## [EvenBetterTOML](/##-Schemas-for-config-files)

### Schemas for config files

The `schema` directory contains the JSON schemas for the config files used by openrr, and when combined with an extension of the editor that supports completion using the JSON schema, completion can be enabled.

### Example (Visual Studio Code)

In VS Code, you can enable completion and validation by installing the [Even Better TOML](https://marketplace.visualstudio.com/items?itemName=tamasfe.even-better-toml) extension and using the `evenBetterToml.schema.associations` configuration object in `settings.json`.

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
