'use client'

import { useEffect } from 'react'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import ImageExtension from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import Color from '@tiptap/extension-color'
import { TextStyle } from '@tiptap/extension-text-style'
import styles from './RichTextEditor.module.scss'

const RichTextEditor = ({ value, onChange }) => {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Underline,
      ImageExtension,
      Link.configure({ openOnClick: false }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Placeholder.configure({ placeholder: 'Write your post content here...' }),
      TextStyle,
      Color,
    ],
    content: value || '',
    onUpdate: ({ editor: currentEditor }) => {
      onChange(currentEditor.getHTML())
    },
  })

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || '', false)
    }
  }, [editor, value])

  if (!editor) return null

  const setLink = () => {
    const url = window.prompt('Enter URL')
    if (url) editor.chain().focus().setLink({ href: url }).run()
  }

  const setImage = () => {
    const url = window.prompt('Enter image URL')
    if (url) editor.chain().focus().setImage({ src: url }).run()
  }

  return (
    <div className={styles.richEditorWrapper}>
      <div className={styles.toolbar} role="toolbar" aria-label="Text formatting">
        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? styles.active : ''}>B</button>
        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? styles.active : ''}>I</button>
        <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()} className={editor.isActive('underline') ? styles.active : ''}>U</button>
        <button type="button" onClick={() => editor.chain().focus().toggleStrike().run()} className={editor.isActive('strike') ? styles.active : ''}>S</button>
        <span className={styles.divider} />
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={editor.isActive('heading', { level: 1 }) ? styles.active : ''}>H1</button>
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={editor.isActive('heading', { level: 2 }) ? styles.active : ''}>H2</button>
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={editor.isActive('heading', { level: 3 }) ? styles.active : ''}>H3</button>
        <span className={styles.divider} />
        <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor.isActive('bulletList') ? styles.active : ''}>• List</button>
        <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={editor.isActive('orderedList') ? styles.active : ''}>1. List</button>
        <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={editor.isActive('blockquote') ? styles.active : ''}>" Quote</button>
        <button type="button" onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={editor.isActive('codeBlock') ? styles.active : ''}>Code</button>
        <span className={styles.divider} />
        <button type="button" onClick={() => editor.chain().focus().setTextAlign('left').run()}>Left</button>
        <button type="button" onClick={() => editor.chain().focus().setTextAlign('center').run()}>Center</button>
        <button type="button" onClick={() => editor.chain().focus().setTextAlign('right').run()}>Right</button>
        <span className={styles.divider} />
        <button type="button" onClick={setLink}>Link</button>
        <button type="button" onClick={setImage}>Image</button>
        <span className={styles.divider} />
        <button type="button" onClick={() => editor.chain().focus().undo().run()}>↩ Undo</button>
        <button type="button" onClick={() => editor.chain().focus().redo().run()}>↪ Redo</button>
      </div>
      <EditorContent editor={editor} className={styles.editorContent} />
    </div>
  )
}

export default RichTextEditor
