import React from 'react';
import {Row, Col, Card} from 'antd';
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
	Upload
}
from 'antd';
import MobileHeader from './mobile_header';
import MobileFooter from './mobile_footer';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

export default class MobileUserCenter extends React.Component {
	constructor() {
		super();
		this.state = {
			usercollection: '',
			usercomments: '',
			previewImage: '',
			previewVisible: false
		};
	}

	componentDidMount() {
		const myFetchOptions = {
			methon: 'GET',
			header: {
				'Access-Control-Allow-Origin':'*'
			}
		};

		let collectionUrl = 'http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=' + localStorage.userId;
		let commentsUrl = 'http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=' + localStorage.userId;

		fetch(collectionUrl, myFetchOptions)
			.then(response => response.json())
			.then(json => {
				this.setState({usercollection: json});
			});

		fetch(commentsUrl, myFetchOptions)
			.then(response => response.json())
			.then(json => {
				this.setState({usercomments: json});
			});
	};

	// 控制模态框显示
	setModalVisible(value) {
		this.setState({previewVisible: value});
	}

	render() {
		const props = {
			action: '//jsonplaceholder.typicode.com/posts/',
			headers: {
				authorization: 'authorization-text',
				'Access-Control-Allow-Origin': '*'
			},
			listType: 'picture-card',
			defaultFileList: [
				{
					uid: -1,
					name: 'xxx.png',
					state: 'done',
					url: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
					thumbUrl: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png'
				}
			],
			onPreview: (file) => {
				this.setState({previewImage: file.url || file.thumbUrl, previewVisible: true});
			}
		};

		const {usercollection,usercomments} = this.state;
		const collectionsData = usercollection.length ? usercollection.filter((item) => (item.Title)) : null;
		const usercollectionList = collectionsData ?
			collectionsData.map((uc,index)=>(
					<Card key={index} title={uc.uniquekey} extra={<a target="_blank" href={`/#/details/${uc.uniquekey}`}>查看</a>} className="card-comments">
						<p>{uc.Title}</p>
					</Card>
			))
			: '您还没有收藏任何的新闻，快去收藏一些新闻吧。';

		const commentsData = usercomments.length ? usercomments.filter((item) => (item.Comments)) : null;
		const usercommentsList = commentsData ?
			commentsData.map((comment,index)=>(
					<Card key={index} title={`于 ${comment.datetime} 评论了文章 ${comment.uniquekey}`} extra={<a target="_blank" href={`/#/details/${comment.uniquekey}`}>查看</a>} className="card-comments">
						<p>{comment.Comments}</p>
					</Card>
			))
			: '您还没有发表过任何评论。';

		return (
			<div>
				<MobileHeader />
				<Row>
					<Col span={24}>
						<Tabs>
							<TabPane tab="收藏列表" key="1">
								{usercollectionList}
							</TabPane>
							<TabPane tab="评论列表" key="2">
								{usercommentsList}
							</TabPane>
							<TabPane tab="头像设置" key="3">
								<div className="clear-fix">
									<Upload {...props}>
										<Icon type="upload" />
										<div className="ant-upload-text">上传图片</div>
									</Upload>
									<Modal visible={this.state.previewVisible} footer={null} onCancel={this.setModalVisible.bind(this, false)}>
										<img src={this.state.previewImage} alt="预览" />
									</Modal>
								</div>
							</TabPane>
						</Tabs>
					</Col>
				</Row>
				<MobileFooter />
			</div>
		);
	}
}