// Web Audio API Synthesizer for ZenPulse Relaxation Sounds

class AudioSynthEngine {
  private audioCtx: AudioContext | null = null;
  private activeNodes: Map<string, { gainNode: GainNode; stopFn: () => void }> = new Map();
  private globalVolume: number = 0.7;

  private initContext() {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioCtx = new AudioContextClass();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  public setVolume(volume: number) {
    this.globalVolume = Math.max(0, Math.min(1, volume));
    this.activeNodes.forEach(({ gainNode }) => {
      gainNode.gain.setTargetAtTime(this.globalVolume, this.audioCtx?.currentTime || 0, 0.1);
    });
  }

  public isPlaying(soundId: string): boolean {
    return this.activeNodes.has(soundId);
  }

  public stopSound(soundId: string) {
    const active = this.activeNodes.get(soundId);
    if (active && this.audioCtx) {
      // Gentle fade out
      active.gainNode.gain.setTargetAtTime(0, this.audioCtx.currentTime, 0.2);
      setTimeout(() => {
        active.stopFn();
        this.activeNodes.delete(soundId);
      }, 300);
    }
  }

  public stopAll() {
    Array.from(this.activeNodes.keys()).forEach((id) => this.stopSound(id));
  }

  public toggleSound(soundId: 'rainstorm' | 'whitenoise' | 'campfire' | 'forest') {
    if (this.isPlaying(soundId)) {
      this.stopSound(soundId);
    } else {
      this.playSound(soundId);
    }
  }

  public playSound(soundId: 'rainstorm' | 'whitenoise' | 'campfire' | 'forest') {
    this.initContext();
    if (!this.audioCtx) return;

    if (this.isPlaying(soundId)) {
      this.stopSound(soundId);
    }

    const masterGain = this.audioCtx.createGain();
    masterGain.gain.setValueAtTime(0.01, this.audioCtx.currentTime);
    masterGain.gain.setTargetAtTime(this.globalVolume, this.audioCtx.currentTime, 0.3);
    masterGain.connect(this.audioCtx.destination);

    let stopFn = () => {};

    if (soundId === 'whitenoise') {
      stopFn = this.createWhiteNoise(masterGain);
    } else if (soundId === 'rainstorm') {
      stopFn = this.createRainstorm(masterGain);
    } else if (soundId === 'campfire') {
      stopFn = this.createCampfire(masterGain);
    } else if (soundId === 'forest') {
      stopFn = this.createForest(masterGain);
    }

    this.activeNodes.set(soundId, { gainNode: masterGain, stopFn });
  }

  // White noise generator
  private createWhiteNoise(masterGain: GainNode): () => void {
    if (!this.audioCtx) return () => {};
    const bufferSize = this.audioCtx.sampleRate * 2;
    const buffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.audioCtx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const filter = this.audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 1000;

    noise.connect(filter);
    filter.connect(masterGain);
    noise.start();

    return () => {
      try {
        noise.stop();
        noise.disconnect();
      } catch (e) {
        console.error(e);
      }
    };
  }

  // Rainstorm: Lowpass white noise + thunder rumble LFO
  private createRainstorm(masterGain: GainNode): () => void {
    if (!this.audioCtx) return () => {};
    const bufferSize = this.audioCtx.sampleRate * 3;
    const buffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const rainSource = this.audioCtx.createBufferSource();
    rainSource.buffer = buffer;
    rainSource.loop = true;

    const rainFilter = this.audioCtx.createBiquadFilter();
    rainFilter.type = 'lowpass';
    rainFilter.frequency.value = 850;

    rainSource.connect(rainFilter);
    rainFilter.connect(masterGain);
    rainSource.start();

    // Occasional low thunder rumble
    const rumbleOsc = this.audioCtx.createOscillator();
    const rumbleGain = this.audioCtx.createGain();
    rumbleOsc.type = 'triangle';
    rumbleOsc.frequency.value = 45;
    rumbleGain.gain.value = 0.08;

    rumbleOsc.connect(rumbleGain);
    rumbleGain.connect(masterGain);
    rumbleOsc.start();

    return () => {
      try {
        rainSource.stop();
        rumbleOsc.stop();
        rainSource.disconnect();
        rumbleOsc.disconnect();
      } catch (e) {
        console.error(e);
      }
    };
  }

  // Campfire: Low rumbling background + crackle noise clicks
  private createCampfire(masterGain: GainNode): () => void {
    if (!this.audioCtx) return () => {};
    // Base hum
    const bufferSize = this.audioCtx.sampleRate * 2;
    const buffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const fireSource = this.audioCtx.createBufferSource();
    fireSource.buffer = buffer;
    fireSource.loop = true;

    const fireFilter = this.audioCtx.createBiquadFilter();
    fireFilter.type = 'lowpass';
    fireFilter.frequency.value = 350;

    fireSource.connect(fireFilter);
    fireFilter.connect(masterGain);
    fireSource.start();

    // Crackle timer
    let crackleTimer: number | null = null;
    const triggerCrackle = () => {
      if (!this.audioCtx) return;
      const crackleGain = this.audioCtx.createGain();
      crackleGain.gain.setValueAtTime(Math.random() * 0.15, this.audioCtx.currentTime);
      crackleGain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.05);

      const osc = this.audioCtx.createOscillator();
      osc.type = 'sawtooth';
      osc.frequency.value = 800 + Math.random() * 1200;

      osc.connect(crackleGain);
      crackleGain.connect(masterGain);
      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.05);

      const nextInterval = 80 + Math.random() * 350;
      crackleTimer = window.setTimeout(triggerCrackle, nextInterval);
    };

    triggerCrackle();

    return () => {
      try {
        fireSource.stop();
        fireSource.disconnect();
        if (crackleTimer) clearTimeout(crackleTimer);
      } catch (e) {
        console.error(e);
      }
    };
  }

  // Forest Breeze & Birds
  private createForest(masterGain: GainNode): () => void {
    if (!this.audioCtx) return () => {};
    // Soft breeze
    const bufferSize = this.audioCtx.sampleRate * 3;
    const buffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const breezeSource = this.audioCtx.createBufferSource();
    breezeSource.buffer = buffer;
    breezeSource.loop = true;

    const filter = this.audioCtx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 500;
    filter.Q.value = 1.5;

    breezeSource.connect(filter);
    filter.connect(masterGain);
    breezeSource.start();

    return () => {
      try {
        breezeSource.stop();
        breezeSource.disconnect();
      } catch (e) {
        console.error(e);
      }
    };
  }

  // Guided Breathing Tone (Single bowl chime)
  public playBreathingTone(freq: number = 220) {
    this.initContext();
    if (!this.audioCtx) return;

    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

    gain.gain.setValueAtTime(0.001, this.audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(0.12, this.audioCtx.currentTime + 1.5);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + 4.5);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start();
    osc.stop(this.audioCtx.currentTime + 4.5);
  }
}

export const audioSynth = new AudioSynthEngine();
