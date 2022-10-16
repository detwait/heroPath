export class AudioService {
  create(value?: string): HTMLAudioElement {
    const audio = new Audio(`${process.env.PUBLIC_URL}/music/location.mp3`);
    audio.setAttribute('loop', 'true');

    if (value) {
      this.change(audio, value);
    }

    return audio;
  }

  change(audio: HTMLAudioElement, value: string): void {
    audio.setAttribute('src', `${process.env.PUBLIC_URL}/audios/${value}`)
  }
}