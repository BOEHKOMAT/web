import React, { Component } from 'react';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { postComment, postFeedback, fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';


const mapStateToProps = state => {
   return {
      dishes: state.dishes,
      comments: state.comments,
      promotions: state.promotions,
      leaders: state.leaders
   }       
}

const mapDispatchToProps = (dispatch) => ({
   postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
   postFeedback: (feedback) => dispatch(postFeedback(feedback)),
   fetchDishes: () => {dispatch(fetchDishes())},
   resetFeedbackForm: () => {dispatch(actions.reset('feedback'))},
   fetchComments: () => {dispatch(fetchComments())},
   fetchPromos: () => {dispatch(fetchPromos())},
   fetchLeaders: () => {dispatch(fetchLeaders())}
});
    
class Main extends Component {
   constructor(props) {
      super(props);
   }
   
   componentDidMount() {
      this.props.fetchDishes();
      this.props.fetchComments();
      this.props.fetchPromos();
      this.props.fetchLeaders();
   }
   
   render() {
      
      const DishWithId = ({match}) => {
         return (
            <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
                        isLoading={this.props.dishes.isLoading} errMess={this.props.dishes.errMess}
            comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))}
                        commentsErrMess={this.props.comments.errMess} postComment={this.props.postComment} />
         );
      }
   
      return (
         <div>
            <Header />
                  <Switch>
                     <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />} />
                     <Route path="/menu/:dishId" component={DishWithId} />
                     <Route exact path="/contactus" component={() => <Contact postFeedback={this.props.postFeedback} resetFeedbackForm={this.props.resetFeedbackForm} />} />
                     <Redirect to="/menu" />
                  </Switch>
         </div>
      );
   }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));