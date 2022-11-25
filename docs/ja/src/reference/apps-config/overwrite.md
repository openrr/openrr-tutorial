# Overwrite configuration at startup

`--config`のオプションを追加することで、起動時にconfigファイルの上書きをすることができます。

例えば、以下のようにしてurdfへのパスを更新します。

```bash
openrr_apps_robot_command \
  --config-path ./openrr-apps/config/sample_robot_client_config_for_urdf_viz.toml \
  --config 'openrr_clients_config.urdf_path="path/to/urdf"' \
  load_commands ./openrr-apps/command/sample_cmd_urdf_viz.txt
```

`openrr_apps_robot_teleop`では2つのオプションがあります。`--robot-config`では、client config fileを上書きします。`--teleop-config`ではteleop configを上書きします。

例として、`openrr_apps_robot_teleop`を`arci-gamepad-keyboard`を追加して実行します。

```bash
openrr_apps_robot_teleop \
  --config-path ./openrr-apps/config/sample_teleop_config_urdf_viz.toml \
  --teleop-config 'gamepad="Keyboard"'
```

`joint_position_limiter`を無効にしてみます。

```bash
openrr_apps_robot_teleop \
  --config-path ./openrr-apps/config/sample_teleop_config_urdf_viz.toml \
  --robot-config 'urdf_viz_clients_configs[0].wrap_with_joint_position_limiter=false'
```

複数の設定を上書きしたい場合は、以下のようにセミコロンか改行によって分離する必要があります。

```bash
# semicolon-separated
openrr_apps_robot_teleop \
  --config-path ./openrr-apps/config/sample_teleop_config_urdf_viz.toml \
  --robot-config 'urdf_viz_clients_configs[0].wrap_with_joint_position_limiter=false;openrr_clients_config.urdf_path="path/to/urdf"'
# newline-separated
{
  echo 'urdf_viz_clients_configs[0].wrap_with_joint_position_limiter=false'
  echo 'openrr_clients_config.urdf_path="path/to/urdf"'
} > overwrite.txt
openrr_apps_robot_teleop \
  --config-path ./openrr-apps/config/sample_teleop_config_urdf_viz.toml \
  --robot-config "$(cat ./overwrite.txt)"
```
