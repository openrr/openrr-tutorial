# openrr_apps_robot_teleop

`openrr_apps_robot_teleop`では今まではGUIアプリケーション上で操作していたものをジョイスティックなどで遠隔で操作できるようになっています。

```bash
openrr_apps_robot_teleop
```

## 使い方

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

## 例

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

## 例(--teleop-config)

```bash
openrr_apps_robot_teleop \
    --config-path ./openrr-apps/config/sample_teleop_config_urdf_viz.toml \
    --teleop-config gamepad=\"keyboard\"
```

これは、[`openrr_apps_robot_command` Example (--config)](../apps/robot_command.md#example---config)の例(--config)と同じようにして、既存の設定を上書きするというものです。

この例ではデフォルトであったゲームパッドでの操作をキーボードからの操作に切り替えています。
