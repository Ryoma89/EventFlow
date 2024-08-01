import { Comment } from '@/types';
import React, { useEffect, useState } from 'react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

interface CommentsProps {
  eventId: string;
  comments: Comment[];
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
}

const Comments = ({ eventId, comments, setComments }: CommentsProps) => {
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // useEffect(() => {
  //   const fetchComments = async () => {
  //     setIsLoading(true);
  //     try {
  //       const response = await fetch(
  //         `${process.env.NEXT_PUBLIC_API_URL}/events/${eventId}/comments`
  //       );
  //       if (!response.ok) {
  //         throw new Error('Failed to fetch comments');
  //       }
  //       const data = await response.json();
  //       setComment(data);
  //     } catch (error) {
  //       console.error("Error fetching comments:", error);
  //       toast({
  //         title: "Error",
  //         description: "Failed to load comments. Please try again.",
  //         variant: "destructive",
  //       });
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   fetchComments();
  // }, [eventId, setComment]);

  const handleAddComment = async () => {
    if (!newComment.trim()) {
      toast({
        title: 'Error',
        description: 'Comment cannot be empty',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/comments`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ comment: newComment, eventId }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log({ data });
        setComments([...comments, data]);
        setNewComment('');
        toast({
          title: 'Success',
          description: 'Comment added successfully',
        });
      } else {
        throw new Error('Failed to add comment');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add comment. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <div className='px-5'>
        <h3 className='text-2xl font-semibold text-main md:text-3xl'>
          Comments
        </h3>
        <div className='mt-8 grid grid-cols-3 gap-3'>
          <Input
            type='text'
            placeholder='Add a comment'
            className='col-span-2'
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <div className='col-span-1'>
            <Button
              className='w-full'
              variant={'icon'}
              onClick={handleAddComment}
            >
              Add
            </Button>
          </div>
        </div>
        <div className='mt-5'>
          {comments && comments.length === 0 ? (
            <p>No comments yet. Be the first to comment!</p>
          ) : (
            comments && comments.map((c) => <p key={c._id}>{c.content}</p>)
          )}
        </div>
      </div>
    </div>
  );
};

export default Comments;
