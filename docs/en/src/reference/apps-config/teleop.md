# Teleop config

## Write config

The previous page covered Client configurations. This page contains additional configurations for Teleop.

Items marked "required" are mandatory.

## Default config

The default is as follows. Settings are added or overwritten depending on the loaded config. Since it is implemented in a HashMap, it will overwrite any already set and append for new settings.

```toml
initial_mode = ""
gamepad = "gilrs"

[control_nodes_config]

[gil_gamepad_config]
device_id = 0

[gil_gamepad_config.map]
button_map = [
    ["DPadLeft",      "DPadLeft"     ],
    ["Select",        "Select"       ],
    ["East",          "East"         ],
    ["DPadUp",        "DPadUp"       ],
    ["LeftTrigger",   "LeftTrigger"  ],
    ["DPadDown",      "DPadDown"     ],
    ["RightTrigger",  "RightTrigger" ],
    ["RightTrigger2", "RightTrigger2"],
    ["Start",         "Start"        ],
    ["LeftTrigger2",  "LeftTrigger2" ],
    ["Mode",          "Mode"         ],
    ["DPadRight",     "DPadRight"    ],
    ["South",         "South"        ],
    ["North",         "North"        ],
    ["RightThumb",    "RightThumb"   ],
    ["LeftThumb",     "LeftThumb"    ],
    ["West",          "West"         ]
]
axis_map = [
    ["LeftStickY",  "LeftStickY" ],
    ["LeftStickX",  "LeftStickX" ],
    ["RightStickX", "RightStickX"],
    ["DPadY",       "DPadY"      ],
    ["DPadX",       "DPadX"      ],
    ["RightStickY", "RightStickY"]
]
axis_value_map = [["LeftStickX", -1.0], ["RightStickX", -1.0]]

[plugins]
```

## robot_teleop_config

