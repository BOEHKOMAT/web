import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, Button, Label, Col, Row } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

class CommentForm extends Component {
   
   constructor(props) {
	  super(props);
	  
	  this.state = {
		 isModalOpen: false
	  }
	  
	  this.toggleModal = this.toggleModal.bind(this);
	  this.handleSubmit = this.handleSubmit.bind(this);
   }
   
   toggleModal() {
	  this.setState({ isModalOpen: !this.state.isModalOpen });
   }
   
   handleSubmit(values) {
	  this.toggleModal();
	  this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
   }
   
   render() {
	  return(
		 <div className="container">
			<div className="row">
			   <Button outline onClick={this.toggleModal}>
				  <span className="fa fa-pencil fa-lg"></span> Submit Comment
			   </Button>
						   
			   <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
				  <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
				  <ModalBody>
					 <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
						<Row className="form-group">
						   <Col md={12}>
							  <Label htmlFor="rating">Rating</Label>
							  <Control.select model=".rating" name="rating" className="form-control">
								 <option>1</option>
								 <option>2</option>
								 <option>3</option>
								 <option>4</option>
								 <option>5</option>
							  </Control.select>
						   </Col>						   
						</Row>
						<Row className="form-group">
						   <Col md={12}>
							  <Label htmlFor="author">Your Name</Label>
							  <Control.text model=".author" id="author" name="author" placeholder="Your Name" className="form-control" 
							   validators={{
								  required, minLength: minLength(3), maxLength: maxLength(15)
							   }}
							  />	
							  <Errors
								 className="text-danger"
								 model=".author"
								 show="touched"
								 messages={{
									required: 'Required',
									minLength: 'Must be greater than 2 characters',
									maxLength: 'Must be 15 characters or less'
								 }}
							  />							
						   </Col>
						</Row>
						<Row className="form-group">
						   <Col md={12}>
							  <Label htmlFor="comment">Comment</Label>
							  <Control.textarea model=".comment" id="comment" name="comment" rows="6" className="form-control" />							
						   </Col>
						</Row>
						<Row className="form-group">
						   <Col md={12}>
							  <Button type="submit" color="primary">
								 Submit
							  </Button>
						   </Col>
						</Row>
					 </LocalForm>
				  </ModalBody>
			   </Modal>
			</div>
		</div>
	  );
   }
}

function RenderComments({comments, postComment, dishId}) {
   if (comments != null) {
	  return (
		 <div className="col-12 col-md-5 m-1">
			<h4>Comments</h4>
			<ul className="list-unstyled">
      		   {comments.map((comment) => {
				  return (
					 <li key={comment.id}>
					   <p>{comment.comment}</p>
					   <p>-- {comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
					 </li>
				  );
			   })}
			</ul>
			<CommentForm dishId={dishId} postComment={postComment} />
		 </div>
	  );
   }
   else {
	  return (
		 <div></div>
	  );
   }
}

const Dishdetail = (props) => {
   if (props.dish != null) {
	  return (
		 <div className="container">
			<div className="row">
			   <RenderComments comments={props.comments} postComment={props.postComment} dishId={props.dish.id} />
			</div>
		 </div>
	  );
   }
   else {
	  return (
		 <div></div> 
	  );
   }
}

export default Dishdetail;