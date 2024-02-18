export function handleExternalProgressClick(
  audioFile: HTMLAudioElement,
  progress: number
) {
  {
    const percentage = progress / 100;
    audioFile.currentTime = percentage * audioFile.duration;
  }
}
