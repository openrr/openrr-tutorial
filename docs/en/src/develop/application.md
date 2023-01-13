# Implement application using `OpenRR`

## `arci`

| name                  |
| --------------------- |
| arci-gamepad-gilrs    |
| arci-gamepad-keyboard |
| arci-ros              |
| arci-ros2             |
| arci-speak-audio      |
| arci-speak-cmd        |
| arci-urdf-viz         |

## Using `arci` traits in own structure

### Example

```rust
use std::{collections::HashMap, path::PathBuf, sync::Arc};

use arci::{Gamepad, Localization, MoveBase, Navigation, Speaker};
use openrr_client::{OpenrrClientsConfig, RobotClient};
use openrr_teleop::{ControlNodeSwitcher, ControlNodesConfig};

pub struct TeleopManager {
    switcher: Arc<ControlNodeSwitcher<Arc<dyn Speaker>>>,
    gamepad: Arc<dyn Gamepad>,
}

impl TeleopManager {
    pub fn new(
        move_base: Arc<dyn MoveBase>,
        speaker: Arc<dyn Speaker>,
        gamepad: Arc<dyn Gamepad>,
    ) -> Self {
        let control_nodes_config = ControlNodesConfig {
            move_base_mode: Some("base".to_string()),
            joy_joint_teleop_configs: Vec::new(),
            ik_node_teleop_configs: Vec::new(),
            joints_pose_sender_config: None,
            command_configs: Vec::new(),
        };

        let raw_joint_trajectory_clients = HashMap::new();
        let mut speakers = HashMap::new();
        speakers.insert(String::from("print"), speaker.clone());
        let localization = None::<Arc<dyn Localization>>;
        let navigation = None::<Arc<dyn Navigation>>;

        let robot_client = Arc::new(
            RobotClient::new(
                OpenrrClientsConfig::default(),
                raw_joint_trajectory_clients,
                speakers,
                localization,
                Some(move_base.clone()),
                navigation,
            )
            .unwrap(),
        );

        let joint_trajectory_client_map = HashMap::new();
        let ik_solver_with_chain_map = HashMap::new();
        let joints_poses = Vec::new();

        let nodes = control_nodes_config
            .create_control_nodes(
                None::<PathBuf>,
                robot_client,
                speaker.clone(),
                &joint_trajectory_client_map,
                &ik_solver_with_chain_map,
                Some(move_base),
                joints_poses,
            )
            .unwrap();

        let switcher = Arc::new(ControlNodeSwitcher::new(nodes, speaker, 0));

        Self { switcher, gamepad }
    }

    pub async fn update(&self) {
        self.switcher.main(self.gamepad.clone()).await;
    }

    pub async fn speak(&self) {
        self.switcher.speak_current_mode().await.unwrap();
    }
}
```

These samples can be found at [here](https://github.com/openrr/openrr-mobile).
