import { Comment } from '@/types'
import React, { useState } from 'react'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'

interface CommentsProps {
  eventId: string;
  comment: Comment[];
  setComment: React.Dispatch<React.SetStateAction<Comment[]>>;
}

const Comments = ({ eventId, comment, setComment }: CommentsProps) => {
  const [newComment, setNewComment] = useState("");
  // useEffect(() => {
  //   const fetchComments = async () => {
  //     try {
  //       const response = await fetch(
  //         `${process.env.NEXT_PUBLIC_API_URL}/events/${params.id}/comments`
  //       );
  //       const data = await response.json();
  //       setComments(data);
  //     } catch (error) {
  //       console.error("Error fetching comments:", error);
  //     }
  //   };
  //   fetchComments();
  // }, [params.id]);

  const handleAddComment = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/events/${eventId}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include',
          body: JSON.stringify({ comment: newComment }),
        }
      )

      if (response.ok) {
        const data = await response.json();
        setComment([...comment, data]);
        setNewComment("");
      } else {
        toast({
          title: "Error",
          description: "Failed to add comment",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add comment",
        variant: "destructive",
      })
    }
  }
  return (
    <div>
      <div className="px-5">
          <h3 className="text-2xl font-semibold text-main">Comments</h3>
          <div className="mt-5 grid grid-cols-3 gap-3">
            <Input 
            type="text" 
            placeholder="Add a comment" 
            className="col-span-2"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            />
            <div className="col-span-1">
            <Button className="w-full" variant={"icon"} onClick={handleAddComment}>Add</Button>
            </div>
          </div>
          <div className="mt-5">
          {comment && comment.length === 0 ? (
            <p>No comments yet. Be the first to comment!</p>
          ) : (
            comment && comment.map((c, index) => (
              <p key={index}>{c.content}</p>
            ))
          )}
          </div>
        </div>
    </div>
  )
}

export default Comments
