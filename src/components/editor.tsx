"use client"

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import 'quill/dist/quill.snow.css';
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Page, Post } from "@prisma/client"
import { useForm } from "react-hook-form"
import TextareaAutosize from "react-textarea-autosize"
import * as z from "zod"

import "@/styles/editor.css"
import { cn } from "@/lib/utils"
import { pagePatchSchema } from "@/lib/validations/page"
import { buttonVariants } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"
import { Button } from './ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import Quill from 'quill';
import { useSocket } from '@/lib/providers/socket';
import { useSession } from 'next-auth/react';
import { editPage } from '@/actions/page';

interface EditorProps {
  page: Pick<Page, "id" | "number" | "content">
  post: Pick<Post, "title" | "id">
}

type FormData = z.infer<typeof pagePatchSchema>

const TOOLBAR_OPTIONS = [
  ['bold', 'italic', 'underline', 'strike'],
  ['image', 'blockquote', 'code-block'],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ script: 'sub' }, { script: 'super' }],
  [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
  [{ direction: 'rtl' }], // text direction

  [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ['clean'], // remove formatting button
];

export function Editor({ page, post }: EditorProps) {
  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(pagePatchSchema),
  })
  const saveTimerRef = useRef<ReturnType<typeof setTimeout>>();
  const router = useRouter()
  const [isSaving, setIsSaving] = React.useState<boolean>(false)
  const [collaborators, setCollaborators] = useState<
    { id: string; email: string; avatarUrl: string }[]
  >([]);
  const [localCursors, setLocalCursors] = useState<any>([]);
  const [quill, setQuill] = useState<Quill | null>(null);
  const { socket, isConnected } = useSocket();
  const { data: session } = useSession();

  useEffect(() => {
    if (quill === null || socket === null) return;
    const socketHandler = (content: any) => {
      quill.setContents(content)
      quill.enable()
    };

    socket.emit("create-room", page.id);
    socket.once('load-file', socketHandler);
  }, [quill, socket]);

  const wrapperRef = useCallback(async (wrapper: any) => {
    if (typeof window !== 'undefined') {
      if (wrapper === null) return;
      wrapper.innerHTML = '';
      const editor = document.createElement('div');
      wrapper.append(editor);
      
      const Quill = (await import('quill')).default;
      const QuillCursors = (await import('quill-cursors')).default;
      Quill.register('modules/cursors', QuillCursors);
      
      const q = new Quill(editor, {
        theme: 'snow',
        modules: {
          toolbar: TOOLBAR_OPTIONS,
          cursors: {
            transformOnTextChange: true,
          },
        },
      });
      q.disable()
      q.setText("Loading...")
      setQuill(q);
    }
  }, []);

  useEffect(() => {
    if (quill === null || socket === null || !localCursors.length)
      return;
    const socketHandler = (range: any, roomId: string, cursorId: string) => {
      if (roomId === page.id) {
        const cursorToMove = localCursors.find(
          (c: any) => c.cursors()?.[0].id === cursorId
        );
        if (cursorToMove) {
          cursorToMove.moveCursor(cursorId, range);
        }
      }
    };
    socket.on('receive-cursor-move', socketHandler);
    return () => {
      socket.off('receive-cursor-move', socketHandler);
    };
  }, [quill, socket, localCursors]);

  //Send quill changes to all clients
  useEffect(() => {
    if (quill === null || socket === null || !session || !page.id) return;

    const selectionChangeHandler = (cursorId: string) => {
      return (range: any, oldRange: any, source: any) => {
        if (source === 'user' && cursorId) {
          socket.emit('send-cursor-move', range, page.id, cursorId);
        }
      };
    };
    const quillHandler = (delta: any, oldDelta: any, source: any) => {
      if (source !== 'user') return;
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
      setIsSaving(true);
      const contents = quill.getContents();
      const quillLength = quill.getLength();
      saveTimerRef.current = setTimeout(async () => {
        // if (contents && quillLength !== 1 && page.id) {
        //   if (dirType == 'workspace') {
        //     dispatch({
        //       type: 'UPDATE_WORKSPACE',
        //       payload: {
        //         workspace: { data: JSON.stringify(contents) },
        //         workspaceId: page.id,
        //       },
        //     });
        //     await updateWorkspace({ data: JSON.stringify(contents) }, page.id);
        //   }
        //   if (dirType == 'folder') {
        //     if (!workspaceId) return;
        //     dispatch({
        //       type: 'UPDATE_FOLDER',
        //       payload: {
        //         folder: { data: JSON.stringify(contents) },
        //         workspaceId,
        //         folderId: page.id,
        //       },
        //     });
        //     await updateFolder({ data: JSON.stringify(contents) }, page.id);
        //   }
        //   if (dirType == 'file') {
        //     if (!workspaceId || !folderId) return;
        //     dispatch({
        //       type: 'UPDATE_FILE',
        //       payload: {
        //         file: { data: JSON.stringify(contents) },
        //         workspaceId,
        //         folderId: folderId,
        //         page.id,
        //       },
        //     });
        //     await updateFile({ data: JSON.stringify(contents) }, page.id);
        //   }
        // }
        setIsSaving(false);
      }, 850);
      socket.emit('send-changes', delta, page.id);
    };
    quill.on('text-change', quillHandler);
    quill.on('selection-change', selectionChangeHandler(session.user.id));

    return () => {
      quill.off('text-change', quillHandler);
      quill.off('selection-change', selectionChangeHandler(session.user.id));
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, [quill, socket, page.id, session]);

  useEffect(() => {
    if (quill === null || socket === null) return;
    const socketHandler = (deltas: any, id: string) => {
      if (id === page.id) {
        quill.updateContents(deltas);
      }
    };
    socket.on('receive-changes', socketHandler);
    return () => {
      socket.off('receive-changes', socketHandler);
    };
  }, [quill, socket, page.id]);

  /*useEffect(() => {
    if (!page.id || quill === null) return;
    const room = supabase.channel(page.id);
    const subscription = room
      .on('presence', { event: 'sync' }, () => {
        const newState = room.presenceState();
        const newCollaborators = Object.values(newState).flat() as any;
        setCollaborators(newCollaborators);
        if (user) {
          const allCursors: any = [];
          newCollaborators.forEach(
            (collaborator: { id: string; email: string; avatar: string }) => {
              if (collaborator.id !== user.id) {
                const userCursor = quill.getModule('cursors');
                userCursor.createCursor(
                  collaborator.id,
                  collaborator.email.split('@')[0],
                  `#${Math.random().toString(16).slice(2, 8)}`
                );
                allCursors.push(userCursor);
              }
            }
          );
          setLocalCursors(allCursors);
        }
      })
      .subscribe(async (status) => {
        if (status !== 'SUBSCRIBED' || !user) return;
        const response = await findUser(user.id);
        if (!response) return;

        room.track({
          id: user.id,
          email: user.email?.split('@')[0],
          avatarUrl: response.avatarUrl
            ? supabase.storage.from('avatars').getPublicUrl(response.avatarUrl)
                .data.publicUrl
            : '',
        });
      });
    return () => {
      supabase.removeChannel(room);
    };
  }, [quill, user]);*/

  async function onSubmit(data: FormData) {
    setIsSaving(true);

    if (!quill) return;

    const blocks = await quill.getContents();

    const response = await editPage(page.id, {
      number: data.number,
      content: blocks,
    });

    setIsSaving(false);

    if (!response.success) {
      return toast({
        title: 'Something went wrong.',
        description: 'Your page was not saved. Please try again.',
        variant: 'destructive',
      });
    }

    router.refresh();

    return toast({
      description: 'Your page has been saved.',
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid w-full gap-10">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center space-x-10">
            <Link
              href={`/dashboard/posts/${post.id}`}
              className={cn(buttonVariants({ variant: "ghost" }))}
            >
              <>
                <Icons.chevronLeft className="mr-2 h-4 w-4" />
                Back
              </>
            </Link>
            <p className="text-sm text-muted-foreground">
              {post.title}
            </p>
          </div>
          <button type="submit" className={cn(buttonVariants())}>
            {isSaving && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            <span>Save</span>
          </button>
        </div>
        <div className="prose prose-stone mx-auto w-[800px] dark:prose-invert">
          <TextareaAutosize
            autoFocus
            id="title"
            defaultValue={`Editing page ${page.number}`}
            placeholder="Page title"
            disabled
            className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
          />
          <input type="hidden" disabled value={page.number} {...register("number")} />
          <div
            id="container"
            className="min-h-[500px]"
            ref={wrapperRef}
          />
        </div>
      </div>
    </form>
  );
}
