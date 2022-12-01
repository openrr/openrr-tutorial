# openrr_apps_robot_teleop

With `openrr_apps_robot_teleop`, what used to be controlled on a GUI application can now be controlled remotely with a joystick or similar.

```bash
openrr_apps_robot_teleop
```

## Usage

```bash
openrr_apps_robot_teleop [OPTIONS]
```

| Options                         | Description                                                                                                  |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------ |
|                                 |                                                                                                              |
| -c, --config-path <CONFIG_PATH> | Path to the setting file                                                                                     |
| -h, --help                      | Print help information                                                                                       |
| --log-directory <LOG_DIRECTORY> | Path to log directory for tracing FileAppender                                                               |
| --robot-config <ROBOT_CONFIG>   | Set options from command line. These settings take priority over the setting file specified by --config-path |
| --show-default-config           | Prints the default setting as TOML                                                                           |
| --teleop-config <TELEOP_CONFIG> | Set options from command line. These settings take priority over the setting file specified by --config-path |

## Example

Button names follow [gilrs layout](https://docs.rs/gilrs/latest/gilrs/#controller-layout).

Run `urdf-viz`. Then connect the gamepad to your PC, load and run the configuration file for Teleop.

```bash
urdf-viz ./openrr-planner/sample.urdf &
openrr_apps_robot_teleop \
    --config-path ./openrr-apps/config/sample_teleop_config_urdf_viz.toml
```

Pressing the assigned mode selection button (`North` by default) toggles the mode, and the sub-mode selection button (`East` by default) toggles the sub-mode.

```bash
PrintSpeaker: l_arm0
PrintSpeaker: r_arm0
PrintSpeaker: base
PrintSpeaker: left i k
PrintSpeaker: right i k
PrintSpeaker: pose l_arm_collision_checked zero
PrintSpeaker: l_arm0
PrintSpeaker: r_arm0
PrintSpeaker: r_arm1
PrintSpeaker: r_arm2
```

## Example (--teleop-config)

```bash
openrr_apps_robot_teleop \
    --config-path ./openrr-apps/config/sample_teleop_config_urdf_viz.toml \
    --teleop-config gamepad=\"keyboard\"
```

This is done in the same way as example (--config) in [`openrr_apps_robot_command` Example (--config)](../apps/robot_command.md#example---config), which is to overwrite existing settings.

In this example, the default operation with the gamepad is switched to operation from the keyboard.
