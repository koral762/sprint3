export function NoteText({ note }) {
  const setAudio = (audio) => {
    let str = (
      <audio
        className="audio-container"
        controls
        src={audio}
        type="audio/mpeg"
      ></audio>
    );
    return str;
  };
  return <div>{setAudio(note.info.audio)}</div>;
}
