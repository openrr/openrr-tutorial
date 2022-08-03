# 02-en Use OpenRR Apps

`openrr-apps` allows you to operate a basic robot. It is one of the applications using OpenRR, a framework implemented in Rust.

## Setup

### Installation of `urdf-viz`

[`urdf-viz`](https://github.com/openrr/urdf-viz.git) is a URDF visualization application.

```bash
cargo install urdf-viz
```

### Installation of `openrr-apps`

`openrr-apps` is an application that implements GUI, gamepad-based operations, etc. It can send commands, topics to ROS. Robots and real machines visualized by `urdf-viz` and `gazebo` can be operated in the same way.

For Ubuntu and MacOS users.

```bash
cargo install --path openrr-apps
```

For Windows users.

```bash
cargo install --path openrr-apps --no-default-features --features gui,assimp
```

## robot command "`openrr_apps_robot_command`"

The `openrr_apps_robot_command` allows you to send several commands to the robot.

```bash
openrr_apps_robot_command [OPTIONS] [SUBCOMMAND]
```

| Options                         | Description                                                                                                  |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| -c, --config-path <CONFIG_PATH> | Path to the setting file                                                                                     |
| --config <CONFIG>               | Set options from command line. These settings take priority over the setting file specified by --config-path |
| -h, --help                      | Print help information                                                                                       |
| -i, --interactive               | Use interactive mode                                                                                         |
| --log-directory <LOG_DIRECTORY> | Path to log directory for tracing FileAppender                                                               |
| --show-default-config           | Prints the default setting as TOML                                                                           |

| Subcommands                 | Description                                               |
| --------------------------- | --------------------------------------------------------- |
| cancel_navigation_goal      | Cancel navigation goal                                    |
| execute_command             | Execute an external command                               |
| get_navigation_current_pose | Get navigation current pose                               |
| get_state                   | Get joint positions and end pose if applicable            |
| help                        | Print this message or the help of the given subcommand(s) |
| list                        | List available clients                                    |
| load_commands               | Load commands from file and execute them                  |
| move_ik                     | Move with ik                                              |
| send_base_velocity          | Send base velocity                                        |
| send_joints                 | Send joint positions                                      |
| send_joints_pose            | Send predefined joint positions                           |
| send_navigation_goal        | Send navigation goal pose                                 |
| shell_completion            | Shell completion                                          |
| speak                       | Speak text message                                        |

### Example

Start the robot on the simulator.

```bash
urdf-viz ./openrr-planner/sample.urdf &
```

![](../image/urdf-viz.png)

After that, load robot command.

```bash
openrr_apps_robot_command --config-path ./openrr-apps/config/sample_robot_client_config_for_urdf_viz.toml load_commands ./openrr-apps/command/sample_cmd_urdf_viz.txt
```

### Example (--config)

Let's add `--config move_base=false` to the previous example.

```bash
urdf-viz ./openrr-planner/sample.urdf &
openrr_apps_robot_command \
    --config-path ./openrr-apps/config/sample_robot_client_config_for_urdf_viz.toml \
    --config move_base=false \
    load_commands ./openrr-apps/command/sample_cmd_urdf_viz.txt
```

```toml
localization = true
move_base = true
navigation = true

[speak_configs]

[openrr_clients_config]
self_collision_check_pairs = []

[openrr_clients_config.ik_solvers_configs]

[plugins]
```

Disable the default setting of `move_base`. As a result, the last `openrr_apps_robot_command send_base_velocity ...` to panic and see that the setting has been overridden by `--config`.

## velocity sender "`openrr_apps_velocity_sender`"

The `openrr_apps_velocity_sender` allows you to specify a velocity to move the mobile robot.

```bash
openrr_apps_velocity_sender
```

![](../image/velocity_sender.png)

### Usage

```bash
openrr_apps_velocity_sender [OPTIONS]
```

| Options                         | Description                                                                                                  |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| -c, --config-path <CONFIG_PATH> | Path to the setting file                                                                                     |
| --config <CONFIG>               | Set options from command line. These settings take priority over the setting file specified by --config-path |
| -h, --help                      | Print help information                                                                                       |
| --theme <THEME>                 | Path to the theme file                                                                                       |

## joint position sender "`openrr_apps_joint_position_sender`"

The `openrr_apps_joint_position_sender` allows you to specify the value of each joint for manipulators and other articulated robots.

```bash
openrr_apps_joint_position_sender
```

![](../image/joint_pose_sender.png)

### Usage

```bash
openrr_apps_joint_position_sender [OPTIONS]
```

| Options                         | Description                                                                                                  |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| -c, --config-path <CONFIG_PATH> | Path to the setting file                                                                                     |
| --config <CONFIG>               | Set options from command line. These settings take priority over the setting file specified by --config-path |
| -h, --help                      | Print help information                                                                                       |
| --theme <THEME>                 | Path to the theme file                                                                                       |


## robot teleop "`openrr_apps_robot_teleop`"

With `openrr_apps_robot_teleop`, what used to be controlled on a GUI application can now be controlled remotely with a joystick or similar.

```bash
openrr_apps_robot_teleop
```

### Usage

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

### Example

    Button names follow [gilrs layout](https://docs.rs/gilrs/latest/gilrs/#controller-layout).

Run `urdf-viz`. Then connect the gamepad to your PC, load and run the configuration file for Teleop.

```bash
urdf-viz ./openrr-planner/sample.urdf &
openrr_apps_robot_teleop \
    --config-path ./openrr-apps/config/sample_teleop_config_urdf_viz.toml
```

Pressing the assigned mode selection button (`North` by default) toggles the mode, and the sub-mode selection button (`East` by default) toggles the sub-mode.

```bash : output
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

## config "`openrr_apps_config`"

`openrr_apps_config` may not be used often; it outputs the result of overwriting the configuration file specified by `--config-path` or the schema for creating a toml file with `--config`.

```bash
openrr_apps_config
```

### Usage

```bash
openrr_apps_config [OPTIONS]
```

| Options    | Description            |
| ---------- | ---------------------- |
| -h, --help | Print help information |

| Subcommands | Description                                               |
| ----------- | --------------------------------------------------------- |
| help        | Print this message or the help of the given subcommand(s) |
| merge       |                                                           |
| schema      | Generate JSON schema for the specified config file        |

### Example

```bash
openrr_apps_config schema robot-config >openrr-apps/schema/robot_config.json
openrr_apps_config schema robot-teleop-config >openrr-apps/schema/robot_teleop_config.json
```

This is used in `./tools/update-schema.sh`.

### Example

```bash
openrr_apps_config merge \
    --config-path ./openrr-apps/config/sample_teleop_config_urdf_viz.toml \
    --config robot_config_path=\"sample_robot_client_config_for_urdf_viz_with_multiple_speaker.toml\"
```

This will output to `openrr-apps/config/example_config_merge.toml` what was specified as `sample_robot_client_config_for_urdf_viz.toml` in `sample_teleop_config_urdf_viz.toml` but replaced by `sample_robot_client_config_for_urdf_viz_with_multiple_speaker.toml`.

## GUI theme

Currently only a dark theme (`./openrr-gui/dark_theme.toml`) is available, but you can customize the application by creating a toml for the GUI theme to your liking and specifying it with a subcommand.
