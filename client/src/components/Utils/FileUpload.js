import React, { useState } from 'react'
import Dropzone from 'react-dropzone'
import { Icon } from 'antd';
import axios from 'axios';

function FileUpload(props) {

    const [Images, setImages] = useState([])
    
    const dropHandler = (files) => {
        let formData = new FormData();
        // server 오류 처리
        const config = {
            header: { 'content-type': 'multipart/fomr-data' }
        }
        formData.append("file", files[0])

        axios.post('/api/product/image', formData, config)
            .then(response => {
                if (response.data.success) {
                    // console.log(response.data)
                    // image upLoad 부분
                    setImages([...Images, response.data.filePath])
                    props.refreshFunction([...Images, response.data.filePath])

                } else {
                    alert('파일을 저정하는데 실패했습니다.')
                }
            })

    }

    const deleteHandler = (image) => {
        // start 0
        const currentIndex = Images.indexOf(image);
        let newImages = [...Images]
        // splice (스플라이스) 삭제 (스타트, 갯수, 추가, 추가 )  (1,1,2,3) 1번 지우고 2,3 채운다
        console.log("currentIndex",currentIndex);
        newImages.splice(currentIndex, 1)
        setImages(newImages)
        // images delet 하고 새로 지우고 데이터를 부모 원도우에게 전달
        props.refreshFunction(newImages)
    }


  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* file dlg */}
        {/* <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}> */}
        <Dropzone onDrop={dropHandler}>
            {({ getRootProps, getInputProps }) => (
                <section>
                    {/* image Load */}
                    <div 
                        style={{
                            width: 300, height: 240, border: '1px solid lightgray',
                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}
                        {...getRootProps()}>
                        <input {...getInputProps()} />
                        {/* icon 표시 */}
                        <Icon type="plus" style={{ fontSize: '3rem '}} />
                        {/* <p>Drag 'n' drop some files here, or click to select files</p> */}
                    </div>
                </section>
            )}
        </Dropzone>
        <div style={{ display: 'flex', width: '350px', height: '240px', overflowX: 'scroll' }}>
                {Images.map((image, index) => (
                    // click하면 지움
                    //<div key={index}>
                    <div onClick={() => deleteHandler(image)} key={index}>
                        <img style={{ minWidth: '300px', width: '300px', height: '240px' }}
                            src={`http://localhost:5000/${image}`}
                        />
                    </div>
                ))}
            </div>


    </div>
  )
}

export default FileUpload