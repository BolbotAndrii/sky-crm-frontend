import React, { ChangeEvent, FC } from 'react'
import Editor from '@uiw/react-textarea-code-editor'


interface IProps {
  code: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}
export const CodeEditor: FC<IProps> = ({ code, onChange }) => {
  return (
    <>
      {' '}
      <div className='w-tc-editor-var'> </div>
      <Editor
        value={code}
        language='json'
        placeholder='Please enter code.'
        onChange={onChange}
        data-color-mode='dark'
        padding={15}
        minHeight={200}
        style={{
          fontSize: 12,
          borderRadius: '10px',
          minHeight: '200px',
          fontFamily:
            'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
        }}
      />
    </>
  )
}
