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
	Dropdown
}
from 'antd';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

class MobileHeader extends React.Component {
	constructor() {
		super();
		this.state = {
			current: 'top',
			modalVisible: false,
			action: 'login', // register or login
			hasLogined: false,
			userNickName: '',
			userId: 0
		};
	}

	componentWillMount() {
		if (localStorage.userId) {
			this.setState({
				userId: localStorage.userId,
				userNickName: localStorage.userNickName,
				hasLogined: true
			});
		}
	}

	// 控制模态框显示
	setModalVisible(value) {
		this.setState({modalVisible: value});
	}

	// 切换导航
	handleClick(e) {
		if (e.key == 'register') {
			this.setState({current: 'register'});
			this.setModalVisible(true);
		} else {
			this.setState({current: e.key});
		}
	}

	// 提交数据
	handleSubmit(e) {
		e.preventDefault();
		let myFetchOptions = {
			methon: 'GET',
			header: {
				'Access-Control-Allow-Origin':'*'
			}
		};
		let formData = this.props.form.getFieldsValue();
		let url = 'http://newsapi.gugujiankong.com/Handler.ashx?action=' + this.state.action + '&username=' + formData.userName + '&password=' + formData.password + '&r_userName=' + formData.r_userName + '&r_password=' + formData.r_password + '&r_confirmPassword=' + formData.r_confirmPassword;

		fetch(url, myFetchOptions)
			.then(response => response.json())
			.then(json => {
				this.setState({
					userNickName: json.NickUserName,
					userid: json.UserId
				});
				localStorage.userId = json.UserId;
				localStorage.userNickName = json.NickUserName;
			});

		if (this.state.action == 'login') {
			this.setState({hasLogined:true});
		}

		message.success('请求成功！');
		this.setModalVisible(false);
	}

	// 切换 tabs
	switchTabs(key) {
		if (key == 1) {
			this.setState({action: 'login'});
		} else if (key == 2) {
			this.setState({action: 'register'});
		}
	}

	// 登录
	login() {
		this.setModalVisible(true);
	}

	logout() {
		localStorage.userId = '';
		localStorage.userNickName = '';
		this.setState({hasLogined: false});
	}

	handleMenuClick(e) {
		if (e.key === '0') {
	      console.log('个人中心');
	    } else if (e.key === '1') {
	    	this.logout();
	    }
	}

	render() {
		const {getFieldDecorator} = this.props.form;

		const menu = (
		  <Menu onClick={this.handleMenuClick.bind(this)}>
		    <Menu.Item key="0">
		    	<Link to={`usercenter`}>个人中心</Link>
		    </Menu.Item>
		    <Menu.Item key="1">退出</Menu.Item>
		  </Menu>
		);

		const userShow = this.state.hasLogined
		?
		<Dropdown overlay={menu} trigger={['click']}>
		    <Icon type="inbox" />
	  	</Dropdown>
		:
		<Icon type="setting" onClick={this.login.bind(this)} />;

		return (
			<div id="mobile-header">
				<header>
					<img src="./src/images/logo.png" alt="logo" />
					<span>React News</span>
					{userShow}
				</header>
				<Modal title="用户中心" wrapClassName="vertical-center-modal" visible={this.state.modalVisible} onCancel={()=>this.setModalVisible(false)} onOk={()=>this.setModalVisible(false)} okText="关闭">
					<Tabs type="card" onChange={this.switchTabs.bind(this)}>
						<TabPane tab="登录" key="1">
							<Form layout="horizontal" onSubmit={this.handleSubmit.bind(this)}>
								<FormItem label="账户">
									{getFieldDecorator('userName')(<Input placeholder="请输入账号" />)}
								</FormItem>
								<FormItem label="密码">
									{getFieldDecorator('password')(<Input type="password" placeholder="请输入密码" />)}
								</FormItem>
								<Button type="primary" htmlType="submit">登录</Button>
							</Form>
						</TabPane>
						<TabPane tab="注册" key="2">
							<Form layout="horizontal" onSubmit={this.handleSubmit.bind(this)}>
								<FormItem label="账户">
									{getFieldDecorator('r_userName')(<Input placeholder="请输入账号" />)}
								</FormItem>
								<FormItem label="密码">
									{getFieldDecorator('r_password')(<Input type="password" placeholder="请输入密码" />)}
								</FormItem>
								<FormItem label="确认密码">
									{getFieldDecorator('r_confirmPassword')(<Input type="password" placeholder="请再次输入密码" />)}
								</FormItem>
								<Button type="primary" htmlType="submit">注册</Button>
							</Form>
						</TabPane>
					</Tabs>
				</Modal>
			</div>
		);
	}
}

export default MobileHeader = Form.create({})(MobileHeader);