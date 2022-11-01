# Environmental Variables

If you set `export OPENRR_APPS_ROBOT_CONFIG_PATH=some_path_to_config.toml`, you can skip
`--config-path`. If you give `--config-path` explicitly, the env var is ignored.

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

Do not forget to unset OPENRR_APPS_ROBOT_CONFIG_PATH before try other settings
