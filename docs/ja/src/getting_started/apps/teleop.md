# Teleopering robot

`openrr-teleop`を用いる場合はconfig fileを新たに作る必要があります。

## Move the robot arm and mobile robot

```bash
urdf-viz ./openrr-planner/sample.urdf &
```

```bash
openrr_apps_robot_teleop --config-path ./openrr-apps/config/sample_teleop_config_urdf_viz.toml
```

`base`モードではロボットが移動します。ロボットアームは動きません。

この[sample file](#teleop-config-file)では、`move_base_mode`が記されています。これは移動ロボットとしての挙動を設定するものです。

## Teleop config

### Client config file

このファイルは[`"Operating robot from CLI"`](cli.md)のものと同じです。

```toml
[[urdf_viz_clients_configs]]
name = "arm"
joint_names = [
    "shoulder_yaw",
    "shoulder_pitch",
    "shoulder_roll",
    "elbow_pitch",
    "wrist_yaw",
    "wrist_pitch",
]
wrap_with_joint_position_limiter = true
# If joint_position_limits is not specified, limits will be got from URDF.
# The following values are the same as if getting limits from URDF.
joint_position_limits = [
    { lower = -3.0, upper = 3.0 },
    { lower = -2.0, upper = 1.5 },
    { lower = -1.5, upper = 2.0 },
    { lower = -2.0, upper = 1.5 },
    { lower = -3.0, upper = 3.0 },
    { lower = -2.0, upper = 2.0 },
]

[openrr_clients_config]
urdf_path = "{path_to_urdf}/sample.urdf"
self_collision_check_pairs = ["shoulder_yaw:gripper_linear1"]

# Client config for left arm
[[openrr_clients_config.collision_check_clients_configs]]
name = "arm_collision_checked"
client_name = "arm"

[[openrr_clients_config.ik_clients_configs]]
name = "arm_ik"
client_name = "arm_collision_checked"
solver_name = "arm_ik_solver"

[[openrr_clients_config.joints_poses]]
pose_name = "zero"
client_name = "arm_collision_checked"
positions = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0]

[openrr_clients_config.ik_solvers_configs.arm_ik_solver]
ik_target = "tool_fixed"
```

### Teleop config file

以下のようにしてteleop fileを作成します。1行目のようにしてclient config fileを対応させる必要があります。

```toml
robot_config_path = "sample_robot_client_config_for_urdf_viz.toml"

[control_nodes_config]
move_base_mode = "base"

[control_nodes_config.joints_pose_sender_config]

[[control_nodes_config.ik_node_teleop_configs]]
solver_name = "arm_ik_solver"
joint_trajectory_client_name = "arm"

[control_nodes_config.ik_node_teleop_configs.config]
mode = "i k"

[[control_nodes_config.joy_joint_teleop_configs]]
client_name = "arm_collision_checked"

[control_nodes_config.joy_joint_teleop_configs.config]
mode = "arm"
```

## Note

See also [reference of `openrr_apps_robot__teleop`](../../reference/apps/robot_teleop.md)
