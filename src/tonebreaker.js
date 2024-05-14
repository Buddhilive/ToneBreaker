var seqHeight = 360;
var dialHeight = window.innerHeight / 10;

var sequencer = new Nexus.Sequencer('#target', {
    'size': [seqHeight, seqHeight],
    'mode': 'toggle',
    'rows': 32,
    'columns': 16
});
sequencer.colorize("accent", "#FF6F00");

var dialer = new Nexus.Dial('#dialer', {
    'size': [dialHeight, dialHeight],
    'interaction': 'radial',
    'mode': 'relative',
    'min': 0.5,
    'max': 2,
    'step': 0.1,
    'value': 1
});
dialer.colorize("accent", "#FF6F00");
var dialNumber = new Nexus.Number('#dialNum');
dialNumber.link(dialer);

var dialer2 = new Nexus.Dial('#dialer2', {
    'size': [dialHeight, dialHeight],
    'interaction': 'radial',
    'mode': 'relative',
    'min': 100,
    'max': 400,
    'step': 20,
    'value': 200
});
dialer2.colorize("accent", "#FFA800");
var dialNumber2 = new Nexus.Number('#dialNum2');
dialNumber2.link(dialer2);

var drumSlider = new Nexus.Select('#drumSlider', {
    'size': [120, 30],
    'options': ['Drumkit1', 'Drumkit2', 'Drumkit3']
});

var melodySlider = new Nexus.Select('#melodySlider', {
    'size': [120, 30],
    'options': ['Melody1', 'Melody2', 'Melody3']
});

var playTempo = dialNumber2.value;
var rnn_steps = 16;
var rnn_temperature = dialNumber.value;
var melodySample = Melody1;
var drumSample = Drumkit1;

document.getElementById("btn11").onclick = function () { playSequence() };
document.getElementById("btn22").onclick = function () { stopSequence() };
document.getElementById("btn").onclick = function () { musicGenerator() };
document.getElementById("btnClose").onclick = function () { initializeVar() };

var drum_kick = new Tone.Player("sounds/kick.mp3").toMaster();
var drum_snare = new Tone.Player("sounds/snare.mp3").toMaster();

var drum_hihat_closed = new Tone.Player("sounds/hihat-closed.mp3").toMaster();
var drum_hihat_open = new Tone.Player("sounds/hihat-open.mp3").toMaster();

var drum_tom_low = new Tone.Player("sounds/tom-low.mp3").toMaster();
var drum_tom_mid = new Tone.Player("sounds/tom-mid.mp3").toMaster();
var drum_tom_high = new Tone.Player("sounds/tom-high.mp3").toMaster();

var drum_clap = new Tone.Player("sounds/clap.mp3").toMaster();

var drum_bassdrum = new Tone.Player("sounds/bassdrum.ogg").toMaster();
var drum_clav = new Tone.Player("sounds/clav.ogg").toMaster();
var drum_crash = new Tone.Player("sounds/crash.ogg").toMaster();
var drum_kick_distorted = new Tone.Player("sounds/kick_distorted.ogg").toMaster();
var drum_ride = new Tone.Player("sounds/ride.ogg").toMaster();
var drum_shaker = new Tone.Player("sounds/shaker.ogg").toMaster();
var drum_snare_electro = new Tone.Player("sounds/snare_electro.ogg").toMaster();
var drum_wood = new Tone.Player("sounds/wood.ogg").toMaster();

var synth = new Tone.Synth({
    oscillator: {
        type: 'triangle'
    },
    envelope: {
        attack: 0.001,
        decay: 0.1,
        sustain: 0.1,
        release: 0.1
    }
}).toMaster();

sequencer.on('change', function (v) {
    //const matMusic = sequencer.matrix.pattern;
    //console.log(matMusic[0][0]);
    //console.log(typeof v.state);
    if (v.row == 0 && v.state == true) {
        //drum_kick_distorted.start();
    }
});

melodySlider.on('change', function (v) {

    switch (v.value) {
        case "Melody1":
            melodySample = Melody1;
            break;
        case "Melody2":
            melodySample = Melody2;
            break;
        case "Melody3":
            melodySample = Melody3;
            break;
    }

});

drumSlider.on('change', function (v) {
    switch (v.value) {
        case "Drumkit1":
            drumSample = Drumkit1;
            break;
        case "Drumkit2":
            drumSample = Drumkit2;
            break;
        case "Drumkit3":
            drumSample = Drumkit3;
            break;
    }

});

