# Bridgify
SMU .HEAP 2023 G14

## Get Started (Recommend to use Docker if want to run locally)
### Local
#### need to install python@3.10 and below in order to run npm install without error (Require to run backend)
    - install pyenv => brew install pyenv
    
##### setup shell environment for pyenv (https://github.com/pyenv/pyenv#set-up-your-shell-environment-for-pyenv) (Require to run backend)
    - in your terminal run : (for mac)
    echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.bashrc
    echo 'command -v pyenv >/dev/null || export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.bashrc
    echo 'eval "$(pyenv init -)"' >> ~/.bashrc

##### pyenv commands
    -pyenv versions
    -pyenv global 2.7.18 => change your python version

#### For npm install canvas (Require to run backend)
  - Mac OS : brew install pkg-config cairo pango libpng jpeg giflib librsvg pixman
  - Windows : https://github.com/Automattic/node-canvas/wiki/Installation:-Windows
    
### After you setup the neccessary package (Since our code is using production backend URL, you dont need to run backend locally, just need run frontend locally)
- Please make sure you have install Node js (V18)
- cd Bridgify => npm install
- cd Bridgify/backend => npm install
- cd Bridgify/frontend => npm install
- cd Bridgify => npm start => to run both frontend && backend

### Docker
- `docker compose up` => to build the image and run
    - Notes: if have Segmentation fault => use Docker Desktop to start the container
![image](https://github.com/xXxPMWxXx/Bridgify/assets/53245147/fcb8443b-ca8a-4fc8-96d4-fba34bbef8a1)
![image](https://github.com/xXxPMWxXx/Bridgify/assets/53245147/4fb9faa9-81b6-4fd2-98b3-60d3579298c7)
![image](https://github.com/xXxPMWxXx/Bridgify/assets/53245147/e7ebe4a7-ed37-47b3-acc6-526ac76172dc)

#### AWS EC2
- `ssh -i ".ssh/id_rsa" ubuntu@13.228.86.148` => connect to EC2 via ssh
    - .ssh/id_rsa = the location of your id_rsa file
- `rm -rf node_modules/` => remove folder in ubuntu
##### Endpoint
- http://13.228.86.148:3000 => fronend
- http://13.228.86.148:8000 => backend
- http://13.228.86.148:8000/doc => backend swagger

##### Debugging
- `npm rebuild @tensorflow/tfjs-node --build-from-source` => for backend, as tfjs-node need this cmd to work

###### Managing a signle session
- `tmux` => to start a session
- `tmux attach` => to reconnect to the session, after login to new ssh

###### Managing a multiple session
- `tmux new-session -s session_name` => Start(and connect to) a new named session
- `tmux list-sessions` => List all active sessions
- `tmux attach-session -t session_name` => Connect to a named session
- `tmux kill-session -t session_name` => Kill/stop a session (enter `exit` command while connected to the session also will kill the session)

###### Setting up Flutter framework on vscode
- Install accordingly for mac and windows and extract to desired location (https://docs.flutter.dev/get-started/install)
- Please note to have VSCode already installed
- # Windows:
- Navigate to "flutter\bin" and copy its path
- Edit environment variables for your account to include the copied path in "Path" entry
![image](https://github.com/xXxPMWxXx/Bridgify/assets/64420980/4042307f-77b8-4146-bdde-210c709fe794)
- fun 'flutter --version' from the console window
![image](https://github.com/xXxPMWxXx/Bridgify/assets/64420980/b9fa9be1-c7ab-42e7-aa36-b52b361cbef7)
- run 'flutter doctor' from the console window
![image](https://github.com/xXxPMWxXx/Bridgify/assets/64420980/7216333f-0714-48a7-93a2-4af8a6cefab8)
- Install the latest version of Android Studio (https://developer.android.com/studio)
- Start Android Studio, and go through with the default configurations to the home page.
- Click on 'More Actions' icon => SDK Manager
![image](https://github.com/xXxPMWxXx/Bridgify/assets/64420980/4b391c2e-610c-4e26-a2f8-7c4629e41e0e)
- Navigate to 'SDK Tools' => install 'Android SDK Command-Line Tools (latest)'
- Once installed, run 'flutter doctor' from the console window to check the status of Android Studio
![image](https://github.com/xXxPMWxXx/Bridgify/assets/64420980/2c77692a-325d-4bb9-b611-a8aa0c66b076)
- Run 'flutter doctor --android licenses' and accept all license agreements
- Once completed, run 'flutter doctor' to check the status of Android toolchain
![image](https://github.com/xXxPMWxXx/Bridgify/assets/64420980/dce6f04b-945e-46c4-97c3-edfe5771a87c)
- Now to open a flutter project, open VSCode and download the extensions 'Flutter' and 'Awesome Flutter Snippets'
![image](https://github.com/xXxPMWxXx/Bridgify/assets/64420980/7c0385cd-0c66-4dcf-93b4-6a2606b5f297)
![image](https://github.com/xXxPMWxXx/Bridgify/assets/64420980/9c4a4669-a0a5-49bb-a260-c74d28ff923c)
- Navigate to the desired project directory => run 'flutter create <Project_Name>' in the command line
- This creates a flutter project within the directory
- Open Android Studio => Click on 'More Actions' icon => Android Device Manager => Create Device (Phone)
![image](https://github.com/xXxPMWxXx/Bridgify/assets/64420980/2840293d-c016-449f-9a6b-29fd9f3d4a80)
- Click on 'Pixel 4a' + 'Next' => Click on 'Tiramisu' + 'Next' => Give an appropriate name and click 'Finish' to install
- Return to VSCode, and navigate to the 'lib' folder within you project => click on main.dart
- Click on the 'Chrome(web-javascript)' on the bottom right of the screen
![image](https://github.com/xXxPMWxXx/Bridgify/assets/64420980/f4c564e8-4f9c-446e-be2e-5a050a0f8ed4)
- This show a pop up on the top of the screen where you can choose the android emulator that you just created
![image](https://github.com/xXxPMWxXx/Bridgify/assets/64420980/05ff89ba-866c-49f5-be8e-4a974db87db8)
- To run and debug your project, go to the main.dart file => with the android emulator open, click on "Start Debugging" 
![image](https://github.com/xXxPMWxXx/Bridgify/assets/64420980/dc5529a8-c71c-481b-bf07-3bf2a0a961e4)


- Mac:


## Contributors
- [Petrina Wong Jing Ting](https://github.com/petrinawjt)
- [Pan Mingwei](https://github.com/xXxPMWxXx)
- [Lim ZhengLong Brian](https://github.com/Liseon617)
- [Georgia Ng](https://github.com/Georgiaxng)
- [Naufal Syaqil Bin Azmi](https://github.com/nafutofu)

