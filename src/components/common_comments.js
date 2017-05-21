import React from 'react';
import {Router, Route, Link, browserHistory} from 'react-router';
import {Row, Col} from 'antd';
import {
	Menu,
	Icon,
	Tabs,
	message,
	Form,
	Input,
	Button,
	CheckBox,
	Modal,
	Card,
	notification
}
from 'antd';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

class CommonComments extends React.Component {
	constructor() {
		super();
		this.state = {
			comments: ''
		};
	}

	componentDidMount() {
		let myFetchOptions = {
			methon: 'GET',
			header: {
				'Access-Control-Allow-Origin':'*'
			}
		};
		let url = 'http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=' + this.props.uniquekey;
		fetch(url, myFetchOptions)
			.then(response => response.json())
			.then(json => this.setState({
				comments: json
			}));
	}

	handleSubmit(e) {
		e.preventDefault();
		let myFetchOptions = {
			methon: 'GET'
		};
		let formData = this.props.form.getFieldsValue();
		let url = 'http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=' + localStorage.userId + '&uniquekey=' + this.props.uniquekey + '&commnet=' + formData.remark;
		fetch(url, myFetchOptions)
			.then(response => response.json())
			.then(json => {
				this.componentDidMount();
			});
	}

	addUserCollection() {
		let myFetchOptions = {
			method: 'GET'
		};
		let url = 'http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid=' + localStorage.userId + '&uniquekey=' + this.props.uniquekey;
		fetch(url, myFetchOptions)
			.then(response => response.json())
			.then(json => {
				//收藏成功以后进行一下全局的提醒
				notification['success']({message: 'ReactNews提醒', description: '收藏此文章成功'});
			});
	};

	render() {
		const {getFieldDecorator} = this.props.form;
		const {comments} = this.state;
		const commentsData = comments.length ? comments.filter((item) => (item.Comments)) : null;
		const commnetList = commentsData
			? commentsData.map((comment, index) => (
				<Card key={index} title={comment.UserName} extra={<span>发布于：{comment.datetime}</span>} className="card-comments">
					<p>{comment.Comments}</p>
				</Card>
			))
			: '没有加载到任何评论';

		return (
			<Row>
				<Col span={24}>
					{commnetList}
					<Form onSubmit={this.handleSubmit.bind(this)} className="form-comments">
						<FormItem label="您的评论">
							{getFieldDecorator('remark')(<Input type="textarea" placeholder="请写出您的评论" />)}
						</FormItem>
						<Button type="primary" htmlType="submit">提交评论</Button>
						<Button type="primary" htmlType="button" onClick={this.addUserCollection.bind(this)} className="float-right">收藏文章</Button>
					</Form>
				</Col>
			</Row>
		);
	}
}

export default CommonComments = Form.create({})(CommonComments);