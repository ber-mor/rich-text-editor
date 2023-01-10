import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useCallback } from "react";
import Document from "@tiptap/extension-document";
import Image from "@tiptap/extension-image";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import ImageIcon from "@mui/icons-material/Image";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import StrikethroughSIcon from "@mui/icons-material/StrikethroughS";
import CodeIcon from "@mui/icons-material/Code";
import TitleIcon from "@mui/icons-material/Title";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";
import Looks3Icon from "@mui/icons-material/Looks3";
import Looks4Icon from "@mui/icons-material/Looks4";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import TableChartIcon from '@mui/icons-material/TableChart';

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <>
      <FormatBoldIcon
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active" : "editor-icon"}
      />
      <FormatItalicIcon
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "is-active" : "editor-icon"}
      />
      <StrikethroughSIcon
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? "is-active" : "editor-icon"}
      />
      <CodeIcon
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={editor.isActive("code") ? "is-active" : "editor-icon"}
      />
      <TitleIcon
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive("paragraph") ? "is-active" : "editor-icon"}
      />
      <LooksOneIcon
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={
          editor.isActive("heading", { level: 1 }) ? "is-active" : "editor-icon"
        }
      />
      <LooksTwoIcon
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={
          editor.isActive("heading", { level: 2 }) ? "is-active" : "editor-icon"
        }
      />
      <Looks3Icon
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={
          editor.isActive("heading", { level: 3 }) ? "is-active" : "editor-icon"
        }
      />
      <Looks4Icon
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={
          editor.isActive("heading", { level: 4 }) ? "is-active" : "editor-icon"
        }
      />
      <FormatListBulletedIcon
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "is-active" : "editor-icon"}
      />
      <FormatListNumberedIcon
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "is-active" : "editor-icon"}
      />
      <FormatQuoteIcon
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive("blockquote") ? "is-active" : "editor-icon"}
      />
      <HorizontalRuleIcon
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        className="editor-icon"
      />

      <UndoIcon
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        className="editor-icon"
      />
      <RedoIcon
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        className="editor-icon"
      />
      <TableChartIcon
        onClick={() =>
          editor
            .chain()
            .focus()
            .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
            .run()
        }
        className="editor-icon"
      />
      <div
        className={
          editor.isActive("table") ? "is-table-selected" : "table-options"
        }
      >
        <button onClick={() => editor.chain().focus().addColumnBefore().run()}>
          Column Before
        </button>
        <button onClick={() => editor.chain().focus().addColumnAfter().run()}>
          Column After
        </button>
        <button onClick={() => editor.chain().focus().deleteColumn().run()}>
          Delete Column
        </button>
        <button onClick={() => editor.chain().focus().addRowBefore().run()}>
          Row Before
        </button>
        <button onClick={() => editor.chain().focus().addRowAfter().run()}>
          Row After
        </button>
        <button onClick={() => editor.chain().focus().deleteRow().run()}>
          Delete Row
        </button>
        <button onClick={() => editor.chain().focus().deleteTable().run()}>
          Delete Table
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeaderColumn().run()}
        >
          Toggle Header Column
        </button>
        <button onClick={() => editor.chain().focus().toggleHeaderRow().run()}>
          Toggle Header Row
        </button>
        <button onClick={() => editor.chain().focus().toggleHeaderCell().run()}>
          Toggle Header Cell
        </button>
        <button onClick={() => editor.chain().focus().mergeOrSplit().run()}>
          mergeOrSplit
        </button>
      </div>
    </>
  );
};

export default () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Document,
      Paragraph,
      Text,
      Image,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: `<h1>Hola</h1>`,
  });

  function printContent(){
    console.log(JSON.stringify(editor.getJSON()))
  }

  const addImage = useCallback(() => {
    const url = window.prompt("URL");

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div>
      <ImageIcon className="editor-icon" onClick={addImage} />
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};
