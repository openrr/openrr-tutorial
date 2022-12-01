# Client config

## configを書く

configを自分で書くことで、サンプルにないロボットや独自に作成したロボットがOpenRRで動くようになります。configには以下の要素を書くことができます。

また、VSCodeを使用している方は[こちら](./98-jp-forusers.md)から拡張機能の`EvenBetterTOML`を導入することを推奨します。

## Default config

デフォルトは以下のようになっています。読み込んだconfigに応じて設定が追加または上書きされます。

```bash
openrr_apps_robot_command --show-default-config
```

```toml
[speak_configs]

[openrr_clients_config]
self_collision_check_pairs = []

[openrr_clients_config.ik_solvers_configs]

[plugins]
```

## robot_config

Client configに書く項目の一覧になります。リポジトリにあるサンプルもぜひご参考に。サンプルは[こちら](https://github.com/openrr/openrr/tree/main/openrr-apps/config)から。

| Properties                                                                | Description                                                                         | Type                                                                    |
| ------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| joint_trajectory_clients                                                  | 使用するJoint trajectory clients                                                    | array string                                                            |
| localization                                                              | 使用するLocalizationの指定。 `ros`、`urdf-viz`、`false`、もしくはプラグインの名前。 | string or boolean                                                       |
| move_base                                                                 | 使用するMoveBaseの指定。 `ros`、`urdf-viz`、`false`、もしくはプラグインの名前。     | string or boolean                                                       |
| navigation                                                                | 使用するNavigationの指定。 `ros`、`urdf-viz`、`false`、もしくはプラグインの名前。   | string or boolean                                                       |
| [openrr_clients_config](#openrr-clients-config)                           | OpenRR clientの設定。                                                               |                                                                         |
| [ros_action_clients_configs](#ros-control-action-client-config)           | ROS Action Clientの設定。                                                           | array [RosControlActionClientConfig](#ros-control-action-client-config) |
| plugins                                                                   | プラグインの設定。                                                                  |                                                                         |
| [ros_clients_configs](#ros-control-client-config)                         | ros_clients_configs                                                                 |                                                                         |
| [ros_cmd_vel_move_base_client_config](#ros-cmdvel-movebase-client-config) | `ROS MoveBase`の設定。`.topic`を付加して送りたいトピックを指定。                    |                                                                         |
| [ros_localization_client_config](#ros-localization-client-config)         | `ROS Localization`の設定。要素の有効無効の指定。                                    |                                                                         |
| [ros_navigation_client_config](#ros-navigation-client-config)             | `ROS Navigation`の設定。要素の有効無効の指定。                                      |                                                                         |
| speak_configs                                                             | speakの設定。                                                                       | [SpeakConfig](#speak-config)                                            |
| speakers                                                                  | 使用するSpeakersの指定。                                                            | string                                                                  |
| urdf_viz_clients_configs                                                  | urdf_vizの設定。                                                                    |                                                                         |

## `joint_trajectory_clients`

Type: array string

## `localization`, `move_base`, `navigation`

Type: string or boolean

### Example

```toml
move_base = false
```

```toml
navigation = "arci_ros2"
```

## `openrr_clients_config`

### OpenRR Clients Config

| OpenRR Clients Config                      | Type                                                                                |
| ------------------------------------------ | ----------------------------------------------------------------------------------- |
| collision_check_clients_configs            | [CollisionCheckClientConfig](#collision-check-client-config)                        |
| ik_clients_configs                         | [IkClientConfig](#ik-client-config)                                                 |
| ik_solvers_configs                         | [IkSolverConfig](#ik-solver-config)                                                 |
| joint_trajectory_clients_container_configs | [JointTrajectoryClientsContainerConfig](#joint-trajectory-client-container-config) |
| joint_poses                                | [JointsPose](#joints-pose)                                                          |
| self_collision_check_pairs                 | array string                                                                        |
| urdf_full_path                             | string                                                                              |
| urdf_path                                  | string                                                                              |

#### Example

```toml
[openrr_clients_config]
urdf_path = "./twin_arms_robot.urdf"
self_collision_check_pairs = [
    "left_shoulder:left_gripper",
    "right_shoulder:right_gripper"
]
```

### Collision Check Client Config

| Collision Check Client Config | Type                                                         |
| ----------------------------- | ------------------------------------------------------------ |
| client_name                   | string (required)                                            |
| name                          | string (required)                                            |
| self_collision_checker_config | [SelfCollisionCheckerConfig](#self-collision-checker-config) |

#### Example

```toml
[[openrr_clients_config.collision_check_clients_configs]]
client_name = "arm_with_torso"
name = "arm_with_torso_collision_checked"
```

### Self Collision Checker Config

| Self Collision Checker Config | Type                   |
| ----------------------------- | ---------------------- |
| prediction                    | double (default 0.001) |
| time_interpolate_rate         | double (default 0.5)   |

### IK Client Config

| IK Client Config | Type              |
| ---------------- | ----------------- |
| client_name      | string (required) |
| name             | string (required) |
| solver_name      | string (required) |

#### Example
```toml
[[openrr_clients_config.ik_clients_configs]]
name = "arm_with_torso_ik"
client_name = "arm_with_torso_collision_checked"
solver_name = "arm_with_torso_ik_solver"
```

### IK Solver Config

| IK Solver Config           | Type                        |
| -------------------------- | --------------------------- |
| allowable_angle_error_rad  | double (default 0.005)      |
| allowable_position_error_m | double (default 0.005)      |
| constraints                | [Constraints](#constraints) |
| ik_target                  | string (required)           |
| jacobian_multiplier        | double (default 0.1)        |
| num_max_try                | uint (default 300)          |
| root_node_name             | string                      |
| use_random_ik              | boolean (default false)     |

#### Example

```toml
[openrr_clients_config.ik_solvers_configs.arm_with_torso_ik_solver]
ik_target = "gripper_palm_joint"
allowable_position_error_m = 0.01
```

### Constraints

| Constraints         | Type                      |
| ------------------- | ------------------------- |
| ignored_joint_names | array string (default []) |
| position_x          | boolean (default true)    |
| position_y          | boolean (default true)    |
| position_z          | boolean (default true)    |
| rotation_x          | boolean (default true)    |
| rotation_y          | boolean (default true)    |
| rotation_z          | boolean (default true)    |

### Joint Trajectory Client Container Config

| Joint Trajectory Client Container Config | Type                    |
| ---------------------------------------- | ----------------------- |
| clients_name                             | array string (required) |
| name                                     | string                  |

### Joints Pose

| Joints Pose | Type                    |
| ----------- | ----------------------- |
| client_name | string (required)       |
| pose_name   | string (required)       |
| positions   | array double (required) |

#### Example

```toml
[[openrr_clients_config.joints_poses]]
pose_name = "stand by"
client_name = "arm"
positions = [0.0, 1.2, 0.0, -0.7, 0.0, -0.2, 0.0]
```

## `ros_action_clients_configs`

### ROS Control Action Client Config

| ROS Control Action Client Config            | Type                                                             |
| ------------------------------------------- | ---------------------------------------------------------------- |
| complete_allowable_errors                   | array double (required)                                          |
| complete_timeout_sec                        | double (default 10.0)                                            |
| controller_name                             | string (required)                                                |
| joint_names                                 | array string (required)                                          |
| joint_position_difference_limits            | array double                                                     |
| joint_position_limiter_strategy             | [JointPositionLimiterStrategy](#joint-position-limiter-strategy) |
| joint_position_limits                       | [JointPositionLimit](#joint-position-limit)                      |
| joint_velocity_limits                       | array double                                                     |
| name                                        | string (required)                                                |
| send_partial_joints_goal                    | boolean (default false)                                          |
| state_topic_name                            | string (required)                                                |
| wrap_with_joint_position_difference_limiter | boolean (default false)                                          |
| wrap_with_joint_position_limiter            | boolean (default false)                                          |
| wrap_with_joint_velocity_limiter            | boolean (default false)                                          |

### Joint Position Limiter Strategy

| Joint Position Limiter Strategy | Element                           |
| ------------------------------- | --------------------------------- |
| string (enum)                   | "Clamp", "ClampWithWarn", "Error" |

### Joint Position Limit

| Joint Position Limit | Type   |
| -------------------- | ------ |
| lower                | double |
| upper                | double |

#### Example
```toml
[[urdf_viz_clients_configs]]
name = "foo"
joint_names = ["bar1", "bar2"]
joint_position_limits = [
    { lower = -3.0, upper = 3.0 },
    { lower = -2.0, upper = 1.5 },
]
```

## `plugins`

| plugin config | Type                               |
| ------------- | ---------------------------------- |
| instances     | [PluginInstance](#plugin-instance) |
| path          |                                    |

| Plugin Instance | Type                                        | Description                                                                                                                                                               |
| --------------- | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| args            | string                                      | Arguments passed when creating this instance.                                                                                                                             |
| args_from_path  | string                                      | Pass the contents of the specified file as an argument.                                                                                                                   |
| path            | string (required)                           | Path to the plugin. If no extension is specified, the default extension for `cdylib` on the current OS will be selected. (linux: `.so`, macos: `.dylib`, windows: `.dll`) |
| type            | [PluginInstanceKind](#plugin-instance-kind) |

### Plugin Instance Kind

| Joint Position Limiter Strategy | Element                                                                   |
| ------------------------------- | ------------------------------------------------------------------------- |
| string (enum)                   | "JointTrajectoryClient", Localization", MoveBase", Navigation", "Speaker" |

## `ros_clients_configs`

### ROS Control Client Config

| ROS Control Client Config        | Type                                              |
| -------------------------------- | ------------------------------------------------- |
| complete_allowable_errors        | array double                                      |
| complete_timeout_sec             | double                                            |
| controller_name                  | string                                            |
| joint_names                      | array string                                      |
| joint_position_limits            | array [JointPositionLimit](#joint-position-limit) |
| joint_velocity_limits            | array double                                      |
| name                             | string                                            |
| send_partial_joints_goal         | boolean                                           |
| state_topic_name                 | string                                            |
| wrap_with_joint_position_limiter | boolean (false)                                   |
| wrap_with_joint_velocity_limiter | boolean (false)                                   |

### Joint Position Limit

| Joint Position Limit | Type   |
| -------------------- | ------ |
| lower                | double |
| upper                | double |

#### Example

```toml
[[ros_clients_configs]]
name = "arm"
joint_names = [
    "shoulder_joint",
    "shoulder_joint",
    "upper_arm_roll_joint",
    "elbow_flex_joint",
    "forearm_roll_joint",
    "wrist_flex_joint",
    "wrist_roll_joint",
]
complete_allowable_errors = [0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01]
controller_name = "arm_controller"
state_topic_name = "arm_controller/openrr/state"
```

## `ros_cmd_vel_move_base_client_config`

### ROS cmd_vel MoveBase Client Config

| ROS cmd_vel MoveBase Config | Type   |
| --------------------------- | ------ |
| topic                       | string |

## `ros_localization_client_config`

### ROS Localization Client Config

| ROS Localization Client Config     | Type    |
| ---------------------------------- | ------- |
| request_final_nomotion_update_hack | boolean |

## `ros_navigation_client_config`

### ROS Navigation Client Config

| ROS Navigation Client Config       | Type    |
| ---------------------------------- | ------- |
| clear_costmap_before_start         | boolean |
| request_final_nomotion_update_hack | boolean |

## `speak_configs`

### Speak Config

| Speak Config | Element                                            |
| ------------ | -------------------------------------------------- |
| string(enum) | `"Print"`, `"Audio"`, `"Command"` or `"RosEspeak"` |

| "RosEspeak" | Type                                               |
| ----------- | -------------------------------------------------- |
| config      | [RosEspeakClientConfig](#ros-espeak-client-config) |

| "Audio" | Type           |
| ------- | -------------- |
| args    | map (required) |

| map    | Type   |
| ------ | ------ |
| {name} | string |

### ROS Espeak Client Config

| ROS Espeak Client Config | Type   |
| ------------------------ | ------ |
| topic                    | string |

#### Example (Audio)

```toml
[speak_configs."foo"]
type = "Audio"

[speak_configs."foo".args.map]
bar = "./bar.mp3" # Path to audio file
```

```bash
openrr_apps_robot_command --config-path {path to toml} speak foo bar
```

#### Example (ROSEspeak)

```toml
[speak_configs.espeak]
type = "RosEspeak"

[speak_configs.espeak.args.config]
topic = "/sample/message"
```

```bash
openrr_apps_robot_command --config-path {path to toml} -i
>  speak espeak Hello!
```

```bash
data: "Hello!"
---
```

## `speakers`

Type: string

## `urdf_viz_clients_configs`

| URDF-Viz Web Client Config       | Type                                              |
| -------------------------------- | ------------------------------------------------- |
| joint_names                      | array string                                      |
| joint_position_limits            | array [JointPositionLimit](#joint-position-limit) |
| joint_velocity_limits            | array double                                      |
| name                             | string                                            |
| wrap_with_joint_position_limiter | boolean (default false)                           |
| wrap_with_joint_velocity_limiter | boolean (default false)                           |

#### Example

```toml
[[urdf_viz_clients_configs]]
# `urdf-viz` client name
name = "arm"
# List of joints
joint_names = [
    "shoulder_yaw",
    "shoulder_pitch",
    "shoulder_roll",
    "elbow_pitch",
    "wrist_yaw",
    "wrist_pitch",
]
wrap_with_joint_position_limiter = true

# Range of joints
joint_position_limits = [
    { lower = -3.0, upper = 3.0 },
    { lower = -2.0, upper = 1.5 },
    { lower = -1.5, upper = 2.0 },
    { lower = -2.0, upper = 1.5 },
    { lower = -3.0, upper = 3.0 },
    { lower = -2.0, upper = 2.0 },
]

[openrr_clients_config]
# Path to URDF file
urdf_path = "./sample.urdf"
self_collision_check_pairs = [
    "shoulder_yaw:gripper_linear1",
]

[[openrr_clients_config.collision_check_clients_configs]]
# Collision check client name
name = "arm_collision_checked"
# `urdf-viz` client name
client_name = "arm"

[[openrr_clients_config.ik_clients_configs]]
# IK client name
name = "arm_ik"
# Collision check client name
client_name = "arm_collision_checked"
# IK solver name
solver_name = "arm_ik_solver"

[[openrr_clients_config.joints_poses]]
# Position name
pose_name = "zero"
# Collision check client name
client_name = "arm_collision_checked"
# Position that you want to set
positions = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0]

[openrr_clients_config.ik_solvers_configs.arm_ik_solver] # IK solver name (arm_ik_solver)
ik_target = "tool_fixed"
```