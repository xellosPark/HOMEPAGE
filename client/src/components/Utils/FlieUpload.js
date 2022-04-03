import React from 'react'
import Dropzone from 'react-dropzone'
import { Icon } from 'antd';

function FlieUpload() {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* file dlg */}
        <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
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