// Web Audio API Synthesizer and FX Engine for Smoking Weed Simulator

class GameAudioEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.isDronePlaying = false;
    
    // Music variables
    this.bpm = 130;
    this.beatInterval = 60 / this.bpm / 2; // Eighth notes
    this.currentStep = 0;
    this.nextNoteTime = 0.0;
    this.timerId = null;
    
    // Highness modifier (0 to 1) for pitch wobblying, low-pass sweeping, and tempo stretching
    this.highness = 0.0;
    
    // Active nodes tracking
    this.peeSource = null;
    this.peeGain = null;
    this.dizzyOsc = null;
    
    // Bass sequence (A minor)
    this.bassSeq = [
      55.00, 55.00, 65.41, 65.41, // A1, A1, C2, C2
      73.42, 73.42, 87.31, 98.00  // D2, D2, F2, G2
    ];
    
    // Lead sequence
    this.leadSeq = [
      220.00, 0, 261.63, 293.66, 0, 349.23, 329.63, 0,
      220.00, 220.00, 0, 392.00, 349.23, 293.66, 261.63, 0
    ];
  }

  init() {
    if (this.ctx) return;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    this.ctx = new AudioContextClass();
  }

  // Helper to generate white noise buffer
  createNoiseBuffer() {
    const bufferSize = this.ctx.sampleRate * 2; // 2 seconds
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    return buffer;
  }

  startMusic() {
    if (!this.ctx) this.init();
    if (this.isPlaying) return;
    
    this.isPlaying = true;
    this.nextNoteTime = this.ctx.currentTime;
    this.scheduler();
  }

  stopMusic() {
    this.isPlaying = false;
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  scheduler() {
    if (!this.isPlaying) return;
    while (this.nextNoteTime < this.ctx.currentTime + 0.1) {
      this.scheduleNote(this.currentStep, this.nextNoteTime);
      this.advanceNote();
    }
    // Poll scheduler
    this.timerId = setTimeout(() => this.scheduler(), 25);
  }

  advanceNote() {
    const secondsPerBeat = 60.0 / this.bpm;
    // eighth note step
    const stepDuration = secondsPerBeat / 2;
    // Add psychedelic sluggishness/stretching based on highness
    const delayFactor = 1.0 + this.highness * 0.35;
    this.nextNoteTime += stepDuration * delayFactor;
    this.currentStep = (this.currentStep + 1) % 16;
  }

  scheduleNote(step, time) {
    if (this.isDronePlaying) return; // Don't play synthwave when trippy drone is active

    // 1. Kick Drum (Steps 0, 4, 8, 12)
    if (step % 4 === 0) {
      this.playSynthKick(time);
    }

    // 2. Snare Drum (Steps 4, 12)
    if (step % 8 === 4) {
      this.playSynthSnare(time);
    }

    // 3. Hi-Hat (Steps 2, 6, 10, 14 - Offbeat)
    if (step % 2 === 1) {
      this.playSynthHihat(time);
    }

    // 4. Bassline (Every 8th note, except rests)
    const bassNote = this.bassSeq[step % this.bassSeq.length];
    if (bassNote) {
      this.playSynthBass(bassNote, time);
    }

    // 5. Trippy Lead Melody (sometimes, depending on step)
    const leadNote = this.leadSeq[step];
    if (leadNote > 0 && Math.random() > 0.3) {
      // Add slight randomness when high
      const highPitch = leadNote * (1.0 + (Math.random() - 0.5) * 0.04 * this.highness);
      this.playSynthLead(highPitch, time);
    }
  }

  // --- Instrumental Synthesizers ---

  playSynthKick(time) {
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.frequency.setValueAtTime(150, time);
    osc.frequency.exponentialRampToValueAtTime(0.01, time + 0.3);

    gain.gain.setValueAtTime(0.6, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + 0.3);

    osc.start(time);
    osc.stop(time + 0.3);
  }

  playSynthSnare(time) {
    // Noise buffer snare
    const noise = this.ctx.createBufferSource();
    noise.buffer = this.createNoiseBuffer();

    const noiseFilter = this.ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.value = 1000;

    const noiseGain = this.ctx.createGain();
    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(this.ctx.destination);

    noiseGain.gain.setValueAtTime(0.3, time);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, time + 0.25);

    // Oscillator snap
    const snap = this.ctx.createOscillator();
    const snapGain = this.ctx.createGain();
    snap.connect(snapGain);
    snapGain.connect(this.ctx.destination);

    snap.type = 'triangle';
    snap.frequency.setValueAtTime(180, time);

    snapGain.gain.setValueAtTime(0.4, time);
    snapGain.gain.exponentialRampToValueAtTime(0.01, time + 0.1);

    noise.start(time);
    snap.start(time);

    noise.stop(time + 0.3);
    snap.stop(time + 0.3);
  }

  playSynthHihat(time) {
    const noise = this.ctx.createBufferSource();
    noise.buffer = this.createNoiseBuffer();

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 7000;

    const gain = this.ctx.createGain();
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    gain.gain.setValueAtTime(0.12, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + 0.05);

    noise.start(time);
    noise.stop(time + 0.06);
  }

  playSynthBass(freq, time) {
    const osc = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    // Detune oscillators for fatness
    osc.type = 'sawtooth';
    osc2.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, time);
    osc2.frequency.setValueAtTime(freq - 1.5, time); // detuned

    // Add wobbly vibrato based on highness
    if (this.highness > 0) {
      const wobble = 4.0 * this.highness;
      osc.frequency.linearRampToValueAtTime(freq + wobble, time + 0.1);
      osc.frequency.linearRampToValueAtTime(freq - wobble, time + 0.2);
    }

    // Filter sweep
    filter.type = 'lowpass';
    const cutoff = 400 + (1 - this.highness) * 800; // Muffled filter when high
    filter.frequency.setValueAtTime(cutoff, time);
    filter.frequency.exponentialRampToValueAtTime(100, time + 0.2);

    gain.gain.setValueAtTime(0.28, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + 0.25);

    osc.start(time);
    osc2.start(time);
    osc.stop(time + 0.25);
    osc2.stop(time + 0.25);
  }

  playSynthLead(freq, time) {
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const delay = this.ctx.createDelay();
    const delayGain = this.ctx.createGain();

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    // Delay loop for echo effect
    gain.connect(delay);
    delay.connect(delayGain);
    delayGain.connect(this.ctx.destination);
    delayGain.connect(delay); // feedback

    delay.delayTime.setValueAtTime(0.18, time);
    delayGain.gain.setValueAtTime(0.35, time);

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, time);

    // Trippy slides when high
    if (this.highness > 0.2) {
      osc.frequency.exponentialRampToValueAtTime(freq * (1.0 + this.highness * 0.5), time + 0.2);
    }

    gain.gain.setValueAtTime(0.12, time);
    gain.gain.exponentialRampToValueAtTime(0.005, time + 0.3);

    osc.start(time);
    osc.stop(time + 0.4);
  }

  // --- Mushroom Psychedelic Drone ---

  startDrone() {
    if (!this.ctx) this.init();
    if (this.isDronePlaying) return;
    this.isDronePlaying = true;
    
    // Stop standard music steps
    this.stopMusic();

    // Create dark rumbling drone
    this.droneOsc1 = this.ctx.createOscillator();
    this.droneOsc2 = this.ctx.createOscillator();
    this.droneGain = this.ctx.createGain();
    this.droneFilter = this.ctx.createBiquadFilter();

    this.droneOsc1.type = 'sawtooth';
    this.droneOsc2.type = 'triangle';
    this.droneOsc1.frequency.value = 45.0; // F#1/G1 sub
    this.droneOsc2.frequency.value = 67.5; // detuned harmonic

    this.droneFilter.type = 'lowpass';
    this.droneFilter.frequency.value = 180;

    // Pitch sweep LFO
    this.droneLfo = this.ctx.createOscillator();
    this.droneLfoGain = this.ctx.createGain();
    this.droneLfo.frequency.value = 0.2; // very slow
    this.droneLfoGain.gain.value = 4.0; // depth

    this.droneLfo.connect(this.droneLfoGain);
    this.droneLfoGain.connect(this.droneOsc1.frequency);
    this.droneLfoGain.connect(this.droneOsc2.frequency);

    this.droneOsc1.connect(this.droneFilter);
    this.droneOsc2.connect(this.droneFilter);
    this.droneFilter.connect(this.droneGain);
    this.droneGain.connect(this.ctx.destination);

    this.droneGain.gain.setValueAtTime(0.0, this.ctx.currentTime);
    this.droneGain.gain.linearRampToValueAtTime(0.45, this.ctx.currentTime + 3.0);

    this.droneOsc1.start();
    this.droneOsc2.start();
    this.droneLfo.start();

    // Random metallic kettley screech sounds
    this.screechInterval = setInterval(() => {
      if (this.isDronePlaying && Math.random() > 0.4) {
        this.playHallucinationScreech();
      }
    }, 4000);
  }

  playHallucinationScreech() {
    const time = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(600 + Math.random() * 800, time);
    osc.frequency.exponentialRampToValueAtTime(100 + Math.random() * 200, time + 1.5);

    filter.type = 'bandpass';
    filter.frequency.value = 800;

    gain.gain.setValueAtTime(0.0, time);
    gain.gain.linearRampToValueAtTime(0.08, time + 0.2);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 1.5);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(time);
    osc.stop(time + 1.6);
  }

  stopDrone() {
    this.isDronePlaying = false;
    clearInterval(this.screechInterval);

    if (this.droneOsc1) {
      try {
        const time = this.ctx.currentTime;
        this.droneGain.gain.setValueAtTime(this.droneGain.gain.value, time);
        this.droneGain.gain.exponentialRampToValueAtTime(0.001, time + 1.0);
        setTimeout(() => {
          this.droneOsc1.stop();
          this.droneOsc2.stop();
          this.droneLfo.stop();
        }, 1100);
      } catch(e) {}
    }

    // Restart synthwave loop
    this.startMusic();
  }

  // --- Sound Effects Player ---

  playSFX(name) {
    if (!this.ctx) this.init();
    const time = this.ctx.currentTime;

    switch (name) {
      case 'pee':
        if (this.peeSource) return; // already peeing
        this.peeSource = this.ctx.createBufferSource();
        this.peeSource.buffer = this.createNoiseBuffer();
        this.peeSource.loop = true;

        const peeFilter = this.ctx.createBiquadFilter();
        peeFilter.type = 'bandpass';
        peeFilter.frequency.value = 350;
        peeFilter.Q.value = 2.0;

        this.peeGain = this.ctx.createGain();
        this.peeGain.gain.setValueAtTime(0.12, time);

        this.peeSource.connect(peeFilter);
        peeFilter.connect(this.peeGain);
        this.peeGain.connect(this.ctx.destination);
        this.peeSource.start();
        break;

      case 'bong':
        // Bubbling sound effect
        for (let i = 0; i < 15; i++) {
          const bubbleTime = time + i * 0.08;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          
          osc.type = 'sine';
          osc.frequency.setValueAtTime(200 + Math.random() * 150, bubbleTime);
          osc.frequency.exponentialRampToValueAtTime(600 + Math.random() * 200, bubbleTime + 0.06);

          gain.gain.setValueAtTime(0.18, bubbleTime);
          gain.gain.exponentialRampToValueAtTime(0.001, bubbleTime + 0.06);

          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(bubbleTime);
          osc.stop(bubbleTime + 0.07);
        }
        break;

      case 'knock':
        // Door knocks (3 heavy wraps)
        for (let i = 0; i < 3; i++) {
          const knockTime = time + i * 0.35;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(100, knockTime);
          osc.frequency.exponentialRampToValueAtTime(10, knockTime + 0.12);

          gain.gain.setValueAtTime(0.7, knockTime);
          gain.gain.exponentialRampToValueAtTime(0.01, knockTime + 0.12);

          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(knockTime);
          osc.stop(knockTime + 0.15);
        }
        break;

      case 'swing':
        // Weapon swing WHOOSH
        const swingOsc = this.ctx.createOscillator();
        const swingGain = this.ctx.createGain();
        const swingFilter = this.ctx.createBiquadFilter();

        swingOsc.type = 'triangle';
        swingOsc.frequency.setValueAtTime(600, time);
        swingOsc.frequency.exponentialRampToValueAtTime(120, time + 0.15);

        swingFilter.type = 'lowpass';
        swingFilter.frequency.value = 1000;

        swingGain.gain.setValueAtTime(0.35, time);
        swingGain.gain.exponentialRampToValueAtTime(0.001, time + 0.15);

        swingOsc.connect(swingFilter);
        swingFilter.connect(swingGain);
        swingGain.connect(this.ctx.destination);
        swingOsc.start(time);
        swingOsc.stop(time + 0.16);
        break;

      case 'hit':
        // Metallic kitchen clank (kettle hit)
        const hitOsc1 = this.ctx.createOscillator();
        const hitOsc2 = this.ctx.createOscillator();
        const hitGain = this.ctx.createGain();

        hitOsc1.type = 'square';
        hitOsc2.type = 'sine';
        
        hitOsc1.frequency.setValueAtTime(880, time);
        hitOsc2.frequency.setValueAtTime(1480, time);

        hitGain.gain.setValueAtTime(0.25, time);
        hitGain.gain.exponentialRampToValueAtTime(0.001, time + 0.25);

        hitOsc1.connect(hitGain);
        hitOsc2.connect(hitGain);
        hitGain.connect(this.ctx.destination);

        hitOsc1.start(time);
        hitOsc2.start(time);
        hitOsc1.stop(time + 0.26);
        hitOsc2.stop(time + 0.26);
        break;

      case 'boss_hit':
        // Big heavy kettle kick back
        const explosion = this.ctx.createBufferSource();
        explosion.buffer = this.createNoiseBuffer();
        
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 150;

        const expGain = this.ctx.createGain();
        expGain.gain.setValueAtTime(0.8, time);
        expGain.gain.exponentialRampToValueAtTime(0.01, time + 0.4);

        explosion.connect(filter);
        filter.connect(expGain);
        expGain.connect(this.ctx.destination);
        explosion.start(time);
        explosion.stop(time + 0.45);
        break;
    }
  }

  stopPee() {
    if (this.peeSource) {
      try {
        const time = this.ctx.currentTime;
        this.peeGain.gain.setValueAtTime(this.peeGain.gain.value, time);
        this.peeGain.gain.exponentialRampToValueAtTime(0.001, time + 0.15);
        const source = this.peeSource;
        setTimeout(() => source.stop(), 200);
      } catch(e) {}
      this.peeSource = null;
      this.peeGain = null;
    }
  }

  startDizzyDroning() {
    if (!this.ctx) this.init();
    if (this.dizzyOsc) return;

    this.dizzyOsc = this.ctx.createOscillator();
    this.dizzyGain = this.ctx.createGain();

    this.dizzyOsc.type = 'sine';
    this.dizzyOsc.frequency.setValueAtTime(80, this.ctx.currentTime);
    
    // Pitch wobblying LFO for dizziness
    const lfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    lfo.frequency.value = 0.5;
    lfoGain.gain.value = 10;

    lfo.connect(lfoGain);
    lfoGain.connect(this.dizzyOsc.frequency);

    this.dizzyOsc.connect(this.dizzyGain);
    this.dizzyGain.connect(this.ctx.destination);

    this.dizzyGain.gain.setValueAtTime(0.0, this.ctx.currentTime);
    this.dizzyGain.gain.linearRampToValueAtTime(0.18, this.ctx.currentTime + 1.0);

    this.dizzyOsc.start();
    lfo.start();
  }

  stopDizzyDroning() {
    if (this.dizzyOsc) {
      try {
        const time = this.ctx.currentTime;
        this.dizzyGain.gain.setValueAtTime(this.dizzyGain.gain.value, time);
        this.dizzyGain.gain.exponentialRampToValueAtTime(0.001, time + 0.5);
        const osc = this.dizzyOsc;
        setTimeout(() => osc.stop(), 600);
      } catch(e) {}
      this.dizzyOsc = null;
    }
  }
}

// Instantiate globally so it can be referenced in game.js
const audio = new GameAudioEngine();
