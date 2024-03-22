import Document from '@tiptap/extension-document';
import ListItem from '@tiptap/extension-list-item';
import OrderedList from '@tiptap/extension-ordered-list';
import Paragraph from '@tiptap/extension-paragraph';
import Underline from '@tiptap/extension-underline';
import Text from '@tiptap/extension-text';
import { EditorContent, useEditor } from '@tiptap/react';
import { Dispatch, SetStateAction } from 'react';
import Bold from '@tiptap/extension-bold';
import { Toggle } from '../../../components/ui/toggle';
import { Bold as BoldIcon, Underline as UnderlineIcon } from 'lucide-react';

export const Tiptap = ({
  setter,
}: {
  setter: Dispatch<SetStateAction<string>>;
}) => {
  const editor = useEditor({
    editorProps: {
      attributes: {
        class: 'min-h-[150px] no_focus',
      },
    },
    extensions: [
      Document,
      Underline,
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
    <>
      <div className="focus-within:border-white border-2 rounded gap-1 flex flex-col px-2 w-full border-border">
        <div className="border-b p-1 f flex gap-1 border-border">
          <Toggle
            size="sm"
            pressed={editor.isActive('bold')}
            onPressedChange={() => editor.chain().focus().toggleBold().run()}
          >
            <BoldIcon />
          </Toggle>
          <Toggle
            size="sm"
            pressed={editor.isActive('underline')}
            onPressedChange={() =>
              editor.chain().focus().toggleUnderline().run()
            }
          >
            <UnderlineIcon />
          </Toggle>
        </div>
        <EditorContent spellCheck="false" editor={editor} />
      </div>
    </>
  );
};
