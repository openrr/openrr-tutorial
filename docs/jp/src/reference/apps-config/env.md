# Environmental Variables

環境変数を`export OPENRR_APPS_ROBOT_CONFIG_PATH=some_path_to_config.toml`と設定すると、`--config-path`の後のファイルの
パスの指定をスキップすることができます。明示的に`--config-path`を指定すれば環境変数は無視されます。

## `openrr_apps_robot_command`

- Run sample commands with env var

```bash
export OPENRR_APPS_ROBOT_CONFIG_PATH=$(pwd)/openrr-apps/config/sample_robot_client_config_for_urdf_viz.toml

openrr_apps_robot_command load_commands ./openrr-apps/command/sample_cmd_urdf_viz.txt
```

## `openrr_apps_joint_position_sender`

- Run for sample urdf with env var

```bash
export OPENRR_APPS_ROBOT_CONFIG_PATH=$(pwd)/openrr-apps/config/sample_robot_client_config_for_urdf_viz.toml

openrr_apps_joint_position_sender
```

## Note

他の設定にしたい場合に`OPENRR_APPS_ROBOT_CONFIG_PATH`を設定し直すことを忘れないでください。
