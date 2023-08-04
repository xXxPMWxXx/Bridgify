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
    
##### After you setup the neccessary package (Since our code is using production backend URL, you dont need to run backend locally, just need run frontend locally)
- Please make sure you have install Node js (V18)
- cd Bridgify => npm install
- cd Bridgify/backend => npm install
- cd Bridgify/frontend => npm install
- cd Bridgify => npm start => to run both frontend && backend

### Docker
- `docker compose up` => to build the image and run
    - Notes: if have Segmentation fault => use Docker Desktop to start the container

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

## Contributors
- [Petrina Wong Jing Ting](https://github.com/petrinawjt)
- [Pan Mingwei](https://github.com/xXxPMWxXx)
- [Lim ZhengLong Brian](https://github.com/Liseon617)
- [Georgia Ng](https://github.com/Georgiaxng)
- [Naufal Syaqil Bin Azmi](https://github.com/nafutofu)

