import React from 'react';
import { Row, Card } from 'antd';
import Header from './header';
import List from './list';
import Footer from './footer';
import appStyle from './app';
import withStyles from 'isomorphic-style-loader/withStyles';
import compose from '@/utils/compose';
import {connect} from 'react-redux';
import {
  deleteTodoAction,
  changeTodoStatusAction,
  addTodoActionSync
} from '@/common/store/actions';
import SSRDataContext from '@/common/context';

class App extends React.Component {

  static contextType = SSRDataContext;

  componentDidMount() {
    console.log(this.context, 'context....');
    fetch('/api/v1/list')
      .then(res => res.json())
      .then(res => {
        console.log(res);
        const { success, data, message } = res;
        if (success) {
          // this.props.addTodoActionSync()
          data.forEach(item => {
            this.props.addTodoActionSync({
              content: item.content
            });
          });
        } else {
          console.error(message);
        }

      });
  }

  render() {
    return (
      <div className="app-container">
        <div className="inner-box" style={{ width: '80vw' }}>
          <Row>
            <Card style={{ width: '100%' }} title={<Header/>}>
              <List />
            </Card>
          </Row>
          <Row>
            <Footer />
          </Row>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    todoList: state.todoList
  };
};

const mapDispatchToProps = (dispatch) => ({
  deleteTodoAction: (index) => dispatch(deleteTodoAction(index)),
  changeTodoStatusAction: (index) => dispatch(changeTodoStatusAction(index)),  
  addTodoActionSync: (payload) => dispatch(addTodoActionSync(payload)),
});
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(appStyle)
)(App);