| Properties             | type                                                   |
| ---------------------- | ------------------------------------------------------ |
| control_nodes_config   | [ControlNodesConfig](#control_nodes_config) (required) |
| gamepad                | GamepadKind(string) (default "gilrs")                  |
| gil_gamepad_config     | [GilGamepadConfig](#gil_gamepad_config)                |
| initial_mode           | string                                                 |
| plugins                | [TeleopPluginConfig](#teleop-plugin-config)            |
| robot_config_full_path | string                                                 |
| robot_config_path      | string                                                 |

## `control_nodes_config`

### Control Nodes Config

| Control Nodes Config      |                                                                |
| ------------------------- | -------------------------------------------------------------- |
| ik_node_teleop_configs    | array [IkNodeTeleopConfig](#ik-node-teleop-config) (required)  |
| joints_pose_sender_config | [JointsPoseSenderConfig](#joint-pose-sender-config) (required) |
| joy_joint_teleop_configs  | array [JoyJointTeleopConfig](#joy-joint-teleop-config)         |
| move_base_mode            | string                                                         |
| command_configs           | [RobotCommandConfig](#robot-command-config)                    |

### IK Node Teleop Config

| IK Node Teleop Config        |                                            |
| ---------------------------- | ------------------------------------------ |
| config                       | [IkNodeConfig](#ik-node-config) (required) |
| joint_trajectory_client_name | string (required)                          |
| solver_name                  | string (required)                          |

### Joint Pose Sender Config

| Joint Pose Sender Config |                          |
| ------------------------ | ------------------------ |
| duration_secs            | double (default 2.0)     |
| mode                     | string  (default "pose") |

### Joy Joint Teleop Config

| Joy Joint Teleop Config |                                                           |
| ----------------------- | --------------------------------------------------------- |
| client_name             | string                                                    |
| config                  | [JoyJointTeleopNodeConfig](#joy-joint-teleop-node-config) |

### IK Node Config

| IK Node Config     |                                           |
| ------------------ | ----------------------------------------- |
| mode               | string (required)                         |
| move_step_angular  | array double (default [0.05, 0.05, 0.17]) |
| move_step_linear   | array double (default [0.01, 0.01, 0.01]) |
| step_duration_secs | double (default 0.1)                      |

### Joy Joint Teleop Node Config

| Joy Joint Teleop Node Config |                       |
| ---------------------------- | --------------------- |
| joint_step                   | double (default 0.02) |
| mode                         | string (required)     |
| step_duration_secs           | double (default 0.1)  |

### Robot Command Config

| Robot Command Config |                   |
| -------------------- | ----------------- |
| file_path            | string (required) |
| name                 | string (required) |

#### Example

```toml
[[control_nodes_config.command_configs]]
name = "audio bar"
file_path = "sample_audio_command.txt"

[[control_nodes_config.command_configs]]
name = "ros speak"
file_path = "sample_speak_command.txt"
```

```txt
openrr_apps_robot_command speak foo bar
```

```txt
openrr_apps_robot_command speak espeak "This is topic message"
```

```bash
PrintSpeaker: command audio sine
PrintSpeaker: command ros speak
```

## `gamepad`

string or BuiltinGamepad ("gilrs" or "keyboard"). Default is "gilrs".

## `gil_gamepad_config`

### Gil Gamepad Config

| Gil Gamepad Config |                  |
| ------------------ | ---------------- |
| device_id          | uint (default 0) |
| map                | [Map](#map)      |

### Map

| Map            |                                                                               |
| -------------- | ----------------------------------------------------------------------------- |
| axis_map       | array [GilrsAxis Axis](#comparison-table-between-gilrsaxis-and-axis)         |
| axis_value_map | array Axis double                                                             |
| button_map     | array [GilrsButton Button](#comparison-table-between-gilrsbutton-and-button) |

A comparison table with `Gilrs` looks like this. For reference only, as it depends on the Joystick used. If you want to assign this particular button or stick, you can change the key by following the example and mapping it to the teleop_config file.

Button and stick names follow [gilrs layout](https://docs.rs/gilrs/latest/gilrs/#controller-layout).

### Comparison table between `GilrsAxis` and `Axis`

| GilrsAxis     | Axis           |           |
| ------------- | -------------- | --------- |
| "LeftStickX"  | "LeftStickX"   | (default) |
| "LeftStickY"  | "LeftStickY"   | (default) |
| "LeftZ"       | "LeftTrigger"  |           |
| "RightStickX" | "RightStickX"  | (default) |
| "RightStickY" | "RightStickY"  | (default) |
| "RightZ"      | "RightTrigger" |           |
| "DPadX"       | "DPadX"        | (default) |
| "DPadY"       | "DPadY"        | (default) |
| "Unknown"     | "Unknown"      |           |

### Comparison table between `GilrsButton` and `Button`

| GilrsButton     | Button          |           |
| --------------- | --------------- | --------- |
| "South"         | "South"         | (default) |
| "East"          | "East"          | (default) |
| "North"         | "North"         | (default) |
| "West"          | "West"          | (default) |
| "C"             |                 |           |
| "Z"             |                 |           |
| "LeftTrigger"   | "LeftTrigger"   | (default) |
| "LeftTrigger2"  | "LeftTrigger2"  | (default) |
| "RightTrigger"  | "RightTrigger"  | (default) |
| "RightTrigger2" | "RightTrigger2" | (default) |
| "Select"        | "Select"        | (default) |
| "Start"         | "Start"         | (default) |
| "Mode"          | "Mode"          | (default) |
| "LeftThumb"     | "LeftThumb"     | (default) |
| "RightThumb"    | "RightThumb"    | (default) |
| "DPadUp"        | "DPadUp"        | (default) |
| "DPadDown"      | "DPadDown"      | (default) |
| "DPadLeft"      | "DPadLeft"      | (default) |
| "DPadRight"     | "DPadRight"     | (default) |
| "Unknown"       | "Unknown"       |           |

### Example

```toml
[gil_gamepad_config.map]
axis_map = [
    # GilrsAxis      Axis (user axis)
    ['LeftStickX',  'LeftStickX'   ],
    ['LeftStickY',  'LeftStickY'   ],
    ['LeftZ',       'LeftTrigger'  ],
    ['RightStickX', 'RightStickX'  ],
    ['RightStickY', 'RightStickY'  ],
    ['RightZ',      'RightTrigger' ],
    ['DPadX',       'DPadX'        ],
    ['DPadY',       'DPadY'        ],
]
axis_value_map = [
    # Axis (user axis)  value
    ['LeftStickX',      -1.0 ],
    ['RightStickX',     -1.0 ],
    ['LeftStickY',      -1.0 ],
    ['RightStickY',     -1.0 ],
]
button_map = [
    # GilrsButton     Button(user button)
    ['East',          'South'         ],
    ['C',             'East'          ],
    ['North',         'North'         ],
    ['South',         'West'          ],
    ['West',          'LeftTrigger'   ],
    ['LeftTrigger',   'LeftTrigger2'  ],
    ['Z',             'RightTrigger'  ],
    ['RightTrigger',  'RightTrigger2' ],
    ['LeftTrigger2',  'Select'        ],
    ['RightTrigger2', 'Start'         ],
    ['Mode',          'Mode'          ],
    ['Select',        'LeftThumb'     ],
    ['Start',         'RightThumb'    ],
    ['DPadUp',        'DPadUp'        ],
    ['DPadDown',      'DPadDown'      ],
    ['DPadLeft',      'DPadLeft'      ],
    ['DPadRight',     'DPadRight'     ],
]
```

## `initial_mode`

The `initial_mode` allows you to specify the initial mode.

### Example
```bash
initial_mode = "base"
```

## `plugins`

### Teleop Plugin Config

| Teleop Plugin Config |                   | Description                                                                                                                                                               |
| -------------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| args                 | string            | Arguments passed when creating this instance.                                                                                                                             |
| args_from_path       | string            | Pass the contents of the specified file as an argument.                                                                                                                   |
| path                 | string (required) | Path to the plugin. If no extension is specified, the default extension for `cdylib` on the current OS will be selected. (linux: `.so`, macos: `.dylib`, windows: `.dll`) |

## `robot_config_path`

The `robot_config_path` specifies the relative path to the config file.

### Example

```bash
robot_config_path = "sample_robot_client_config_for_urdf_viz.toml"
```

