import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { StorageReference, getDownloadURL, listAll, ref } from 'firebase/storage'
import { storage } from '../../firebase/config'
import { Avatar, Card, Space } from 'antd'
import {
    SettingOutlined,
    EditOutlined,
    EllipsisOutlined
  } from '@ant-design/icons';

const MusicListing = () => {
    const {currentUser} = useContext(AuthContext)

    const [fileList, setFileList] = useState<any>([])
    const [fileDetails, setFileDetails] = useState<StorageReference[]>()
      const fetchAllFiles = async() => {  
            const listRef = ref(storage, `music/${currentUser.user.uid}`);
            const result = await listAll(listRef)
            
            const zz = result.items
            setFileDetails(zz)
            const urlPromises = result.items.map((imageRef) => getDownloadURL(imageRef));
            return Promise.all(urlPromises);
      }
    
      console.log(fileDetails?.map((file)=> {
        return file.name
      }));
      
      
      const loadFiles = async () => {
        const urls = await fetchAllFiles();
        setFileList(urls);
      };
     
      useEffect(()=> {
        loadFiles()
        // eslint-disable-next-line
      },[])
      const { Meta } = Card;


  return (
    <div style={{  width:'100%', display: 'flex', flexWrap: "wrap", justifyContent: 'space-around'}}>
    <Space direction="vertical">
     <Space wrap>
       {fileList.map((url: string) => 
         <Card
             style={{width: '300px', margin: '20px'}}
             cover={
               <audio
                 controls
                 src={url}
               />
             }
             actions={[
               <SettingOutlined key="setting" />,
               <EditOutlined key="edit" />,
               <EllipsisOutlined key="ellipsis" />,
             ]}
           >
             <Meta
               avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}
               title={"Card title"}
               description="This is the description"
             />
           </Card>
       )}  
    </Space>
   </Space>
   </div>
  )
}

export default MusicListing