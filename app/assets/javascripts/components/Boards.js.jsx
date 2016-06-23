class Boards extends React.Component {
	constructor(props) {
		super(props);
		this.state = {boards: props.boards, show: false, edit :false}
		this.deleteBoard = this.deleteBoard.bind(this)
		this.showBoard = this.showBoard.bind(this)
		this.boardBack = this.boardBack.bind(this)
		this.toggleEdit = this.toggleEdit.bind(this)
	}

	addBoard(board) {
		this.setState({boards: [{...board}, ...this.state.boards] })
	}

	showBoard(board){
		this.setState({show: true, board})
	}

	toggleEdit(){
		this.setState({ edit: !this.state.edit })
	}

	deleteBoard(id){
		$.ajax({
			url: `/boards/${id}`,
			type: 'DELETE',
			dataType: 'JSON'
		}).done( data => {
			let boards = this.state.boards;
			let index = boards.findIndex(x => x.id === id);
			this.setState({
				boards: [
					...boards.slice(0,index), 
					...boards.slice(index+1, boards.length)
				]
			});

		}).fail(data => {
			alert('Board did not delete');
		});
	}

	boardBack(){
		this.setState({show: false})
	}

	render() {
		if(this.state.show) {
			// render the show html
      let board = this.state.board;
			return(
				<div>
					<h3>{this.state.board.name}</h3>
					<i>{this.state.board.description}</i>
					<div>
						<button className='btn' onClick={this.boardBack}>Back</button>
					</div>
					<hr />
					<Lists boardId={board.id} />
				</div>
			);
		} else {
			let boards = this.state.boards.map(board => {
				return(<Board key={`board-${board.id}`} {...board} deleteBoard={this.deleteBoard} showBoard={this.showBoard} toggleEdit={this.toggleEdit}/>);
			});
			return(
				<div> 
					<NewBoard addBoard={this.addBoard.bind(this)}/>
					<div className='row'>
					{boards}
					</div>
				</div>
			)
		}
	}
}