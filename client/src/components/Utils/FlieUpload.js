import React from 'react'
import Dropzone from 'react-dropzone'
import { Icon } from 'antd';
import axios from 'axios';

function FlieUpload() {

    const dropHandler = (files) => {

        let formData = new FormData();
        // server 오류 처리
        const config = {
            header: { 'content-type': 'multipart/fomr-data' }
        }
        formData.append("file", files[0])

        axios.port('api/product/image', formData, config)
            .then(response => {
                if(response.data.success) {

                } else {
                    alert('파일을 저정하는데 실패했습니다.')
                }
            })
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
    </div>
  )
}

export default FlieUpload