# Bridgify
SMU .HEAP 2023 G14

## Get Started
- Please make sure you have install Node js
- cd Bridgify => npm install
- cd Bridgify/backend => npm install
- cd Bridgify/frontend => npm install
- cd Bridgify => npm start => to run both frontend && backend

### Docker
- `docker compose up` => to build the image and run
    - Notes: if have Segmentation fault => use Docker Desktop to start the container

#### AWS EC2
- `ssh -i ".ssh/id_rsa" ubuntu@13.229.138.25` => connect to EC2 via ssh
    - .ssh/id_rsa = the location of your id_rsa file
- `rm -rf node_modules/` => remove folder in ubuntu
##### Endpoint
- http://13.229.138.25:3000 => fronend
- http://13.229.138.25:8000 => backend
- http://13.229.138.25:8000/doc => backend swagger

##### Debugging
- `npm rebuild @tensorflow/tfjs-node --build-from-source` => for backend, as tfjs-node need this cmd to work

###### Managing a signle session
- `tmux` => to start a session
- `tmux attach` => to reconnect to the seesion, after login to new ssh

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

