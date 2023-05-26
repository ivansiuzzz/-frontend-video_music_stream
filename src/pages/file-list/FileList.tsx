import {  storage } from '../../firebase/config'
import { useContext, useEffect, useState } from 'react'
import {  StorageReference, getDownloadURL, listAll, ref } from "firebase/storage";
import { Avatar, Card, Space } from 'antd';
import { AuthContext } from '../../context/AuthContext';
import {
  SettingOutlined,
  EditOutlined,
  EllipsisOutlined
} from '@ant-design/icons';

function FileList() {
const {currentUser} = useContext(AuthContext)

const [fileList, setFileList] = useState<any>([])
const [fileDetails, setFileDetails] = useState<StorageReference[]>()
  const fetchAllFiles = async() => {  
        const listRef = ref(storage, `images/${currentUser.user.uid}`);
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
                <video
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

export default FileList  

/*   
const [file, setFile] = useState<any>(null)
const handleImageChange = (e: any) => {
    if (e.target.files[0]) {
        setFile(e.target.files[0]);
    }
  };

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
      })
      .catch((err: string) => {
        message.error(err)
      });
  };

  console.log(currentUser.user.uid);
const favouriteStockCollectionRef = collection(db, "favoriteStock")
()=>onAddFavouriteStock("0001.hk")
const onAddFavouriteStock =async (stockNumber: string) => {
        try {
            await addDoc(favouriteStockCollectionRef, {
                stockNumber: stockNumber,
                userId: auth?.currentUser?.uid
            })
            alert("successfully added stock to favorites")
        }catch(err){
            alert(err)
        }
  } */