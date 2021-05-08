import { ResultPreview } from "./ResultPreview.jsx"


export function ResultList({searchResults, onAddBook}) {
    return <div className="book-shop-container">
     {searchResults.map(result => {
        return <ResultPreview key={result.id} result={result} onAddBook={onAddBook} />
    })}
    </div>
}