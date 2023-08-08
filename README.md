# Bridgify
- SMU .HEAP 2023 G14, Please refer to our [main repo](https://github.com/xXxPMWxXx/Bridgify)
- You can access our others documentation via your SMU Google Account [here](https://drive.google.com/drive/folders/1PzMxQXV3oaVrTCWjZk5e-R0c1zfKt1NW?usp=drive_link)
- Recommendation on setting up our project:
    - Use Docker for our Website Application (Refer below for more details)
    - Use [APK](https://bridgify.s3.ap-southeast-1.amazonaws.com/mobile/Bridgify.apk) for our Mobile Applicaiton (Refer below for more details)
      
## [Our website](http://bridgify-8a0acea7cc5f9d2d.elb.ap-southeast-1.amazonaws.com/)
### Normal Account
    - email: `mw@gmail.com`
    - password: `password`
### Admin Account
    - email: `admin@admin.com`
    - password: `admin`
    
## Technology & Framework
    - Frontend : React (Typescript)
    - Backend : Express (Typescript)
    - Mobile : Flutter
    - Database : MongoDB => it enables us to build our applications faster, handle highly diverse data types, and manage applications more efficiently at scale. Especially, we are storing face descriptions in the DB as well.
    
## Get Started (Recommend to use Docker if want to run locally for website and doownload our [mobile apk](https://bridgify.s3.ap-southeast-1.amazonaws.com/mobile/Bridgify.apk) to install via an Android Phone to save the hassle)
### Docker (Since we are using production URL for our backend, you can just build our frontend image)
Make sure your Docker is running

#### Only frontend
- cd to 'Bridgify/frontend'
    - Build the image : `docker build -t bridgify-frontend .`
    - Run the image : `docker run -dp 127.0.0.1:3000:3000 bridgify-frontend`
![image](https://github.com/xXxPMWxXx/Bridgify/assets/53245147/d8d6b14e-c319-48f6-ae08-3c20f7061204)
    - After 'No issues found', you can then access our website locally via: `localhost:3000`

#### Both both frontend and backend
- cd to 'Bridgify' : `docker compose up` 
    - Notes: if have Segmentation fault => use Docker Desktop to start the container
![image](https://github.com/xXxPMWxXx/Bridgify/assets/53245147/fcb8443b-ca8a-4fc8-96d4-fba34bbef8a1)
![image](https://github.com/xXxPMWxXx/Bridgify/assets/53245147/4fb9faa9-81b6-4fd2-98b3-60d3579298c7)
![image](https://github.com/xXxPMWxXx/Bridgify/assets/53245147/e7ebe4a7-ed37-47b3-acc6-526ac76172dc)

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
- cd Bridgify/frontend => npm install --legacy-peer-deps
- cd Bridgify => npm start => to run both frontend && backend

### AWS EC2
- `ssh -i ".ssh/id_rsa" ubuntu@13.228.86.148` => connect to EC2 via ssh
    - .ssh/id_rsa = the location of your id_rsa file
- `rm -rf node_modules/` => remove folder in ubuntu
##### Endpoint
- http://13.228.86.148:3000 => fronend
- http://13.228.86.148:8000 => backend
- http://13.228.86.148:8000/doc => backend swagger

##### Debugging
- `npm rebuild @tensorflow/tfjs-node --build-from-source` => for backend, as tfjs-node need this cmd to work

###### Managing a single session
- `tmux` => to start a session
- `tmux attach` => to reconnect to the session, after login to new ssh
- `tmux detach` => to disconnect to from the current attached session
- 
###### Managing a multiple session
- `tmux new-session -s session_name` => Start(and connect to) a new named session
- `tmux list-sessions` => List all active sessions
- `tmux attach-session -t session_name` => Connect to a named session
- `tmux kill-session -t session_name` => Kill/stop a session (enter `exit` command while connected to the session also will kill the session)

### Setting up Flutter framework on vscode
- Install accordingly for mac and windows and extract to desired location (https://docs.flutter.dev/get-started/install)
- Please note to have VSCode already installed
- #### Windows:
- Navigate to "flutter\bin" and copy its path within the previously chosen location
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


- #### macOS:
- Determine the path of your clone of the Flutter SDK
- Open (or create) the rc file for your shell. Typing echo $SHELL in your Terminal tells you which shell you’re using. If you’re using Bash, edit $HOME/.bash_profile or $HOME/.bashrc. If you’re using Z shell, edit $HOME/.zshrc. If you’re using a different shell, the file path and filename will be different on your machine.
- Add the following line and change [PATH_OF_FLUTTER_GIT_DIRECTORY] to be the path of your clone of the Flutter git repo:
![image](https://github.com/xXxPMWxXx/Bridgify/assets/64420980/ceed3d9b-4bdb-49c8-906d-1c252f55ecf2)
- Run source $HOME/.<rc file> to refresh the current window, or open a new terminal window to automatically source the file.
![image](https://github.com/xXxPMWxXx/Bridgify/assets/64420980/4a123c95-e1e4-411e-a715-8ec37b1e0021)
- Run 'which flutter' to verify that the flutter command is available
- Run 'flutter doctor', which checks your environment and displays a report to the terminal window. The Dart SDK is bundled with Flutter; it isn’t necessary to install Dart separately. Check the output carefully for other software you might need to install or further tasks to perform (shown in bold text).
![image](https://github.com/xXxPMWxXx/Bridgify/assets/64420980/c698fa37-9e43-4c4b-94b0-d6bc7cfc1d99)
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
- Enable VM acceleration on your machine (https://developer.android.com/studio/run/emulator-acceleration#accel-vm)
- Open Android Studio => Click on 'More Actions' icon => Android Device Manager => Create Device (Phone)
![image](https://github.com/xXxPMWxXx/Bridgify/assets/64420980/2840293d-c016-449f-9a6b-29fd9f3d4a80)
- Choose a device definition and select Next.
- Select one or more system images for the Android versions you want to emulate, and select Next. An x86 or x86_64 image is recommended.
- Under Emulated Performance, select Hardware - GLES 2.0 to enable hardware acceleration.
- Verify the AVD configuration is correct, and select Finish.
- #### To run the emulator, either 
- In Android Virtual Device Manager, click Run in the toolbar. The emulator starts up and displays the default canvas for your selected OS version and device.
- #### or
- Click on the 'Chrome(web-javascript)' on the bottom right of the screen
![image](https://github.com/xXxPMWxXx/Bridgify/assets/64420980/f4c564e8-4f9c-446e-be2e-5a050a0f8ed4)
- This show a pop up on the top of the screen where you can choose the android emulator that you just created
![image](https://github.com/xXxPMWxXx/Bridgify/assets/64420980/05ff89ba-866c-49f5-be8e-4a974db87db8)
- To run and debug your project, go to the main.dart file => with the android emulator open, click on "Start Debugging" 
![image](https://github.com/xXxPMWxXx/Bridgify/assets/64420980/dc5529a8-c71c-481b-bf07-3bf2a0a961e4)
