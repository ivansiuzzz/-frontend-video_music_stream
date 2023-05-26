import { Avatar, Button, Dropdown, Input, Modal, Space, message } from 'antd'
import { ChangeEvent, useContext, useState } from 'react'
import {
    PlayCircleTwoTone,
    EditTwoTone,
    NotificationOutlined,

  } from '@ant-design/icons';
import { AuthContext } from '../context/AuthContext';
import { MenuProps } from 'antd/lib/menu';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../firebase/config';
/* import Dragger from 'antd/es/upload/Dragger';
import {
  UploadOutlined
} from '@ant-design/icons';
import { UploadProps } from 'antd/lib/upload'; */

function Header() {  
 const { Search } = Input;
 const {currentUser} = useContext(AuthContext)
 const [modal1Open, setModal1Open ]= useState(false)
console.log({currentUser});
const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          1st menu item
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
          2nd menu item
        </a>
      ),
    },
    {
      key: '3',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
          3rd menu item
        </a>
      ),
    },
  ];

  const [file, setFile] = useState<any>(null)
  const [fileList,setFileList] = useState<any>([])
/* const handleImageChange = (e: any) => {
    if (e.target.files[0]) {
        setFile(e.target.files[0]);
    }
  }; */

  console.log({fileList});
  

  const handleSubmit = () => {
    const imageRef =  ref(storage, `/images/${currentUser.user.uid}/` + file?.name)
    uploadBytes(imageRef, file)
      .then(() => {
        getDownloadURL(imageRef)
          .then((url) => {
            setFileList((prev: any)=> [...prev, url]);
          })
          .catch((err: string) => {
            message.error(err)
          });
          setFile(null);
          message.success("Upload successfully")
          setModal1Open(false)
      })
      .catch((err: string) => {
        message.error(err)
      });
  };

  
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  return (
    
    <div style={{
        height: '50px', 
        padding: '0px 16px', 
        display: 'flex',      
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', 
        backgroundColor: 'black'
    }}>
   <Modal
    title="20px to Top"
    style={{ top: 20 }}
    open={modal1Open}
    onOk={handleSubmit}
    onCancel={() => {setModal1Open(false)}}
  >
      <input type="file" onChange={handleFileChange} />
    
  </Modal>

        <Button onClick={()=> {
        }} type="primary" icon={<PlayCircleTwoTone />} size={'large'} >
            Youtube
        </Button>    
        <Search placeholder="input search text" onSearch={()=>{}} style={{ width: "30%" }} />
        <div style={{
                display: 'flex',
                justifyContent: 'space-between',
        }}>
            
        <Space direction="vertical">
            <Space wrap>
                <Button type="primary" icon={<EditTwoTone />} size={'middle'} onClick={()=> setModal1Open(true)}>
                    Create
                </Button> 
                <Button type="primary" icon={<NotificationOutlined />} size={'middle'} >
                    Youtube
                </Button> 
                <Dropdown menu={{ items }} placement="bottomRight">
                    <Avatar  style={{ backgroundColor: "yellowgreen",  verticalAlign: 'middle' }} size="large">
                        I
                    {/*     {auth?.currentUser?.displayName?.charAt(0)} */}
                    </Avatar>
                </Dropdown>
            </Space>
        </Space>
        </div>
        
    </div>

  )
}

export default Header