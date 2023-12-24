import { Comment, Post, User } from '@prisma/client';
import { FC } from 'react';
import PostComment from './post-comment';
import PostInsertComment from './post-insert-comment';

interface PostCommentSectionProps {
  post: Pick<Post, 'id'>;
  comments: Pick<Comment & { author: Pick<User, 'id' | 'image' | 'name'> }, "id" | "author" | "content" | 'updatedAt'>[];
}

const PostCommentSection: FC<PostCommentSectionProps> = async ({ post, comments }) => {

  return (
    <div>
        <center className="font-bold px-4 text-lg">Comments</center>
        <PostInsertComment post={{ id: post.id }}/>
        <div className='mt-3 grid grid-cols-1 gap-y-3 mx-auto w-[75%]'>
          {comments.length > 0 && (
              comments.map(((comment, index) => (
                  <PostComment
                      key={index}
                      comment={{ id: comment.id, content: comment.content, updatedAt: comment.updatedAt }}
                      author={{ id: comment.author.id, image: comment.author.image, name: comment.author.name }} />
              )))
          )}
        </div>
    </div>
  );
};

export default PostCommentSection;