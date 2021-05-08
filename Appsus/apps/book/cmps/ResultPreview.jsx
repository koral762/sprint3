

export function ResultPreview({ result, onAddBook }) {
  return (
    <React.Fragment>
      <li className='result'>{result.volumeInfo.title}</li>
      <li><button onClick={() => onAddBook(result.id)}>Add book to gallery</button></li>
    </React.Fragment>
  );
}
