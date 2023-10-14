import React, { ChangeEvent, FC, useRef, useState } from 'react'
import Editor from '@uiw/react-textarea-code-editor'
import jsonFormat from 'json-format'
interface IProps {
  code: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}
export const CodeEditor: FC<IProps> = ({
  code,
  onChange,
  onDrop,
  draggedItem,
}) => {
  const editorRef = useRef()

  const handleDrop = (e, data) => {
    e.preventDefault()

    const editor = editorRef.current
    editor.focus()

    const droppedItem = draggedItem

    const startPos = editor.selectionStart
    const endPos = editor.selectionEnd

    const oldCode = jsonFormat(code, { type: 'space', size: 2 })

    const label = JSON.stringify(droppedItem.label)

    const newCode =
      oldCode.substring(0, startPos) + `[${label}]` + oldCode.substring(endPos)

    onChange({ target: { value: newCode } })
  }

  const allowDrop = e => {
    e.preventDefault()
  }

  const handleDragStart = e => {
    editorRef.current.focus()
    e.preventDefault()
  }

  return (
    <>
      {' '}
      <div className='w-tc-editor-var'> </div>
      <Editor
        className='code-editor'
        value={jsonFormat(code, { type: 'space', size: 2 })}
        language='json'
        placeholder='Please enter code.'
        onChange={onChange}
        onDragStart={handleDragStart}
        data-color-mode='dark'
        onDrop={handleDrop}
        onDragOver={allowDrop}
        ref={editorRef}
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
