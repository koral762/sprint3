const { Link, Route } = ReactRouterDOM;

import { ReviewList } from '../cmps/ReviewList.jsx';
import { Loader } from "../../book/cmps/Loader.jsx";
import { ReviewAdd } from "../cmps/ReviewAdd.jsx";
import { bookService } from "../services/book.service.js";
import { LongTxt } from '../cmps/LongTxt.jsx'

export class BookDetails extends React.Component {
  state = {
    isReadMore: false,
    book: null,
  };

  componentDidMount() {
    this.loadBook();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.bookId !== this.props.match.params.bookId) {
      this.loadBook()
    }
  }

  loadBook = () => {
    const { bookId } = this.props.match.params;
    bookService.getBookById(bookId).then((book) => {
      if (!book) return this.props.history.push("/book");
      this.setState({ book });
    });
  };

  onCloseModal = () => {
    this.props.history.push("/book");
  };

  toggleReadMore = () => {
    this.setState({ isReadMore: !this.state.isReadMore });
  };

  getPageCount = () => {
    const amount = this.state.book.pageCount;
    if (amount <= 100) return "Light reading";
    if (amount <= 200) return "Decent reading";
    return "Long reading";
  };

  getHowOld = () => {
    const { book } = this.state;
    const year = new Date(Date.now()).getFullYear();
    const bookRealeseYear = book.publishedDate;
    if (year - bookRealeseYear <= 1) return "New publish!";
    if (year - bookRealeseYear >= 10) return "Vetren Book";
  };

  getBookCategories = () => {
    return this.state.book.categories.join(",");
  };

  getCurrencySymbole = () => {
    let symbol = "";
    switch (this.state.book.listPrice.currencyCode) {
      case "EUR":
        symbol = "€";
        break;
      case "ILS":
        symbol = "₪";
        break;
      case "USD":
        symbol = "$";
        break;
    }
    return symbol;
  };

  markPrice = () => {
    const bookPrice = this.state.book.listPrice.amount;
    if (bookPrice > 150) return "over-priced";
    if (bookPrice < 20) return "cheap";
  };

  onReviewAdded = (book) => {
    this.setState({ book })
  }



  onRemoveReview = (review) => {
    console.log('review.id', review);
    bookService.removeReview(this.state.book, review)
      .then(this.loadBook())
  };

  getTxt = () => {
    let { description } = this.state.book
    if (!description) return
    if (description.length > 100) {
      description = this.state.isReadMore ? description : description.substring(0, 100) + "...";
    }
    return description
  }

  render() {
    const { book } = this.state;
    if (!book) return <Loader />;
    const { reviews } = book;
    return (
      <article className='book-container container'>
        <img className='img-details' src={book.thumbnail} alt='' />
        <div className='book-desc'>
          <h2>{book.title}</h2>
          <small>{book.subtitle}</small>
          <h3 className='authors-names'>
            {book.authors.map((author) => (
              <span key={author}>{author}</span>
            ))}
          </h3>
          <hr />
          <div className="book-desc">
            <label htmlFor='bookDesc'>About this book:</label>
            <p>{this.getTxt()}</p>
            <LongTxt txt={book.description} />
            <hr />
          </div>
          <div className='page-count'>{this.getPageCount()}</div>
          <div className='boo-age'>{this.getHowOld()}</div>
          <div className='book-categories'>
            <small>categories: {this.getBookCategories()}</small>
          </div>
          {book.listPrice.isOnSale && (
            <p className='sale'>This book is on sale</p>
          )}
          <p className={this.markPrice()}>
            {book.listPrice.amount} {this.getCurrencySymbole()}
          </p>
          <button onClick={this.onCloseModal}>Close</button>
        </div>
        <Route component={ReviewAdd} path='/book/read/:bookId/add-review' />
        <div>
          <div className="review-section">
            <Link to={`/book/read/${book.id}/add-review`}>Add review</Link>
          </div>
          <div className="review-display">
            <h2>Reviews</h2>
            {!reviews ? (
              <h4>No reviews yet</h4>
            ) : (
              <div className='show-reviews'>
                <div>Name</div>
                <div>Rate</div>
                <div>Date</div>
                <div>Review</div>
                <div>Delete review</div>
                <ReviewList reviews={reviews} removeReview={this.onRemoveReview} />
              </div>
            )}
          </div>
        </div>
        <div className="nav-btns">
          <Link to={`/book/read/${bookService.getPrevBookId(book.id)}`}>Previews</Link>
          <Link to={`/book/read/${bookService.getNextBookId(book.id)}`}>Next</Link>
        </div>
      </article>
    );
  }
}


window.BookDetails = BookDetails