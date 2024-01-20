import { useState } from 'react';
import './ExportWindow.css'

function ExportWindow () {
    const [filename, setFilename] = useState('');
    const [filetype, setFiletype] = useState('png');

    const fileOptions = ['png', 'jpeg']

    // Create the file type option buttons
    const getFileOptions = (): JSX.Element => {
        return (
            <div className='file-options__button-container'>
            {
                fileOptions.map((typename: string): JSX.Element => {
                    let name = `file-options__button 
                        ${(typename == filetype)? 'selected' : ''}`
                    return (
                        <div 
                            className={name}
                            onClick={() => setFiletype(typename)}
                        >
                            {typename.toUpperCase()}
                        </div>
                    )
                })
            }
            </div>
        )
    }

    // Sends export message to renderer
    const exportImage = () => {
        let data = {
            filename: filename,
            filetype: filetype
        }
        window.electronAPI.exportImage(data)
    }

    return (
        <div className='export-window__container'>
            <div className='text-input__container'>
                <label className='text-input__label'>Filename:</label>
                <input 
                    className='text-input__input'
                    type='text' 
                    value={filename}
                    onChange={(e) => setFilename(e.target.value)}
                ></input>
            </div>
            <div className='file-options__container'>
                <div className='file-options__label'>File Type:</div>
                {getFileOptions()}
            </div>
            <div 
                className='export-button'
                onClick={() => exportImage()}
            >
                Export Image
            </div>
        </div>
    );
}

export default ExportWindow;