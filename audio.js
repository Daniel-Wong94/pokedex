const audioLinks = [
  "https://vgmsite.com/soundtracks/pokemon-gameboy-sound-collection/ftcsbcug/103-professor%20oak.mp3",
  "https://vgmsite.com/soundtracks/pokemon-gameboy-sound-collection/twanajhe/102-palette%20town%20theme.mp3",
  "https://vgmsite.com/soundtracks/pokemon-gameboy-sound-collection/vdrfhwxr/104-oak%20research%20lab.mp3",
  "https://vgmsite.com/soundtracks/pokemon-gameboy-sound-collection/xwvbnmtw/110-pokemon%20center.mp3",
  "https://vgmsite.com/soundtracks/pokemon-gameboy-sound-collection/ajylbpgr/119-cerulean%20city%27s%20theme.mp3",
  "https://vgmsite.com/soundtracks/pokemon-gameboy-sound-collection/rgtycmkj/132-pokemon%20tower.mp3",
  "https://vgmsite.com/soundtracks/pokemon-gameboy-sound-collection/eyuaeomq/133-celadon%20city.mp3",
];

const audioTag = document.querySelector("audio");

const playNext = () => {
  const randomAudioIndex = Math.floor(Math.random() * audioLinks.length);
  const randomAudio = audioLinks[randomAudioIndex];
  const songName = randomAudio.split("-").slice(-1);
  console.log("playing next: ", decodeURI(songName));
  audioTag.src = randomAudio;
};

audioTag.addEventListener("ended", (e) => {
  console.log("song ended, playing next...");
  playNext();
});

window.onload = playNext;
