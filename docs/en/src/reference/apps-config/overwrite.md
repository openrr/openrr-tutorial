# Overwrite configuration at startup

By using `--config` flag, you can overwrite the configuration at startup.

For example, to replace the urdf path:

```bash
openrr_apps_robot_command \
  --config-path ./openrr-apps/config/sample_robot_client_config_for_urdf_viz.toml \
  --config 'openrr_clients_config.urdf_path="path/to/urdf"' \
  load_commands ./openrr-apps/command/sample_cmd_urdf_viz.txt
```

In `openrr_apps_robot_teleop`, there are two flags: `--robot-config` to overwrite robot config and `--teleop-config` to overwrite teleop config.

For example, to run `openrr_apps_robot_teleop` with `arci-gamepad-keyboard`:

```bash
openrr_apps_robot_teleop \
  --config-path ./openrr-apps/config/sample_teleop_config_urdf_viz.toml \
  --teleop-config 'gamepad="Keyboard"'
```

To disable joint_position_limiter:

```bash
openrr_apps_robot_teleop \
  --config-path ./openrr-apps/config/sample_teleop_config_urdf_viz.toml \
  --robot-config 'urdf_viz_clients_configs[0].wrap_with_joint_position_limiter=false'
```

To overwrite multiple configs, separate the scripts with a semicolon or a newline. For example:

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
