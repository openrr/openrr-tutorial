# 02-jp OpenRR Appsを使う

openrr-appsでは基本的なロボットの操作ができます。Rustで実装されたフレームワークであるOpenRRを用いたアプリケーションのひとつです。

## 準備

### urdf-vizのインストール

[`urdf-viz`](https://github.com/openrr/urdf-viz.git)はURDFの可視化アプリです。

```bash
cargo install urdf-viz
```

### openrr-appsのインストール

`openrr-apps`ではGUIやゲームパッドを用いた操作などを実装したアプリケーションです。コマンドやROSへのトピックの送信ができます。`urdf-viz`や`gazebo`で可視化されたロボット、実機についても同様に操作できます。

Linux, MacOSの方はこちら。

```bash
cargo install --path openrr-apps
```

Windowsユーザーの方はこちら。

```bash
cargo install --path openrr-apps --no-default-features --features gui,assimp
```

## robot command "`openrr_apps_robot_command`"

`openrr_apps_robot_command`ではロボットにいくつかの司令を送ることができます。

### 使い方

```bash
openrr_apps_robot_command [OPTIONS] [SUBCOMMAND]
```

| Options                         | Description                                        |
| ------------------------------- | -------------------------------------------------- |
| -c, --config-path <CONFIG_PATH> | 設定ファイルへのパス                               |
| --config <CONFIG>               | デフォルトまたは設定ファイルで指定した設定の上書き |
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

### 例

シミュレータ上でロボットを起動します。

```bash
urdf-viz ./openrr-planner/sample.urdf &
```

![](../image/urdf-viz.png)

そのあとコマンドを読み込みます。

```bash
openrr_apps_robot_command \
    --config-path ./openrr-apps/config/sample_robot_client_config_for_urdf_viz.toml \
    load_commands ./openrr-apps/command/sample_cmd_urdf_viz.txt
```

### 例 (--config)

1つ前の例に`--config`引数を追加してみます。`urdf-viz`上で実行するのを見てもいいのですが、簡単のために`load_commands`を`list`に変更しています。

```bash
urdf-viz ./openrr-planner/sample.urdf &
openrr_apps_robot_command \
    --config-path ./openrr-apps/config/sample_robot_client_config_for_urdf_viz.toml \
    list
```

まず何もせずに実行すれば、先程の前半部分のような出力が得られます。

```toml
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

```toml
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

### move_ikの使い方

```bash
openrr_apps_robot_command move_ik [OPTIONS] <NAME>
```

#### Name

IKクライアント名

#### Option

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

### send_base_velocityの使い方

```bash
openrr_apps_robot_command send_base_velocity [OPTIONS] <X> <Y> <THETA>
```

#### X

x方向の速度

#### Y

y方向の速度

#### Theta

角速度

| Options                             | Description  |
| ----------------------------------- | ------------ |
| -d, --duration_secs <DURATION_SECS> | 継続する時間 |
| -h, --help                          | ヘルプの出力 |

### send_jointsの使い方

```bash
openrr_apps_robot_command send_joints [OPTIONS] <NAME>
```

#### Name

クライアント名

#### Option

| Options                                                                           | Description                     |
| --------------------------------------------------------------------------------- | ------------------------------- |
| -d, --duration <DURATION>                                                         | 到達までかける時間              |
| -h, --help                                                                        | ヘルプの出力                    |
| -i, --interpolate                                                                 | 目標を直交座標系での補間する    |
| -j, --joint <JOINT>                                                               | ジョイント番号                  |
| --max_resolution_for_interpolation <MAX_RESOLUTION_FOR_INTERPOLATION>             | 最大の補間分解能 (default 0.05) |
| --min_number_of_points_for_interpolation <MIN_NUMBER_OF_POINTS_FOR_INTERPOLATION> | 最小の補間点数 (default 10)     |

### send_joints_poseの使い方

```bash
openrr_apps_robot_command send_joints_pose [OPTIONS] <NAME> <POSE_NAME>
```

#### Name

クライアント名

#### Pose name

ポーズ名

#### Option

| Options                   | Description        |
| ------------------------- | ------------------ |
| -d, --duration <DURATION> | 到達までかける時間 |
| -h, --help                | ヘルプの出力       |

### send_navigation_goalの使い方

```bash
openrr_apps_robot_command send_navigation_goal [OPTIONS] <X> <Y> <YAW>
```

#### Option

| Options                           | Description            |
| --------------------------------- | ---------------------- |
| -f, --frame_id <FRAME_ID>         |                        |
| -h, --help                        | ヘルプの出力           |
| -t, --timeout_secs <TIMEOUT_SECS> | タイムアウトまでの秒数 |

### shell_completionの使い方

```bash
openrr_apps_robot_command shell_completion <SUBCOMMAND>
```

#### Subcommand

| Subcommand  | Description  |
| ----------- | ------------ |
| bash        |              |
| fish        |              |
| help        | ヘルプの出力 |
| power_shell |              |
| zsh         |              |

## velocity sender "`openrr_apps_velocity_sender`"

`openrr_apps_velocity_sender`では移動ロボットを動かすための速度を指定することができます。

```bash
openrr_apps_velocity_sender
```

![](../image/velocity_sender.png)

### 使い方

```bash
openrr_apps_velocity_sender [OPTIONS]
```

| Options                         | Description                                        |
| ------------------------------- | -------------------------------------------------- |
| -c, --config-path <CONFIG_PATH> | 設定ファイルへのパス                               |
| --config <CONFIG>               | デフォルトまたは設定ファイルで指定した設定の上書き |
| -h, --help                      | ヘルプの出力                                       |

## joint position sender "`openrr_apps_joint_position_sender`"

`openrr_apps_joint_position_sender`ではマニピュレータなど関節ロボットについての各関節の値を指定することができます。

```bash
openrr_apps_joint_position_sender
```

![](../image/joint_pose_sender.png)

### 使い方

```bash
openrr_apps_joint_position_sender [OPTIONS]
```

| Options                         | Description                                        |
| ------------------------------- | -------------------------------------------------- |
| -c, --config-path <CONFIG_PATH> | 設定ファイルへのパス                               |
| --config <CONFIG>               | デフォルトまたは設定ファイルで指定した設定の上書き |
| -h, --help                      | ヘルプの出力                                       |

## robot teleop "`openrr_apps_robot_teleop`"

`openrr_apps_robot_teleop`では今まではGUIアプリケーション上で操作していたものをジョイスティックなどで遠隔で操作できるようになっています。

```bash
openrr_apps_robot_teleop
```

### 使い方

```bash
openrr_apps_robot_teleop [OPTIONS]
```

| Options                         | Description                                                             |
| ------------------------------- | ----------------------------------------------------------------------- |
| -c, --config-path <CONFIG_PATH> | 設定ファイルへのパス                                                    |
| -h, --help                      | ヘルプの出力                                                            |
| --log-directory <LOG_DIRECTORY> | FileAppenderでログを出力するパスの指定                                  |
| --robot-config <ROBOT_CONFIG>   | デフォルトまたは設定ファイルで指定した設定の上書き (robot config file)  |
| --show-default-config           | デフォルトの設定ファイルの出力                                          |
| --teleop-config <TELEOP_CONFIG> | デフォルトまたは設定ファイルで指定した設定の上書き (teleop config file) |

### 例

ボタンの名前は、[gilrs layout](https://docs.rs/gilrs/latest/gilrs/#controller-layout)に従っています。

`urdf-viz`を起動します。その後、ゲームパッドをPCに接続し、Teleop用の設定ファイルを読み込み実行します。

```bash
urdf-viz ./openrr-planner/sample.urdf &
openrr_apps_robot_teleop \
    --config-path ./openrr-apps/config/sample_teleop_config_urdf_viz.toml
```

割り当てたモード選択ボタン（デフォルトでは`North`）を押すとモードが切り替わり、サブモード選択ボタン（デフォルトでは`East`）ではサブモードが切り替わります。

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


### 例(--teleop-config)

```bash
openrr_apps_robot_teleop \
    --config-path ./openrr-apps/config/sample_teleop_config_urdf_viz.toml \
    --teleop-config gamepad=\"keyboard\"
```

これは、[robot command "`openrr_apps_robot_command`"](#robot-command-openrr_apps_robot_command)の例(--config)と同じようにして、既存の設定を上書きするというものです。

この例ではデフォルトであったゲームパッドでの操作をキーボードからの操作に切り替えています。

## config "`openrr_apps_config`"

`openrr_apps_config`はあまり使う機会がないかもしれません。tomlファイルを作成する際のschemaや`--config-path`で指定した設定ファイルを`--config`で上書きした結果を出力します。

```bash
openrr_apps_config
```

### 使い方

```bash
openrr_apps_config [SUBCOMMAND]
```

| Options    | Description  |
| ---------- | ------------ |
| -h, --help | ヘルプの出力 |

| Subcommands | Description                       |
| ----------- | --------------------------------- |
| help        | ヘルプの出力                      |
| merge       | 設定ファイルに併合する            |
| schema      | 設定ファイル用のJSON schemaの生成 |

### 例

```bash
openrr_apps_config schema robot-config >openrr-apps/schema/robot_config.json
openrr_apps_config schema robot-teleop-config >openrr-apps/schema/robot_teleop_config.json
```

これは、`./tools/update-schema.sh`にて使用されています。

### 例

```bash
openrr_apps_config merge \
    --config-path ./openrr-apps/config/sample_teleop_config_urdf_viz.toml \
    --config robot_config_path=\"sample_robot_client_config_for_urdf_viz_with_multiple_speaker.toml\" \
    >openrr-apps/config/example_config_merge.toml
```

これにより`sample_teleop_config_urdf_viz.toml`では`sample_robot_client_config_for_urdf_viz.toml`を指定してましたが、`sample_robot_client_config_for_urdf_viz_with_multiple_speaker.toml`に置き換わったものが`openrr-apps/config/example_config_merge.toml`出力されます。
