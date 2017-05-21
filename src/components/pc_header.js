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
	Modal
}
from 'antd';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

class PCHeader extends React.Component {

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
			header: new Headers({
				mode: 'cors',
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
				'Access-Control-Allow-Origin':'*'
			})
		};
		let formData = this.props.form.getFieldsValue();
		let url = 'http://newsapi.gugujiankong.com/Handler.ashx?action=' + this.state.action + '&username=' + formData.userName + '&password=' + formData.password + '&r_userName=' + formData.r_userName + '&r_password=' + formData.r_password + '&r_confirmPassword=' + formData.r_confirmPassword;
		fetch(url, myFetchOptions)
			.then(response => response.json())
			.then(json => {
				this.setState({
					userNickName: json.NickUserName,
					userId: json.UserId
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

	logout() {
		localStorage.userId = '';
		localStorage.userNickName = '';
		this.setState({hasLogined: false});
	}

	render() {
		const {getFieldDecorator} = this.props.form;
		const userShow = this.state.hasLogined
		?
		<Menu.Item key="logout" className="register">
			<Button type="primary" htmlType="button">{this.state.userNickName}</Button>
			&nbsp;&nbsp;
			<Link target="_blank" to={`usercenter`}>
				<Button type="dashed" htmlType="button">个人中心</Button>
			</Link>
			&nbsp;&nbsp;
			<Button type="ghost" htmlType="button" onClick={this.logout.bind(this)}>退出</Button>
		</Menu.Item>
		:
		<Menu.Item key="register" className="register">
			<Icon type="appstore" />注册/登录
		</Menu.Item>;

		return ( 
			<header>
			 	<Row>
					<Col span={2}></Col>
					<Col span={4}>
						<a href="/" className="logo">
							<img src="./src/images/logo.png" alt="logo" />
							<span>React News</span>
						</a>
					</Col>
					<Col span={16}>
						<Menu mode="horizontal" onClick={this.handleClick.bind(this)} selectedKeys={[this.state.current]}>
							<Menu.Item key="top">
								<Icon type="appstore" />头条
							</Menu.Item>
							<Menu.Item key="shehui">
								<Icon type="appstore" />社会
							</Menu.Item>
							<Menu.Item key="keji">
								<Icon type="appstore" />科技
							</Menu.Item>
							<Menu.Item key="guonei">
								<Icon type="appstore" />国内
							</Menu.Item>
							<Menu.Item key="guoji">
								<Icon type="appstore" />国际
							</Menu.Item>
							<Menu.Item key="yule">
								<Icon type="appstore" />娱乐
							</Menu.Item>
							<Menu.Item key="tiyu">
								<Icon type="appstore" />体育
							</Menu.Item>
							<Menu.Item key="shishang">
								<Icon type="appstore" />时尚
							</Menu.Item>
							{userShow}
						</Menu>
					</Col>
					<Col span={2}></Col>
				</Row>
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
			</header>
		);
	}
}

export default PCHeader = Form.create({})(PCHeader);