const { Link } = ReactRouterDOM

export class Home extends React.Component {

    render() {
        return (
            <section className="home">
                <h1>Welcome</h1>
                <h2>What do you want to do?</h2>
                <div className="img-container">

                    <img src="https://img.freepik.com/free-vector/email-envelope-concept_34259-135.jpg?size=338&ext=jpg"></img>
                    <img src="https://www.freevector.com/uploads/vector/preview/30222/Stack-of-Books-Clipart.jpg"></img>
                    <img src="https://img.freepik.com/free-vector/adhesive-notes-with-pin-clip-scotch_1284-43035.jpg?size=338&ext=jpg"></img>

                </div>

            </section>
        )
    }
}