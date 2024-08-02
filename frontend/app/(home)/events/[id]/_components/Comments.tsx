import { Comment } from "@/types";
import React, { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDateTime } from "@/lib/eventUtils";
import { Card } from "@/components/ui/card";
import { Trash } from "lucide-react";

interface CommentsProps {
  eventId: string;
  comments: Comment[];
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  user: any;
}

const Comments = ({ eventId, comments, setComments, user }: CommentsProps) => {
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAddComment = async () => {
    if (!newComment.trim()) {
      toast({
        title: "Error",
        description: "Comment cannot be empty",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ comment: newComment, eventId }),
        }
      );

      if (response.ok) {
        const data = await response.json();

        const commentWithUser = {
          ...data,
          user: {
            _id: user._id,
            username: user.username,
            photo: user.photo,
          }
        };

        setComments([...comments, commentWithUser]);
        setNewComment("");
        toast({
          title: "✅ Success",
          description: "Comment added successfully",
        });
      } else {
        throw new Error("Failed to add comment");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add comment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments/${commentId}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
      })
      if(response.ok) {
        setComments(comments.filter((comment) => comment._id !== commentId));
        toast({
          title: "✅ Success",
          description: "Comment deleted successfully",
        });
      } else {
        throw new Error("Failed to delete comment");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete comment. Please try again.",
        variant: "destructive",
      });
    }
  }

  return (
    <div>
      <div className="px-5">
        <h3 className="text-2xl font-semibold text-main md:text-3xl">
          Comments
        </h3>
        <div className="mt-8 grid grid-cols-3 gap-3">
          <Input
            type="text"
            placeholder="Add a comment"
            className="col-span-2"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <div className="col-span-1">
            <Button
              className="w-full"
              variant={"icon"}
              onClick={handleAddComment}
            >
              Add
            </Button>
          </div>
        </div>
        <Card className="mt-5 p-5">
          {comments && comments.length === 0 ? (
            <p>No comments yet. Be the first to comment!</p>
          ) : (
            comments &&
            comments.map((c) => {
              const { date, time } = formatDateTime(new Date(c.createdAt));
              return (
                <div key={c._id}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={c.user.photo || "https://github.com/shadcn.png"} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <p className="text-gray-600">{c.user.username}</p>
                    <p className="text-gray-600">{date} : {time}</p>
                    </div>
                    {c.user._id === user._id? (
                      <button onClick={() => handleDeleteComment(c._id)}>
                      <Trash className="text-gray-600 h-5 w-5 hover:text-red-500 hover:cursor-pointer" />
                      </button>
                    ): null}
                  </div>
                  <div className="py-4">
                  <p>{c.content}</p>
                  </div>
                </div>
              );
            })
          )}
        </Card>
      </div>
    </div>
  );
};

export default Comments;
