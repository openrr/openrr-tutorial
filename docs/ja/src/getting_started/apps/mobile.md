# Operating mobile robot with ROS2 and openrr-teleop

## Turtlebot3

```toml
move_base = "arci_ros2"
navigation = "arci_ros2"

[openrr_clients_config]

[plugins.arci_ros2]
path = "../../target/debug/libarci_ros2"

[[plugins.arci_ros2.instances]]
name = "arci_ros2"
type = "MoveBase"
args = """
topic = "/cmd_vel"
"""

[[plugins.arci_ros2.instances]]
name = "arci_ros2"
type = "Navigation"
args = """
action_name = "/navigate_to_pose"
"""
```

## iRobot Create3

Turtlebot3と同様です。

```toml
move_base = "arci_ros2"

[openrr_clients_config]

[plugins.arci_ros2]
path = "../../target/release/libarci_ros2"

[[plugins.arci_ros2.instances]]
name = "arci_ros2"
type = "MoveBase"
args = """
topic = "/cmd_vel"
"""

robot_config_path = "irobot_create_robot_client_config_ros2.toml"
initial_mode = "base"

[control_nodes_config]
move_base_mode = "base"

[[control_nodes_config.command_configs]]
name = "dock command"
file_path = "irobot_create_dock_command.txt"

[[control_nodes_config.command_configs]]
name = "undock command"
file_path = "irobot_create_undock_command.txt"
```

According to APIs page of [Create Docs](https://iroboteducation.github.io/create3_docs/), the following commands allow you to command specific actions.

[Create Docs](https://iroboteducation.github.io/create3_docs/)のAPIページによると、以下のコマンドで特定の動作（ドックに戻る、ドックから抜ける）ができるそうなので、割り当ててみます。

```txt
ros2 action send_goal /undock irobot_create_msgs/action/Undock "{}"
ros2 action send_goal /dock irobot_create_msgs/action/DockServo "{}"
```

```txt
openrr_apps_robot_commands execute_command -- <command>
```

- irobot_create_dock_command.txt

```txt
openrr_apps_robot_commands execute_command -- ros2 action send_goal /undock irobot_create_msgs/action/Undock "{}"
```
- irobot_create_undock_command.txt

```txt
openrr_apps_robot_commands execute_command -- ros2 action send_goal /dock irobot_create_msgs/action/DockServo "{}"
```
