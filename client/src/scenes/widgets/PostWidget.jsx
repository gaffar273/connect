import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    DeleteOutlined,
} from "@mui/icons-material";
import {
    Box,
    Divider,
    IconButton,
    Typography,
    useTheme,
    InputBase,
    Button,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";
import apiConfig from "config/api"; // Import our API configuration

const PostWidget = ({
                        postId,
                        postUserId,
                        name,
                        description,
                        location,
                        picturePath,
                        userPicturePath,
                        likes,
                        comments,
                    }) => {
    const [isComments, setIsComments] = useState(false);
    const [comment, setComment] = useState("");
    const commentSectionRef = useRef(null);
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const loggedInUserId = useSelector((state) => state.user._id);
    const isLiked = Boolean(likes[loggedInUserId]);
    const likeCount = Object.keys(likes).length;

    const { palette } = useTheme();
    const main = palette.neutral.main;
    const primary = palette.primary.main;

    const patchLike = async () => {
        const response = await fetch(`${apiConfig.baseURL}/posts/${postId}/like`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: loggedInUserId }),
        });
        const updatedPost = await response.json();
        dispatch(setPost({ post: updatedPost }));
    };

    const handleDelete = async () => {
        const response = await fetch(`${apiConfig.baseURL}/posts/${postId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: loggedInUserId }),
        });

        if (response.ok) {
            window.location.reload();
        }
    };

    const handleComment = async () => {
        if (!comment.trim()) return;

        const response = await fetch(`${apiConfig.baseURL}/posts/${postId}/comment`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: loggedInUserId, comment }),
        });

        const updatedPost = await response.json();
        dispatch(setPost({ post: updatedPost }));
        setComment("");
    };

    const isOwner = loggedInUserId === postUserId;

    return (
        <WidgetWrapper m="2rem 0">
            <Friend
                friendId={postUserId}
                name={name}
                subtitle={location}
                userPicturePath={userPicturePath}
                isOwnPost={isOwner}
            />
            <Typography color={main} sx={{ mt: "1rem" }}>
                {description}
            </Typography>
            {picturePath && (
                <img
                    width="100%"
                    height="auto"
                    alt="post"
                    style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
                    src={`${apiConfig.baseURL}/assets/${picturePath}`}
                    onError={(e) => {
                        // Prevent infinite loop if fallback image also fails
                        if (e.target.src.includes('linkedin.png')) return;
                        
                        e.target.onerror = null;
                        e.target.src = `${apiConfig.baseURL}/assets/linkedin.png`;
                    }}
                />
            )}
            <FlexBetween mt="0.25rem" ref={commentSectionRef}>
                <FlexBetween gap="1rem">
                    <FlexBetween gap="0.3rem">
                        <IconButton onClick={patchLike}>
                            {isLiked ? (
                                <FavoriteOutlined sx={{ color: primary }} />
                            ) : (
                                <FavoriteBorderOutlined />
                            )}
                        </IconButton>
                        <Typography>{likeCount}</Typography>
                    </FlexBetween>

                    <FlexBetween gap="0.3rem">
                        <IconButton
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsComments(!isComments);
                            }}
                        >
                            <ChatBubbleOutlineOutlined />
                        </IconButton>
                        <Typography>{comments.length}</Typography>
                    </FlexBetween>
                </FlexBetween>

                {isOwner && (
                    <IconButton onClick={handleDelete}>
                        <DeleteOutlined />
                    </IconButton>
                )}
            </FlexBetween>

            {isComments && (
                <Box mt="0.5rem">
                    {comments && comments.length > 0 ? (
                        comments.map((comment, i) => (
                            <Box key={`${name}-${i}`}>
                                <Divider />
                                <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                                    {comment}
                                </Typography>
                            </Box>
                        ))
                    ) : (
                        <>
                            <Divider />
                            <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                                No comments yet. Be the first to comment!
                            </Typography>
                        </>
                    )}
                    <Divider />
                    <Box mt="0.5rem">
                        <FlexBetween gap="1rem">
                            <InputBase
                                placeholder="Write a comment..."
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter' && comment.trim()) {
                                        handleComment();
                                    }
                                }}
                                sx={{
                                    flex: 1,
                                    backgroundColor: palette.neutral.light,
                                    borderRadius: "2rem",
                                    padding: "0.5rem 1.5rem",
                                }}
                            />
                            <Button
                                disabled={!comment.trim()}
                                onClick={handleComment}
                                sx={{
                                    color: palette.background.alt,
                                    backgroundColor: palette.primary.main,
                                    borderRadius: "3rem",
                                    padding: "0.5rem 1.5rem",
                                    "&:hover": {
                                        backgroundColor: palette.primary.light,
                                    },
                                    "&:disabled": {
                                        backgroundColor: palette.neutral.light,
                                    },
                                }}
                            >
                                POST
                            </Button>
                        </FlexBetween>
                    </Box>
                </Box>
            )}
        </WidgetWrapper>
    );
};

export default PostWidget;