sequencer.on('step', function (v) {
    //console.log(v);
    if (v[31] == 1) {
        drum_kick.start();
    }
    if (v[30] == 1) {
        drum_snare.start();
    }
    if (v[29] == 1) {
        drum_hihat_closed.start();
    }
    if (v[28] == 1) {
        drum_hihat_open.start();
    }
    if (v[27] == 1) {
        drum_tom_low.start();
    }
    if (v[26] == 1) {
        drum_tom_mid.start();
    }
    if (v[25] == 1) {
        drum_tom_high.start();
    }
    if (v[24] == 1) {
        drum_clap.start();
    }
    if (v[23] == 1) {
        drum_bassdrum.start();
    }
    if (v[22] == 1) {
        drum_clav.start();
    }
    if (v[21] == 1) {
        drum_crash.start();
    }
    if (v[20] == 1) {
        drum_kick_distorted.start();
    }
    if (v[19] == 1) {
        drum_ride.start();
    }
    if (v[18] == 1) {
        drum_shaker.start();
    }
    if (v[17] == 1) {
        drum_snare_electro.start();
    }
    if (v[16] == 1) {
        drum_wood.start();
    }
    //console.log(v);
    if (v[15] == 1) {
        synth.triggerAttackRelease('C#5', '8n')
    }
    if (v[14] == 1) {
        synth.triggerAttackRelease('C5', '8n')
    }
    if (v[13] == 1) {
        synth.triggerAttackRelease('B4', '8n')
    }
    if (v[12] == 1) {
        synth.triggerAttackRelease('A#4', '8n')
    }
    if (v[11] == 1) {
        synth.triggerAttackRelease('A4', '8n')
    }
    if (v[10] == 1) {
        synth.triggerAttackRelease('G#4', '8n')
    }
    if (v[9] == 1) {
        synth.triggerAttackRelease('G4', '8n')
    }
    if (v[8] == 1) {
        synth.triggerAttackRelease('F#4', '8n')
    }
    if (v[7] == 1) {
        synth.triggerAttackRelease('F4', '8n')
    }
    if (v[6] == 1) {
        synth.triggerAttackRelease('E4', '8n')
    }
    if (v[5] == 1) {
        synth.triggerAttackRelease('D#4', '8n')
    }
    if (v[4] == 1) {
        synth.triggerAttackRelease('D4', '8n')
    }
    if (v[3] == 1) {
        synth.triggerAttackRelease('C#4', '8n')
    }
    if (v[2] == 1) {
        synth.triggerAttackRelease('C4', '8n')
    }
    if (v[1] == 1) {
        synth.triggerAttackRelease('B3', '8n')
    }
    if (v[0] == 1) {
        synth.triggerAttackRelease('A#3', '8n')
    }
});

var rnnPlayer = new mm.Player();

function musicGenerator() {

    //console.log(rnn_temperature);

    if (music_rnn.isInitialized() == true && drum_rnn.isInitialized() == true) {
        sequencer.matrix.populate.all([0, 0]);

        if (rnnPlayer.isPlaying()) {
            rnnPlayer.stop();
            return;
        }

        const qns = mm.sequences.quantizeNoteSequence(melodySample, 1);
        const drums_qns = mm.sequences.quantizeNoteSequence(drumSample, 1);

        music_rnn
            .continueSequence(qns, rnn_steps, rnn_temperature)
            .then((sample) => {

                //console.log(sample);


                for (var i = 0; sample.notes.length > i; i++) {
                    var counters = sample.notes[i].quantizedStartStep;
                    var pitch = sample.notes[i].pitch;
                    var rowCell = 0;

                    switch (pitch) {
                        case 58:
                            rowCell = 0;
                            break;
                        case 59:
                            rowCell = 1;
                            break;
                        case 60:
                            rowCell = 2;
                            break;
                        case 61:
                            rowCell = 3;
                            break;
                        case 62:
                            rowCell = 4;
                            break;
                        case 63:
                            rowCell = 5;
                            break;
                        case 64:
                            rowCell = 6;
                            break;
                        case 65:
                            rowCell = 7;
                            break;
                        case 66:
                            rowCell = 8;
                            break;
                        case 67:
                            rowCell = 9;
                            break;
                        case 68:
                            rowCell = 10;
                            break;
                        case 69:
                            rowCell = 11;
                            break;
                        case 70:
                            rowCell = 12;
                            break;
                        case 71:
                            rowCell = 13;
                            break;
                        case 72:
                            rowCell = 14;
                            break;
                        case 73:
                            rowCell = 15;
                            break;
                    }

                    sequencer.matrix.set.cell(counters, rowCell, 1);
                }
            });


        drum_rnn
            .continueSequence(qns, rnn_steps, rnn_temperature)
            .then((sample) => {

                //console.log(sample);

                for (var i = 0; sample.notes.length > i; i++) {
                    var counters = sample.notes[i].quantizedStartStep;
                    var pitch = sample.notes[i].pitch;
                    var rowCell = 0;

                    switch (pitch) {
                        case 58:
                            rowCell = 16;
                            break;
                        case 59:
                            rowCell = 17;
                            break;
                        case 60:
                            rowCell = 18;
                            break;
                        case 61:
                            rowCell = 19;
                            break;
                        case 62:
                            rowCell = 20;
                            break;
                        case 63:
                            rowCell = 21;
                            break;
                        case 64:
                            rowCell = 22;
                            break;
                        case 65:
                            rowCell = 23;
                            break;
                        case 66:
                            rowCell = 24;
                            break;
                        case 67:
                            rowCell = 25;
                            break;
                        case 68:
                            rowCell = 26;
                            break;
                        case 69:
                            rowCell = 27;
                            break;
                        case 70:
                            rowCell = 28;
                            break;
                        case 71:
                            rowCell = 29;
                            break;
                        case 72:
                            rowCell = 30;
                            break;
                        case 73:
                            rowCell = 31;
                            break;
                    }

                    sequencer.matrix.set.cell(counters, rowCell, 1);
                }
            });

    } else {

        var notification = document.querySelector('.mdl-js-snackbar');
        notification.MaterialSnackbar.showSnackbar(
            {
                message: 'Initializing.... Try again shortly...',
                timeout: 10000
            }
        );

    }
};

function playSequence() {
    sequencer.start(playTempo);
    document.getElementById("btn11").disabled = true;
    document.getElementById("btn22").disabled = false;
};

function stopSequence() {
    //console.log(v);
    sequencer.stop();
    document.getElementById("btn22").disabled = true;
    document.getElementById("btn11").disabled = false;
};

function initializeVar() {
    playTempo = dialNumber2.value;
    rnn_temperature = dialNumber.value;
};

var music_rnn = new mm.MusicRNN('https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/melody_rnn');
music_rnn.initialize();

var drum_rnn = new mm.MusicRNN('https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/basic_rnn');
drum_rnn.initialize();