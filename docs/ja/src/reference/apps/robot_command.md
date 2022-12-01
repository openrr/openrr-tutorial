# openrr_apps_robot_command

`openrr_apps_robot_command`ではロボットにいくつかの司令を送ることができます。

```bash
openrr_apps_robot_command [OPTIONS] [SUBCOMMAND]
```

| Options                         | Description                                        |
| ------------------------------- | -------------------------------------------------- |
| -c, --config-path <CONFIG_PATH> | 設定ファイルへのパス                               |
| --config \<CONFIG>               | デフォルトまたは設定ファイルで指定した設定の上書き |
| -h, --help                      | ヘルプの出力                                       |
| -i, --interactive               | 対話モードの使用                                   |
| --log-directory <LOG_DIRECTORY> | FileAppenderでログを出力するパスの指定             |
| --show-default-config           | デフォルトの設定ファイルの出力                     |

| Subcommands                 | Description                                                                      |
| --------------------------- | -------------------------------------------------------------------------------- |
| cancel_navigation_goal      | ナビゲーションゴールのキャンセル                                                 |
| execute_command             | 外部コマンドの実行                                                               |
| get_navigation_current_pose | 現在位置の出力                                                                   |
| get_state                   | ジョイントの姿勢と該当する手先位置の取得                                         |
| help                        | ヘルプの出力                                                                     |
| list                        | 使用可能なクライアントの一覧を出力                                               |
| load_commands               | ファイルからコマンドを読み込み実行                                               |
| move_ik                     | IKをもとに動く [move_Ik](#move_ikの使い方)                                       |
| send_base_velocity          | ベースの速度を送信 [send_base_velocity](#send_base_velocityの使い方)             |
| send_joints                 | ジョイントの姿勢を送信 [send_joints](#send_jointsの使い方)                       |
| send_joints_pose            | あらかじめ設定された姿勢の送信 [send_joints_pose](#send_joints_poseの使い方)     |
| send_navigation_goal        | ナビゲーションゴールの送信 [send_navigation_goal](#send_navigation_goalの使い方) |
| shell_completion            | シェル補完ファイルの出力 [shell_completion](#shell_completionの使い方)           |
| speak                       | テキストの発話                                                                   |

## 例

シミュレータ上でロボットを起動します。

```bash
urdf-viz ./openrr-planner/sample.urdf &
```

![urdf_viz](image/urdf-viz.png)

そのあとコマンドを読み込みます。

```bash
openrr_apps_robot_command \
    --config-path ./openrr-apps/config/sample_robot_client_config_for_urdf_viz.toml \
    load_commands ./openrr-apps/command/sample_cmd_urdf_viz.txt
```

## 例 (--config)

1つ前の例に`--config`引数を追加してみます。`urdf-viz`上で実行するのを見てもいいのですが、簡単のために`load_commands`を`list`に変更しています。

```bash
urdf-viz ./openrr-planner/sample.urdf &
openrr_apps_robot_command \
    --config-path ./openrr-apps/config/sample_robot_client_config_for_urdf_viz.toml \
    list
```

まず何もせずに実行すれば、先程の前半部分のような出力が得られます。

```bash
Raw joint trajectory clients
    r_arm
    l_arm
Joint trajectory clients
    r_arm
    r_arm_ik
    l_arm_collision_checked
    l_arm_ik
    r_arm_collision_checked
    l_arm
Collision check clients
    l_arm_collision_checked
    r_arm_collision_checked
Ik clients
    r_arm_ik
    l_arm_ik
```

`--config`引数では、`--config-path`の内容を上書きすることができます。したがって、

```bash
urdf-viz ./openrr-planner/sample.urdf &
openrr_apps_robot_command \
    --config-path ./openrr-apps/config/sample_robot_client_config_for_urdf_viz.toml \
    --config openrr_clients_config.ik_clients_configs[0].name=\"user_defined_ik\" \
    list
```

とすると、

```bash
Raw joint trajectory clients
    l_arm
    r_arm
Joint trajectory clients
    l_arm
    r_arm_collision_checked
    l_arm_collision_checked
    r_arm
    r_arm_ik
    user_defined_ik
Collision check clients
    r_arm_collision_checked
    l_arm_collision_checked
Ik clients
    r_arm_ik
    user_defined_ik
```

というようにして左アーム用のIKクライアント名が`user_defined_ik`に変更されました。もちろんこれは直接tomlファイルを書き換えることでも実現できます。

`load_commands`のまま実行する場合は、`openrr-apps/command/sample_cmd_urdf_viz.txt`内の`l_arm_ik`を`user_defined_ik`に変える必要があります。

## move_ikの使い方

```bash
openrr_apps_robot_command move_ik [OPTIONS] <NAME>
```

### Name

IKクライアント名

### Option

| Options                                                                           | Description                                  |
| --------------------------------------------------------------------------------- | -------------------------------------------- |
| -d, --duration <DURATION>                                                         | 到達までかける時間                           |
| -h, --help                                                                        | ヘルプの出力                                 |
| -i, --interpolate                                                                 | デカルト座標系　補間　IKクライアント名を指定 |
| -l, --local                                                                       |                                              |
| --max_resolution_for_interpolation <MAX_RESOLUTION_FOR_INTERPOLATION>             | 最大の補間分解能 (default 0.5)               |
| --min_number_of_points_for_interpolation <MIN_NUMBER_OF_POINTS_FOR_INTERPOLATION> | 最小の補間点数 (default 10)                  |
| -r, --roll <ROLL>                                                                 | 目標のロール角                               |
| -p, --pitch <PITCH>                                                               | 目標のピッチ角                               |
| --yaw <YAW>                                                                       | 目標のヨー角                                 |
| -x, --x <X>                                                                       | 目標のx座標                                  |
| -y, --y <Y>                                                                       | 目標のy座標                                  |
| -z, --z <Z>                                                                       | 目標のz座標                                  |

## send_base_velocityの使い方

```bash
openrr_apps_robot_command send_base_velocity [OPTIONS] <X> <Y> <THETA>
```

### X

x方向の速度

### Y

y方向の速度

### Theta

角速度

| Options                             | Description  |
| ----------------------------------- | ------------ |
| -d, --duration_secs <DURATION_SECS> | 継続する時間 |
| -h, --help                          | ヘルプの出力 |

## send_jointsの使い方

```bash
openrr_apps_robot_command send_joints [OPTIONS] <NAME>
```

### Name

クライアント名

### Option

| Options                                                                           | Description                     |
| --------------------------------------------------------------------------------- | ------------------------------- |
| -d, --duration <DURATION>                                                         | 到達までかける時間              |
| -h, --help                                                                        | ヘルプの出力                    |
| -i, --interpolate                                                                 | 目標を直交座標系での補間する    |
| -j, --joint <JOINT>                                                               | ジョイント番号                  |
| --max_resolution_for_interpolation <MAX_RESOLUTION_FOR_INTERPOLATION>             | 最大の補間分解能 (default 0.05) |
| --min_number_of_points_for_interpolation <MIN_NUMBER_OF_POINTS_FOR_INTERPOLATION> | 最小の補間点数 (default 10)     |

## send_joints_poseの使い方

```bash
openrr_apps_robot_command send_joints_pose [OPTIONS] <NAME> <POSE_NAME>
```

### Name

クライアント名

### Pose name

ポーズ名

### Option

| Options                   | Description        |
| ------------------------- | ------------------ |
| -d, --duration <DURATION> | 到達までかける時間 |
| -h, --help                | ヘルプの出力       |

## send_navigation_goalの使い方

```bash
openrr_apps_robot_command send_navigation_goal [OPTIONS] <X> <Y> <YAW>
```

### Option

| Options                           | Description            |
| --------------------------------- | ---------------------- |
| -f, --frame_id <FRAME_ID>         |                        |
| -h, --help                        | ヘルプの出力           |
| -t, --timeout_secs <TIMEOUT_SECS> | タイムアウトまでの秒数 |

## shell_completionの使い方

```bash
openrr_apps_robot_command shell_completion <SUBCOMMAND>
```

### Subcommand

| Subcommand  | Description  |
| ----------- | ------------ |
| bash        |              |
| fish        |              |
| help        | ヘルプの出力 |
| power_shell |              |
| zsh         |              |
