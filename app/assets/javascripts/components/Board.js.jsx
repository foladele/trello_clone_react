class Board extends React.Component{
	constructor(props) {
		super(props);
	}

  edit() {
    let board = this.props
    return(
      <form className="container" ref="editUser" onSubmit={this.handleSubmit.bind(this)}>
        <input ref="name" placeholder="name" required={true} defaultValue={board.name} />
        <input ref="description" placeholder="description" defaultValue={board.description} />
        <button type="submit" className="btn">Save</button>
      </form>
    )
  }


	render() {

    if(this.props.edit)
    {
      return this.edit()
    } else {
  		return(
        <div>
          <div className="col s12 m6" onClick={() => this.props.showBoard(this.props)}>
            <div className="card blue-grey darken-1">
              <div className="card-content white-text">
                <span className="card-title">{this.props.name}</span>
                <p>{this.props.description}</p>
              </div>
              <div className="card-action">
                <button className="btn" onClick={() => this.props.toggleEdit}>Edit</button>
                <button className="btn red" onClick={() => this.props.deleteBoard(this.props.id)}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )
  	}
  }
}