'use client'

import { FC } from 'react'
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';

interface EditorContentRenderProps {
    operations: any[];
}

const EditorContentRender: FC<EditorContentRenderProps> = ({ operations }) => {
    const converter = new QuillDeltaToHtmlConverter(operations);
    const content = converter.convert();

    return <div dangerouslySetInnerHTML={{ __html: content }} />
}

export default EditorContentRender