const app = () => {
    const song = document.querySelector('.song')
    const play = document.querySelector('.play')
    const outline = document.querySelector('.moving-outline circle')
    //  SOUNDS
    const sounds = document.querySelectorAll('.sound-picker button')
    // TIME DISPLAY
    const timeDisplay = document.querySelector('.time-display')
    const timeSelect = document.querySelectorAll('.time-select button')
    // get The Length of Outline
    const outlineLength = outline.getTotalLength()
    // Duration 
    let fakeDuration = 600
    outline.style.strokeDasharray = outlineLength
    outline.style.strokeDashoffset = outlineLength

    // Pick Different Sound
    sounds.forEach((option) => {
        option.addEventListener('click', function () {
            song.src = this.getAttribute('data-sound')
            checkPlaying(song)
        })
    })

    // play sound
    play.addEventListener('click', () => {
        checkPlaying(song)
    })

    // Select sound
    timeSelect.forEach((option) => {
        option.addEventListener('click', function () {
            fakeDuration = this.getAttribute('data-time')
            timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}`
        })
    })

    // CREATE A SPECIFIC FUNCTION TO STOP AND PLAY THE SOUND
    const checkPlaying = (song) => {
        if (song.paused) {
            song.play()
            play.src = './svg/pause.svg'
        } else {
            song.pause()
            play.src = './svg/play.svg'
        }
    }
    // WE CAN ANIMATED THE CIRCLE

    song.ontimeupdate = () => {
        let currentTime = song.currentTime;
        let elapsed = fakeDuration - currentTime
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);

        // Animate the circle
        let progress = outlineLength - (currentTime / fakeDuration) * outlineLength
        outline.style.strokeDashoffset = progress

        // Animate the text
        timeDisplay.textContent = `${minutes}:${seconds}`

        if (currentTime >= fakeDuration) {
            song.pause()
            song.currentTime = 0;
            play.src = './svg/play.svg'
        } else {

        }
    }


}

app()
