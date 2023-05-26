import { Menu } from 'antd';
import './LeftMenu.css'
import { MenuProps } from 'antd/lib/menu';
import { HomeOutlined, CopyOutlined, HourglassOutlined, BgColorsOutlined, PlayCircleOutlined} from '@ant-design/icons';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';


type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[],
    theme?: 'light' | 'dark',
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      theme,
    } as MenuItem;
  }

export default function LeftMenu() {
  const [current, setCurrent] = useState('1');
  const navigate = useNavigate()
  const {currentUser} = useContext(AuthContext)
  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
    navigate(`/user/${currentUser?.user?.uid}/${e.key}`)
  };

  const items: MenuItem[] = [
    getItem('Home', 'fileList',  <HomeOutlined/>),
    getItem('Shorts', 'short', <HourglassOutlined />),
    getItem('Subscriptions', 'subscriptions', <CopyOutlined/>),
    getItem('Originals', 'originals', <BgColorsOutlined />),
    getItem('Youtube Music', 'music', <PlayCircleOutlined/>),
    { type: 'divider' },
    getItem('Library', 'library',  <HomeOutlined/>),
    getItem('Your Video', 'yourVideo', <HourglassOutlined />),
    getItem('Watch later', 'watchLater', <CopyOutlined/>),
    getItem('Download', 'download', <BgColorsOutlined />),
    getItem('Liked videos', 'likeVideo', <PlayCircleOutlined/>),
  ];
  
  return (<>
    <Menu
    onClick={onClick}
    selectedKeys={[current]}
    mode="vertical"
    items={items}
    getPopupContainer={(node) => node.parentNode as HTMLElement}
    >      
    </Menu>
    </>
  )
}




/* <Space style={{padding: '10px'}} direction="vertical">
     

          <hr/>

          <Button style={{width: '150px'}} type="text">
            <div>
              <CopyOutlined/>Library
            </div>
          </Button>

          <Button style={{width: '150px'}} type="text">
            <div>
              <CopyOutlined/>History
            </div>
          </Button>

          <Button style={{width: '150px'}} type="text">
            <div>
              <CopyOutlined/>Your Video
            </div>
          </Button>

          <Button style={{width: '150px'}} type="text">
            <div>
              <CopyOutlined/>Watch later
            </div>
          </Button>

          <Button style={{width: '150px'}} type="text">
            <div>
              <CopyOutlined/>Download 
            </div>
          </Button>

          <Button style={{width: '150px'}} type="text"> 
            <div>
              <CopyOutlined/>Liked videos 
            </div>
          </Button>

          <hr/>
          <Button style={{width: '150px'}} type="text">
            <div>
              <CopyOutlined/>Settings
            </div>
          </Button>

          <Button style={{width: '150px'}} type="text">
            <div>
              <CopyOutlined/>Report hist
            </div>
          </Button>

          <Button style={{width: '150px'}} type="text">
            <div>
              <CopyOutlined/>Liked videos 
            </div>
          </Button>

          <hr/>
          <Space direction="vertical">
            <Space wrap>
              <Button size='small' type="text">
                About
              </Button>
              <Button  size='small' type="text">
                About
              </Button>
              <Button  size='small' type="text">
                About
              </Button>
            </Space>
          </Space>
    </Space>   */