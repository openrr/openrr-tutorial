# Operating robot from CLI

## Move the robot arm

### From the command text file

If you have not cloned `OpenRR`, do this.

```bash
git clone https://github.com:openrr/openrr
cd openrr
```

Let's display the sample robot arm.

```bash
urdf-viz ./openrr-planner/sample.urdf &
```

![sample_robot_arm](images/sample_robot_arm.png)

You can use `load_commands` to execute commands in a text file. Now, let's do it for the robot arm.

```bash
openrr_apps_robot_command \
    --config-path ./openrr-apps/config/sample_robot_client_config_for_urdf_viz.toml \
    load_commands ./openrr-apps/command/sample_cmd_urdf_viz.txt
```

Finally, if the terminal outputs the following, it is successful.

```bash
PrintSpeaker: "This is sample robot"
```

### From your command line

It can also be executed by typing the command directly without using `load_commands`. Try to get the robot arm status.

```bash
openrr_apps_robot_command \
    --config-path ./openrr-apps/config/sample_robot_client_config_for_urdf_viz.toml \
    get_state l_arm
```

The output will be as follows.

```bash
Joint names : ["l_shoulder_yaw", "l_shoulder_pitch", "l_shoulder_roll", "l_elbow_pitch", "l_wrist_yaw", "l_wrist_pitch"]
Joint positions : [0.0, 0.0, 0.0, 0.0, 0.0, 0.0]
```

Let's send the command value of the joint angle.

```bash
openrr_apps_robot_command \
    --config-path ./openrr-apps/config/sample_robot_client_config_for_urdf_viz.toml \
    send_joints l_arm -j 0=1.2 -j 1=-1.2 -j 2=0.0 -j 3=1.2 -j 4=0.0 -j 5=0.0
```

The robot arm moved.

## Robot client config file

This is sample config file for single robot arm. Whether on a simulation or a real robot, operations from OpenRR can be realized by specifying the config file corresponding to the robot as shown below.

However, the `urdf-viz` item, like `[urdf_viz_clients_configs]`, must be changed to ROS or similar.

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

[openrr_clients_config.ik_solvers_configs.l_arm_ik_solver]
ik_target = "tool_fixed"
```

## Note

See also [reference of `openrr_apps_robot_command`](../../reference/apps/robot_command.md)
