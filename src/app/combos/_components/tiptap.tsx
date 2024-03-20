import Document from '@tiptap/extension-document';
import ListItem from '@tiptap/extension-list-item';
import OrderedList from '@tiptap/extension-ordered-list';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import { EditorContent, useEditor } from '@tiptap/react';
import { Dispatch, SetStateAction } from 'react';
import Bold from '@tiptap/extension-bold';

export const Tiptap = ({
  setter,
}: {
  setter: Dispatch<SetStateAction<string>>;
}) => {
  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Bold,
      OrderedList.configure({
        HTMLAttributes: {
          class: 'list-decimal',
        },
      }),
      ListItem,
    ],
    onCreate: ({ editor }) => {
      editor.commands.toggleOrderedList();
    },
    onUpdate: ({ editor }) => {
      if (!editor.isActive('orderedList')) {
        editor.commands.toggleOrderedList();
      }
      setter(JSON.stringify(editor.getJSON().content));
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="border-2 border-white w-full h-full">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'is-active' : ''}
      >
        toggleBold
      </button>
      <EditorContent editor={editor} />
    </div>
  );
};
