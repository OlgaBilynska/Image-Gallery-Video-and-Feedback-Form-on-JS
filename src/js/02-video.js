import Vimeo from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Vimeo(iframe);
    

player.on('timeupdate', throttle(() => {
    player.getCurrentTime().then(function (seconds) {
        console.log(seconds);
        localStorage.setItem("videoplayer-current-time", seconds);
    }).catch(function (error) {
        console.log(error);
    });
    }, 1000));

player.setCurrentTime(localStorage.getItem("videoplayer-current-time")).then(function (seconds) {
    console.log(seconds); 
}).catch(function(error) {
    switch (error.name) {
        case 'RangeError':
            break;
        default:
            break;
    }
});

