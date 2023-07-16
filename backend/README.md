#### need to install python@3.10 and below in order to run npm install without error
    - install pyenv => brew install pyenv
    
##### setup shell environment for pyenv (https://github.com/pyenv/pyenv#set-up-your-shell-environment-for-pyenv)
    - in your terminal run : (for mac)
    echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.bashrc
    echo 'command -v pyenv >/dev/null || export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.bashrc
    echo 'eval "$(pyenv init -)"' >> ~/.bashrc

##### pyenv commands
    -pyenv versions
    -pyenv global 2.7.18 => change your python version

#### for npm install canvas 
  - Mac OS : brew install pkg-config cairo pango libpng jpeg giflib librsvg pixman
  - Windows : https://github.com/Automattic/node-canvas/wiki/Installation:-Windows

npx tsx faceRecognition.ts => to run one file 


#### Install mongoDB (ignore this)

- brew install --cask mongodb-compass
- brew tap mongodb/brew
- brew install mongodb-community@6.0

To run mongoDB:
brew services start mongodb-community@6.0

To stop mongoDB:
brew services stop mongodb-community@6.0

#### Swagger (http://localhost:8000/doc/)
To generate routing for new file, to show in the swagger UI
- Modify the endpointsFiles path in swagger.ts
- `npm run swagger-autogen` => it will generate swagger_output_autogen.json
- copy everything in the path, paste it to swagger_output.json, and modify when necessary


#### AWS EC2
- `ssh -i "mw.pem" ubuntu@ec2-13-229-138-25.ap-southeast-1.compute.amazonaws.com` => connect to EC2 via ssh
- `rm -rf node_modules/` => remove folder in ubuntu
##### Endpoint
- http://13.228.86.148:3000 => fronend
- http://13.228.86.148:8000 => backend
- http://13.228.86.148:8000/doc => backend swagger

##### Debugging
- `npm rebuild @tensorflow/tfjs-node --build-from-source` => for backend, as tfjs-node need this cmd to work

###### Managing a signle seesion
- `tmux` => to start a session
- `tmux attach` => to reconnect to the seesion, after login to new ssh

###### Managing a signle seesion
- `tmux new-session -s session_name` => Start(and connect to) a new named session
- `tmux list-sessions` => List all active sessions
- `tmux attach-session -t session_name` => Connect to a named session
- `tmux kill-session -t session_name` => Kill/stop a session (enter `exit` command while connected to the session also will kill the session)